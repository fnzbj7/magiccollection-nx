import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card, CardLayout, CardVariationDto } from '../../../model/card.model';
import { CardQuantity, PriorityList } from '../dto/card-quantity.model';
import { MagicCardsListService } from '../../magic-card-list/magic-cards-list.service';
import { AuthenticationService } from '../../../auth/authentication.service';
import { CardWithFoil } from '../dto/foil.dto';
import { ModifyCardDto } from '../dto/modify-card.dto';
import {
    faAngleDoubleRight,
    faBoxes,
    faHandSparkles,
    faStar,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ModifyQtyEnum } from '../../../model/modify-qty.enum';

@Component({
    selector: 'app-modify-upload',
    templateUrl: 'modify-upload.component.html',
})
export class ModifyUploadComponent {
    @Input() inProgress!: boolean;
    @Input() isError!: boolean;
    @Input() isFinished!: boolean;
    @Input() cardSet!: string;
    @Input() reducedArr!: ModifyCardDto;
    @Input() rawCardNumbers!: CardWithFoil[];
    @Input() modifyQty!: ModifyQtyEnum;
    @Input() cardLanguage!: string;

    @Output() resetPage = new EventEmitter<void>();
    @Output() stepBack = new EventEmitter<void>();

    isNewCardsLoading = false;
    isNewCardsFinished = false;
    filteredNewCards: PriorityList[] | null = [];
    newCards: Card[] | null = null;
    CardLayout = CardLayout;
    faAngleDoubleRight = faAngleDoubleRight;
    faStar = faStar;
    faHandSparkles = faHandSparkles;
    faBoxes = faBoxes;
    faTrash = faTrash;

    constructor(
        private magicCardsListService: MagicCardsListService,
        private auth: AuthenticationService,
    ) {}

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

                const prioList: PriorityList[] = [];
                const cardMap = new Map<number, number>();
                const cardMapF = new Map<number, number>();
                this.filteredNewCards = [];
                this.rawCardNumbers.reverse().forEach(rcn => {
                    const foundCard = cards.find(
                        card => card.cardNumber && +card.cardNumber === rcn.cardNum,
                    );

                    if (!foundCard || !foundCard.cardVariation) {
                        return;
                    }
                    if (!this.filteredNewCards) return;

                    const have =
                        foundCard.cardVariation[
                            ('n' + this.cardLanguage) as keyof CardVariationDto
                        ];
                    const haveF =
                        foundCard.cardVariation[
                            ('f' + this.cardLanguage) as keyof CardVariationDto
                        ];

                    const cNum = cardMap.get(rcn.cardNum) ?? 0;
                    const cNumF = cardMapF.get(rcn.cardNum) ?? 0;
                    let nMod = 0;
                    let fMod = 0;

                    if (rcn.isFoil) {
                        cardMapF.set(rcn.cardNum, cNumF + 1);
                        fMod = 1;
                    } else {
                        cardMap.set(rcn.cardNum, cNum + 1);
                        nMod = 1;
                    }

                    this.filteredNewCards.push({
                        cardNumber: ('' + rcn.cardNum).padStart(3, '0'),
                        upload: have,
                        was: have - nMod - cNum,
                        have: have - cNum,
                        uploadF: haveF,
                        wasF: haveF - fMod - cNumF,
                        haveF: haveF - cNumF,
                    });
                    // this.cardLanguage

                    //
                });
                this.filteredNewCards = this.filteredNewCards.reverse();

                const cardQuantitys = this.reducedArr.cardQuantitys;
                // this.filteredNewCards = cardQuantitys.map(x => {
                //     const foundCard = cards.find(
                //         card => card.cardNumber && +card.cardNumber === x.cardNumber,
                //     );

                //     if (!foundCard) {
                //         return {} as PriorityList;
                //     }

                //     let language = 'En'; // TODO maybe tunnel language from a different place
                //     if (
                //         this.reducedArr &&
                //         this.reducedArr.cardQuantitys &&
                //         this.reducedArr.cardQuantitys[0]
                //     ) {
                //         language = this.reducedArr.cardQuantitys[0].language;
                //     }

                //     if (foundCard.cardVariation) {
                //         // Language needed
                //         const have =
                //             foundCard.cardVariation[('n' + language) as keyof CardVariationDto];
                //         const haveF =
                //             foundCard.cardVariation[('f' + language) as keyof CardVariationDto];
                //         return {
                //             cardNumber: ('' + x.cardNumber).padStart(3, '0'),
                //             upload: x.cardQuantity,
                //             was: have - x.cardQuantity,
                //             have,
                //             uploadF: x.cardQuantityFoil,
                //             wasF: haveF - x.cardQuantityFoil,
                //             haveF,
                //         };
                //     }
                //     return {} as PriorityList;
                // });
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
}
