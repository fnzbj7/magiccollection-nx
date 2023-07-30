import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../../../model/card.model';

@Component({
    selector: 'app-empty-magic-card',
    template:
        '<ul class="mx-2" ><app-magic-card [magicCard]="dummyCard" [imgSize]="imgSize" [onlyCardBack]="true" [onlyShow]="true"></app-magic-card></ul>',
})
export class EmptyMagicCardComponent implements OnInit {
    @Input() imgSize: 'auto' | 'small' | 'large' = 'auto';
    dummyCard!: Card;

    ngOnInit(): void {
        this.dummyCard = new Card();
        this.dummyCard.cardAmount = 10;
        this.dummyCard.cardAmountFoil = 0;
    }
}
