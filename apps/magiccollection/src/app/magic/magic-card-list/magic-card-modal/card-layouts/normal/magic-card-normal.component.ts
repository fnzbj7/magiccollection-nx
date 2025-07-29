import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardUrls } from '@magiccollection/model/card-urls.model';
import { Card } from '@magiccollection/model/card.model';
import {
    CardVariantType,
    MagicCardsListService,
} from '@magiccollection/magic/magic-card-list/magic-cards-list.service';

@Component({
    selector: 'app-magic-card-normal',
    templateUrl: './magic-card-normal.component.html',
    styleUrls: ['./magic-card-normal.component.css'],
})
export class MagicCardNormalComponent implements OnChanges {
    @Input() magicCard!: Card;
    @Input() cardVariantType: CardVariantType = CardVariantType.NORMAL;
    cardUrls!: CardUrls;

    CardVariantType = CardVariantType;

    constructor(private magicCardsListService: MagicCardsListService) {}

    ngOnChanges(_changes: SimpleChanges): void {
        this.cardUrls = this.magicCardsListService.creatingCardUrls(this.magicCard);
    }
}
