import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Card } from '../../../model/card.model';
import { MagicCardModalComponent } from '../magic-card-modal/magic-card-modal.component';
import { environment } from '../../../../environments/environment';
import { MagicCardAmount } from './model/magic-card-amount.model';
import { MagicCardModalService } from '../../../shared/magic-card-modal.service';

@Component({
    selector: 'app-magic-card',
    templateUrl: './magic-card.component.html',
    styleUrls: ['./magic-card.component.scss'],
})
export class MagicCardComponent implements OnChanges {
    @Input() userId: string | undefined = undefined;
    @Input() forceShowAmount = false;
    @Input() magicCard!: Card;
    @Input() onlyShow = false;
    @Input() onlyCardBack = false;
    @Input() imgSize: 'auto' | 'small' | 'tiny' | 'large' = 'auto';
    card!: Card;

    imageSrcPng!: string;
    imageSrcWebp!: string;
    magicCardAmount!: MagicCardAmount;

    defaultWebp = 'assets/img/magic_card_back.webp';
    defaultPng = 'assets/img/magic_card_back.png';

    constructor(private magicCardModalService: MagicCardModalService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['magicCard']) {
            this.card = changes['magicCard'].currentValue;
            this.magicCardAmount = {
                isLoggedIn: this.userId ? true : false,
                cardAmount: this.card.cardAmount,
                cardAmountFoil: this.card.cardAmountFoil,
                forceShowAmount: this.forceShowAmount,
            };
            this.setImgUrls(this.card.cardExpansion, this.card.cardNumber);
        }
    }

    openCardModal() {
        this.magicCardModalService.createMagicCardModal(MagicCardModalComponent, this.magicCard);
    }

    private setImgUrls(cardExpansion: string, cardNumber: string) {
        this.imageSrcPng = !this.onlyCardBack
            ? this.createImgUrl(cardExpansion, cardNumber, 'png')
            : this.defaultPng;

        this.imageSrcWebp = !this.onlyCardBack
            ? this.createImgUrl(cardExpansion, cardNumber, 'webp')
            : this.defaultWebp;
    }

    private createImgUrl(cardExpansion: string, cardNumber: string, imgType: string): string {
        return (
            environment.cardImgUrlBase +
            `${cardExpansion}/${imgType}/${cardExpansion}_${cardNumber}.${imgType}`
        );
    }
}
