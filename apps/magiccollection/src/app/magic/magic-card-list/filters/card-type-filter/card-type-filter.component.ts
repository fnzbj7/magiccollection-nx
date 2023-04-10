import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardType } from '../../../../model/card.model';
import { FilterChange } from '../../../../model/filter-change.model';
import { Subscription, take } from 'rxjs';
import { MagicCardsListService } from '../../magic-cards-list.service';
import { Store } from '@ngrx/store';
import { CardFilterActions } from 'apps/magiccollection/src/app/state/card-filter/card-filter.actions';
import { selectCardFilter } from 'apps/magiccollection/src/app/state/app.selector';

@Component({
    selector: 'div[app-card-type-filter]',
    templateUrl: './card-type-filter.component.html',
    styleUrls: [],
})
export class CardTypeFilterComponent implements OnInit {
    isAllTypeOn = true;
    isCreature = true;
    isSorcery = true;
    isInstant = true;
    isEnchantment = true;
    isArtifact = true;
    isPlaneswalker = true;
    isLand = true;

    constructor(public magicCardsListService: MagicCardsListService, private store: Store) {}

    ngOnInit(): void {
        this.store
            .select(selectCardFilter)
            .pipe(take(1))
            .subscribe(x => {
                this.initTypeFilterValues(x.typeFilterArr);
            });
    }

    onChangeAllType() {
        this.store.dispatch(
            CardFilterActions.changeTypeFilters({ filterChangeTo: this.isAllTypeOn }),
        );
        this.isCreature =
            this.isSorcery =
            this.isInstant =
            this.isEnchantment =
            this.isArtifact =
            this.isPlaneswalker =
            this.isLand =
                this.isAllTypeOn;
    }

    onChangeTypeFilter(filterChangeName: string, filterChangeTo: boolean) {
        this.store.dispatch(
            CardFilterActions.changeTypeFilter({ filterChangeName, filterChangeTo }),
        );
        if (
            this.isCreature === this.isSorcery &&
            this.isSorcery === this.isInstant &&
            this.isInstant === this.isEnchantment &&
            this.isEnchantment === this.isArtifact &&
            this.isArtifact === this.isPlaneswalker &&
            this.isPlaneswalker === this.isLand
        ) {
            this.isAllTypeOn = this.isCreature;
        } else if (
            this.isCreature ||
            this.isSorcery ||
            this.isInstant ||
            this.isEnchantment ||
            this.isArtifact ||
            this.isPlaneswalker ||
            this.isLand
        ) {
            this.isAllTypeOn = true;
        }
    }

    private initTypeFilterValues(filterArray: string[]) {
        let differenceArray: string[] = [
            CardType.CREATURE,
            CardType.ENCHANTMENT,
            CardType.PLANESWALKER,
            CardType.INSTANT,
            CardType.SORCERY,
            CardType.ARTIFACT,
            CardType.LAND,
        ];

        filterArray.forEach(type => {
            this.setTypeFilter(new FilterChange(type, true));
        });

        differenceArray = differenceArray.filter(rarity => filterArray.indexOf(rarity) < 0);
        differenceArray.forEach(rarity => {
            this.setTypeFilter(new FilterChange(rarity, false));
        });
    }

    private setTypeFilter(filterChange: FilterChange) {
        switch (filterChange.changeName) {
            case CardType.ARTIFACT:
                this.isArtifact = filterChange.changedTo;
                break;
            case CardType.CREATURE:
                this.isCreature = filterChange.changedTo;
                break;
            case CardType.ENCHANTMENT:
                this.isEnchantment = filterChange.changedTo;
                break;
            case CardType.INSTANT:
                this.isInstant = filterChange.changedTo;
                break;
            case CardType.LAND:
                this.isLand = filterChange.changedTo;
                break;
            case CardType.PLANESWALKER:
                this.isPlaneswalker = filterChange.changedTo;
                break;
            case CardType.SORCERY:
                this.isSorcery = filterChange.changedTo;
                break;
            default:
                break;
        }
    }
}
