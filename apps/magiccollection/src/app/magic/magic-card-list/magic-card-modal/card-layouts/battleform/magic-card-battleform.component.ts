import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { CardUrls } from 'apps/magiccollection/src/app/model/card-urls.model';
import { Card } from 'apps/magiccollection/src/app/model/card.model';
import { MagicCardsListService } from '../../../magic-cards-list.service';

@Component({
    selector: 'app-magic-card-battleform',
    templateUrl: 'magic-card-battleform.component.html',
    styleUrls: ['magic-card-battleform.component.scss'],
})
export class MagicCardBattleformComponent implements OnChanges {
    @Input() magicCard!: Card;
    flipClass = false;
    cardUrls!: CardUrls;

    faSyncAlt = faSyncAlt;

    constructor(private magicCardsListService: MagicCardsListService) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.cardUrls = this.magicCardsListService.creatingCardUrls(this.magicCard, true);
    }
}
