import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardRarity } from 'apps/magiccollection/src/app/model/card-rarity.enum';
import { FilterChange } from 'apps/magiccollection/src/app/model/filter-change.model';
import { selectCardFilter } from 'apps/magiccollection/src/app/state/app.selector';
import { CardFilterActions } from 'apps/magiccollection/src/app/state/card-filter/card-filter.actions';
import { Subscription } from 'rxjs';
import { MagicCardsListService } from '../../magic-cards-list.service';

@Component({
    selector: 'div[app-card-rarity]',
    templateUrl: './card-rarity-filter.component.html',
})
export class CardRarityFilterComponent implements OnInit, OnDestroy {
    isAllRarityOn = true;
    isCommon = true;
    isUncommon = true;
    isRare = true;
    isMythic = true;
    private subscription?: Subscription;

    constructor(private magicCardsListService: MagicCardsListService, private store: Store) {}

    ngOnInit(): void {
        this.subscription = this.store.select(selectCardFilter).subscribe(x => {
            this.initRarityFilterValues(x.rarityFilterArr);
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    onChangeRarityFilter(filterChangeName: string, filterChangeTo: boolean) {
        this.store.dispatch(
            CardFilterActions.changeRarityFilter({ filterChangeName, filterChangeTo }),
        );
        this.calculateAllRarityOn();
    }

    calculateAllRarityOn() {
        if (!this.isCommon || !this.isUncommon || !this.isRare || !this.isMythic) {
            this.isAllRarityOn = false;
        } else {
            this.isAllRarityOn = true;
        }
    }

    onSetOnlyRarity(rarityCode: string) {
        // Turn off all rarities first
        const allRarities = [
            CardRarity.Common,
            CardRarity.Uncommon,
            CardRarity.Rare,
            CardRarity.Mythic,
        ];
        allRarities.forEach(rarity => {
            this.store.dispatch(
                CardFilterActions.changeRarityFilter({
                    filterChangeName: rarity,
                    filterChangeTo: rarity === rarityCode,
                }),
            );
        });
    }

    resetRarityFilter() {
        // Turn on all rarities
        this.store.dispatch(CardFilterActions.changeRarityFilters({ filterChangeTo: true }));
        this.isCommon = this.isUncommon = this.isRare = this.isMythic = true;
        this.isAllRarityOn = true;
    }

    changeAllRarityOn() {
        this.store.dispatch(
            CardFilterActions.changeRarityFilters({ filterChangeTo: this.isAllRarityOn }),
        );
        this.magicCardsListService.changeRarityFilterBulk(this.isAllRarityOn);
        this.isCommon = this.isUncommon = this.isRare = this.isMythic = this.isAllRarityOn;
    }

    private initRarityFilterValues(filterArray: string[]) {
        let differenceArray: string[] = [
            CardRarity.Common,
            CardRarity.Uncommon,
            CardRarity.Rare,
            CardRarity.Mythic,
        ];

        filterArray.forEach(r => {
            this.setRarityFilter(new FilterChange(r, true));
        });

        differenceArray = differenceArray.filter(r => filterArray.indexOf(r) < 0);
        differenceArray.forEach(r => {
            this.setRarityFilter(new FilterChange(r, false));
        });
        this.calculateAllRarityOn();
    }

    setRarityFilter(filterChange: FilterChange) {
        switch (filterChange.changeName) {
            case CardRarity.Common:
                this.isCommon = filterChange.changedTo;
                break;
            case CardRarity.Uncommon:
                this.isUncommon = filterChange.changedTo;
                break;
            case CardRarity.Rare:
                this.isRare = filterChange.changedTo;
                break;
            case CardRarity.Mythic:
                this.isMythic = filterChange.changedTo;
                break;
            default:
                break;
        }
    }
}
