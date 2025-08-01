import { Component, OnInit } from '@angular/core';
import { Card } from '../../model/card.model';
import {
    CardVariantType,
    defaultCardVariantType,
    MagicCardsListService,
    magicSetArray,
    PossibleCardVariationDto,
} from '../magic-card-list/magic-cards-list.service';
import { MagicSet } from '../magic-card-list/model/magic-set.model';

@Component({
    selector: 'app-card-variation',
    templateUrl: './card-variation.component.html',
    styleUrls: ['./card-variation.component.scss'],
})
export class CardCariationComponent implements OnInit {
    magicSets!: MagicSet[];
    cardSet?: string;
    maxCardNum?: number;
    selectedCardNum?: string;
    cardPreview?: Card;
    possibleArr?: PossibleCardVariationDto[];
    cardVariantTypes: string[] = [];
    cardVariantType?: string;
    hasNormal = true;
    hasFoil = false;
    cardId?: number;
    creationLoading = false;

    Arr = Array;

    constructor(private magicCardsListService: MagicCardsListService) {}

    ngOnInit(): void {
        this.magicSets = magicSetArray;
        this.cardSet = '';

        this.cardVariantTypes = Object.values(CardVariantType);
    }

    onCardSetChange(newValue: string) {
        this.cardSet = newValue;

        const magicSet = this.magicSets.find(s => s.name === this.cardSet);
        this.maxCardNum = magicSet?.maxNum;
        this.refreshPreview(this.cardSet, this.selectedCardNum);
    }

    onCardNumChange(newValue: string) {
        this.selectedCardNum = newValue;
        this.refreshPreview(this.cardSet, this.selectedCardNum);
    }

    private refreshPreview(cardSet?: string, selectedCardNum?: string) {
        if (selectedCardNum && cardSet) {
            this.cardPreview = this.createCardPrev(cardSet, selectedCardNum);
            this.magicCardsListService
                .getAllVersionForCard(cardSet, +selectedCardNum)
                .subscribe(possibleArr => {
                    this.possibleArr = possibleArr.possibleCardVariation;
                    this.cardId = possibleArr.id;
                });
        }
    }

    possStrFormat(poss: PossibleCardVariationDto) {
        return `Type: ${poss.cardVariantType},  HasNormal: ${poss.hasNormal},  hasFoil: ${poss.hasFoil}`;
    }

    onAddPosibleCardVariation() {
        if (this.cardVariantType && this.cardId) {
            this.creationLoading = true;
            console.log(CardVariantType, this.cardVariantType);
            this.magicCardsListService
                .addPosibleCardVariationDto({
                    cardVariantType: this.cardVariantType as CardVariantType,
                    cardId: this.cardId,
                    hasNormal: this.hasNormal,
                    hasFoil: this.hasFoil,
                })
                .subscribe(
                    () => {
                        this.creationLoading = false;
                        this.refreshPreview(this.cardSet, this.selectedCardNum);
                    },
                    err => {
                        console.log({ err });
                        this.creationLoading = false;
                    },
                );
        }
    }

    onCardVariationTypeChange() {
        this.hasNormal = defaultCardVariantType[this.cardVariantType as CardVariantType].isNormal;
        this.hasFoil = defaultCardVariantType[this.cardVariantType as CardVariantType].isFoil;
    }

    private createCardPrev(cardSet: string, cardNum: string): Card {
        const lastCard = new Card();
        lastCard.cardExpansion = cardSet;
        lastCard.cardNumber = cardNum.padStart(3, '0');
        lastCard.cardAmount = 1;
        lastCard.cardAmountFoil = 0;
        return lastCard;
    }
}
