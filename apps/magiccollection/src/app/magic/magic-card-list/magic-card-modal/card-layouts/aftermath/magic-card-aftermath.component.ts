import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { CardUrls } from 'apps/magiccollection/src/app/model/card-urls.model';
import { Card } from '../../../../../model/card.model';
import { MagicCardsListService } from '../../../magic-cards-list.service';

@Component({
    selector: 'app-magic-card-aftermath',
    templateUrl: './magic-card-aftermath.component.html',
    styleUrls: ['./magic-card-aftermath.component.css'],
})
export class MagicCardAftermathComponent implements OnChanges {
    @Input() magicCard!: Card;
    flipClass = false;
    cardUrls!: CardUrls;

    faSyncAlt = faSyncAlt;

    constructor(private magicCardsListService: MagicCardsListService) {}

    ngOnChanges(_changes: SimpleChanges): void {
        this.cardUrls = this.magicCardsListService.creatingCardUrls(this.magicCard);
    }
}
