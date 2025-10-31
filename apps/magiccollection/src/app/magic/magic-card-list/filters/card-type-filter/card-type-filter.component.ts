import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardType } from '../../../../model/card.model';
import { FilterChange } from '../../../../model/filter-change.model';
import { Subscription } from 'rxjs';
import { MagicCardsListService } from '../../magic-cards-list.service';
import { Store } from '@ngrx/store';
import { CardFilterActions } from 'apps/magiccollection/src/app/state/card-filter/card-filter.actions';
import { selectCardFilter } from 'apps/magiccollection/src/app/state/app.selector';

@Component({
    selector: 'div[app-card-type-filter]',
    templateUrl: './card-type-filter.component.html',
    styleUrls: [],
})
export class CardTypeFilterComponent implements OnInit, OnDestroy {
    isAllTypeOn = true;
    isCreature = true;
    isSorcery = true;
    isInstant = true;
    isEnchantment = true;
    isArtifact = true;
    isPlaneswalker = true;
    isLand = true;
    private subscription?: Subscription;

    constructor(public magicCardsListService: MagicCardsListService, private store: Store) {}

    ngOnInit(): void {
        this.subscription = this.store
            .select(selectCardFilter)
            .subscribe(x => {
                this.initTypeFilterValues(x.typeFilterArr);
            });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
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

    onTypeButtonClick(event: MouseEvent, typeName: string, newValue: boolean) {
        const target = event.target as HTMLElement;
        // Check if the click was on the arrow span
        const isArrowClick = target.getAttribute('title')?.includes('Only') || 
                             target.textContent?.trim() === '→' ||
                             (target.tagName === 'SPAN' && target.textContent?.trim() === '→');
        if (isArrowClick) {
            event.stopPropagation();
            this.onSetOnlyType(typeName);
        } else {
            this.onChangeTypeFilter(typeName, newValue);
        }
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

    onSetOnlyType(typeName: string) {
        // Turn off all types first
        const allTypes = [
            CardType.ARTIFACT,
            CardType.CREATURE,
            CardType.ENCHANTMENT,
            CardType.INSTANT,
            CardType.LAND,
            CardType.PLANESWALKER,
            CardType.SORCERY,
            CardType.BATTLE,
        ];
        allTypes.forEach(type => {
            this.store.dispatch(
                CardFilterActions.changeTypeFilter({ 
                    filterChangeName: type, 
                    filterChangeTo: type === typeName 
                })
            );
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
