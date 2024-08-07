import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Card } from '../../../model/card.model';
import { ModifyQtyEnum } from '../../../model/modify-qty.enum';
import { selectCollectionState } from '../../../state/app.selector';
import { ModifyCardActions } from '../../../state/modify-card.actions';
import {
    MagicCardsListService,
    magicSetArray,
} from '../../magic-card-list/magic-cards-list.service';
import { MagicSet } from '../../magic-card-list/model/magic-set.model';
import { ModifyCardService } from '../../modify-card.service';
import { CardWithFoil } from '../dto/foil.dto';
import { ModifyCardDto } from '../dto/modify-card.dto';
import { ModifyMode } from '../modify-card.component';
import { AfterFinishForm } from './model/after-finish-form.model';

@Component({
    selector: 'app-modify-form',
    templateUrl: './modify-form.component.html',
    styleUrls: ['./modify-form.component.scss'],
})
export class ModifyFormComponent implements OnInit, OnDestroy {
    @Input() mode!: ModifyMode;
    @Output() afterFinish = new EventEmitter<AfterFinishForm>();

    ModifyMode = ModifyMode;

    modifyQty: ModifyQtyEnum = ModifyQtyEnum.ADD;
    wrongNums: number[] = [];
    cardNumbersStr!: string;
    cardSet!: string;
    notNumbers!: string[];
    isError = false;
    reducedArr!: ModifyCardDto;
    rawCardNumbers!: CardWithFoil[];
    lastCardPreview?: Card;
    param$!: Subscription;
    cardSetsArray!: string[];
    magicSetArray!: MagicSet[];
    cardVariantTypes!: string[];
    cardVariantType!: string;
    cardLanguages!: string[];
    cardLanguage!: string;

    constructor(
        private modifyCardService: ModifyCardService,
        private magicCardsListService: MagicCardsListService,
        private route: ActivatedRoute,
        private store: Store,
    ) {}

    ngOnInit(): void {
        this.cardSetsArray = this.magicCardsListService.cardSetsArray;
        this.magicSetArray = magicSetArray;
        this.cardVariantTypes = this.magicCardsListService.cardVariantTypes;
        this.cardLanguages = this.magicCardsListService.cardLanguages;

        this.cardVariantType = this.cardVariantTypes[0];
        this.cardLanguage = this.cardLanguages[0];

        this.param$ = this.route.params.subscribe(() => {
            this.modifyQty = +this.route.snapshot.data['modifyQty'];
            this.cardNumbersStr = this.modifyCardService.getSavedModifyCard(this.modifyQty);
        });
        this.store.select(selectCollectionState).subscribe(x => {
            this.cardLanguage = x.language;
            this.cardSet = x.setName;
        });
    }

    addCard() {
        this.isError = false;
        this.rawCardNumbers = this.prepareAndValidate(this.cardNumbersStr, this.cardSet);

        if (!this.isError) {
            this.modifyCardService.cacheModifyCard(this.modifyQty, this.cardNumbersStr);
            this.reducedArr = this.convertToModifyCardDto(this.rawCardNumbers);
            this.afterFinish.emit(
                new AfterFinishForm(
                    this.reducedArr,
                    this.rawCardNumbers,
                    this.cardSet,
                    this.cardLanguage,
                ),
            );
        }
    }

    onCardTyping() {
        if (!this.cardNumbersStr && this.lastCardPreview) {
            this.lastCardPreview = undefined;
            return;
        }

        if (!this.isSpaceLastBtnPress(this.cardNumbersStr)) {
            return;
        }

        const { lastNum, lastNumStr } = this.getLastNum(this.cardNumbersStr);

        if (Number.isNaN(lastNum)) {
            console.warn(`${lastNum} nem egy szám!`);
            this.lastCardPreview = undefined;
            return;
        }

        this.lastCardPreview = this.createLastCard(lastNum, lastNumStr);
    }

    onSetChange(value: string) {
        this.onCardTyping();
        if (this.lastCardPreview) {
            this.lastCardPreview = { ...this.lastCardPreview, cardExpansion: value };
        }
        this.store.dispatch(ModifyCardActions.changeSet({ setName: value }));
    }

    onLanguageChange(value: string) {
        this.store.dispatch(ModifyCardActions.changeLanguage({ language: value }));
    }

    ngOnDestroy() {
        this.modifyCardService.cacheModifyCard(this.modifyQty, this.cardNumbersStr);
        if (this.param$) {
            this.param$.unsubscribe();
        }
    }

    private prepareAndValidate(cardNumbersStr: string, cardSet: string): CardWithFoil[] {
        const cardNumbersStrTrim = cardNumbersStr.trim().replace(/  +/g, ' '); // Remove multiple spaces
        const cardNumbersStrArr: string[] = cardNumbersStrTrim.split(' ');
        const cardsAndFoil: CardWithFoil[] = cardNumbersStrArr.map(cardNum => {
            const foil: CardWithFoil = {
                cardNum: parseInt(cardNum, 10),
                isFoil: cardNum.includes('*'),
            };
            return foil;
        });

        const findedNum = cardsAndFoil.findIndex(
            cardAndFoil => !cardAndFoil || !cardAndFoil.cardNum || isNaN(cardAndFoil.cardNum),
        );
        if (findedNum >= 0) {
            this.notNumbers = cardNumbersStrArr.filter(num => isNaN(parseInt(num, 10)));
            console.error('Founded NaN', this.notNumbers);
            this.isError = true;
        }

        const maxNumber: number = this.magicCardsListService.getMagicSetMaxNumber(cardSet);
        this.wrongNums = cardsAndFoil
            .filter(cardAndFoil => {
                if (!cardAndFoil || !cardAndFoil.cardNum || isNaN(cardAndFoil.cardNum)) {
                    return false;
                }

                return cardAndFoil.cardNum > maxNumber || cardAndFoil.cardNum <= 0;
            })
            .map(cardAndFoil => cardAndFoil.cardNum);
        if (this.wrongNums.length > 0) {
            console.error('High numbers', this.wrongNums);
            this.isError = true;
        }
        return cardsAndFoil;
    }

    private convertToModifyCardDto(cardNumbers: CardWithFoil[]) {
        const addCardDto = new ModifyCardDto(this.cardSet, []);
        return cardNumbers.reduce((addCard, cardWithFoil) => {
            const cardNumInd = addCard.cardQuantitys.findIndex(
                c => c.cardNumber === cardWithFoil.cardNum,
            );
            if (cardNumInd >= 0) {
                if (!cardWithFoil.isFoil) {
                    addCard.cardQuantitys[cardNumInd].cardQuantity += this.modifyQty;
                } else {
                    addCard.cardQuantitys[cardNumInd].cardQuantityFoil += this.modifyQty;
                }
            } else {
                addCard.cardQuantitys.push({
                    cardNumber: cardWithFoil.cardNum,
                    cardQuantity: cardWithFoil.isFoil ? 0 : this.modifyQty,
                    cardQuantityFoil: cardWithFoil.isFoil ? this.modifyQty : 0,
                    language: this.cardLanguage,
                    type: this.cardVariantType,
                });
            }
            return addCard;
        }, addCardDto);
    }

    private createLastCard(lastNum: number, lastNumStr: string): Card {
        const isFoil = lastNumStr.includes('*');
        const lastCard = new Card();
        lastCard.cardExpansion = this.cardSet;
        lastCard.cardNumber = ('' + lastNum).padStart(3, '0');
        lastCard.cardAmount = isFoil ? 0 : 1;
        lastCard.cardAmountFoil = isFoil ? 1 : 0;
        return lastCard;
    }

    private getLastNum(cardNumbersStr: string) {
        const tmpArr = cardNumbersStr.split(' ');
        const lastNumStr = tmpArr[tmpArr.length - 2];
        return { lastNum: parseInt(lastNumStr, 10), lastNumStr };
    }

    private isSpaceLastBtnPress(cardNumbersStr: string) {
        return cardNumbersStr.slice(cardNumbersStr.length - 1, cardNumbersStr.length) === ' ';

        // str.slice(beginIndex, endIndex)
    }
}
