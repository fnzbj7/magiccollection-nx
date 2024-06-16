import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModifyCardDto } from './dto/modify-card.dto';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModifyCardService } from '../modify-card.service';
import { MagicCardsListService } from '../magic-card-list/magic-cards-list.service';
import { ModifyQtyEnum } from '../../model/modify-qty.enum';
import { Card, CardLayout, CardVariationDto } from '../../model/card.model';
import { CardWithFoil } from './dto/foil.dto';
import { AfterFinishForm } from './modify-form/model/after-finish-form.model';
import { CardQuantity, PriorityList } from './dto/card-quantity.model';
import { AuthenticationService } from '../../auth/authentication.service';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

enum PageStep {
    FORM = 'from',
    PREVIEW = 'preview',
    UPLOADED = 'uploaded',
}

export enum ModifyMode {
    ADD,
    REMOVE,
}

@Component({
    selector: 'app-modify-card',
    templateUrl: './modify-card.component.html',
    styleUrls: ['./modify-card.component.css'],
})
export class ModifyCardComponent implements OnInit, OnDestroy {
    modifyQty: ModifyQtyEnum = ModifyQtyEnum.ADD;
    inProgress = false;
    isFinished = false;
    pageStep = PageStep;
    actualPageStep = PageStep.FORM;
    newCards: Card[] | null = null;
    isNewCardsLoading = false;
    isNewCardsFinished = false;
    isError = false;
    cardSet!: string;

    param$!: Subscription;

    reducedArr!: ModifyCardDto;
    rawCardNumbers!: CardWithFoil[];

    mode!: ModifyMode;

    CardLayout = CardLayout;
    faAngleDoubleRight = faAngleDoubleRight;
    filteredNewCards: PriorityList[] | null = [];

    constructor(
        private modifyCardService: ModifyCardService,
        private magicCardsListService: MagicCardsListService,
        private route: ActivatedRoute,
        private auth: AuthenticationService,
    ) {}

    ngOnInit() {
        this.param$ = this.route.params.subscribe(() => {
            this.modifyQty = +this.route.snapshot.data['modifyQty'];
            this.mode = this.modifyQty > 0 ? ModifyMode.ADD : ModifyMode.REMOVE;
            this.resetPage();
        });
    }

    onFormFinish(event: AfterFinishForm) {
        this.reducedArr = event.reducedArr;
        this.rawCardNumbers = event.rawCardNumbers;
        this.actualPageStep = PageStep.PREVIEW;
        this.cardSet = event.cardSet;
    }

    startUploading() {
        this.actualPageStep = PageStep.UPLOADED;
        this.modifyCardService.addCard(this.reducedArr).subscribe(
            () => {
                console.log('Finished adding card');
                this.inProgress = false;
                this.isFinished = true;
                this.modifyCardService.clearModifyCard(this.modifyQty);
            },
            err => {
                console.log(err);
                this.inProgress = false;
                this.isError = true;
            },
        );
    }

    onShowNewCards() {
        // Get all cards
        this.isNewCardsLoading = true;
        this.magicCardsListService
            .getCardsForExpansion(this.auth.currentUserValue?.id, this.cardSet)
            .subscribe(cards => {
                this.isNewCardsFinished = true;
                this.isNewCardsLoading = false;
                // Compare to the uploaded cards
                this.calculateWholeNewCards(cards);
                /* --------- Other ------------ */
                const cardQuantitys = this.reducedArr.cardQuantitys;
                this.filteredNewCards = cardQuantitys.map(x => {
                    const foundCard = cards.find(
                        card => card.cardNumber && +card.cardNumber === x.cardNumber,
                    );

                    if (!foundCard) {
                        return {} as PriorityList;
                    }

                    let language = 'En'; // TODO maybe tunnel language from a different place
                    if (
                        this.reducedArr &&
                        this.reducedArr.cardQuantitys &&
                        this.reducedArr.cardQuantitys[0]
                    ) {
                        language = this.reducedArr.cardQuantitys[0].language;
                    }

                    if (foundCard.cardVariation) {
                        // Language needed
                        const have =
                            foundCard.cardVariation[('n' + language) as keyof CardVariationDto];
                        const haveF =
                            foundCard.cardVariation[('f' + language) as keyof CardVariationDto];
                        return {
                            cardNumber: ('' + x.cardNumber).padStart(3, '0'),
                            upload: x.cardQuantity,
                            was: have - x.cardQuantity,
                            have,
                            uploadF: x.cardQuantityFoil,
                            wasF: haveF - x.cardQuantityFoil,
                            haveF,
                        };
                    }
                    return {} as PriorityList;
                });
                // .map(qt => ({...qt, cardNumber: (''+qt.cardNumber).padStart(3, '0')}));
            });
    }
    calculateWholeNewCards(cards: Card[]) {
        const cardQuantitys = this.reducedArr.cardQuantitys;
        const filteredNewCards = cardQuantitys.filter(x => {
            const foundCard = cards.find(
                card => card.cardNumber && +card.cardNumber === x.cardNumber,
            );

            if (!foundCard) {
                return !false;
            }

            let language = 'En'; // TODO maybe tunnel language from a different place
            if (
                this.reducedArr &&
                this.reducedArr.cardQuantitys &&
                this.reducedArr.cardQuantitys[0]
            ) {
                language = this.reducedArr.cardQuantitys[0].language;
            }
            const priorityList = [];
            if (foundCard.cardVariation) {
                // Language needed
                priorityList.push({
                    upload: x.cardQuantityFoil,
                    have: foundCard.cardVariation[('f' + language) as keyof CardVariationDto],
                });
                priorityList.push({
                    upload: x.cardQuantity,
                    have: foundCard.cardVariation[('n' + language) as keyof CardVariationDto],
                });
            } else {
                priorityList.push({
                    upload: x.cardQuantityFoil,
                    have: foundCard.cardAmountFoil,
                });
                priorityList.push({ upload: x.cardQuantity, have: foundCard.cardAmount });
            }

            for (const priority of priorityList) {
                // if upload and have both 0, then skip
                if (priority.upload < priority.have) {
                    return false;
                }
                if (priority.upload > 0 && priority.upload === priority.have) {
                    return true;
                }
            }
            return false;
        });

        const reducedCards = this.rawCardNumbers.reduce(
            (reduceValue: CardQuantity[], currValue: CardWithFoil) => {
                const isProcessed = reduceValue.find(f => f.cardNumber === currValue.cardNum);
                const found = filteredNewCards.find(f => f.cardNumber === currValue.cardNum);
                if (isProcessed || !found) {
                    return reduceValue;
                } else {
                    if (currValue.isFoil) {
                        reduceValue.push(found);
                    } else if (!currValue.isFoil && found.cardQuantityFoil === 0) {
                        reduceValue.push(found);
                    }
                }

                return reduceValue;
            },
            [],
        );

        // Creating an array from the new cards
        this.newCards = reducedCards.map(x => {
            const card = new Card();
            card.cardAmount = x.cardQuantity;
            card.cardAmountFoil = x.cardQuantityFoil;
            card.cardExpansion = this.cardSet;
            card.cardNumber = ('' + x.cardNumber).padStart(3, '0');
            card.layout = CardLayout.NORMAL;
            return card;
        });
    }

    resetPage() {
        this.isFinished = false;
        this.actualPageStep = PageStep.FORM;
        this.isNewCardsLoading = false;
        this.isNewCardsFinished = false;
        this.newCards = null;
        this.filteredNewCards = null;
    }

    ngOnDestroy() {
        if (this.param$) {
            this.param$.unsubscribe();
        }
    }
}
