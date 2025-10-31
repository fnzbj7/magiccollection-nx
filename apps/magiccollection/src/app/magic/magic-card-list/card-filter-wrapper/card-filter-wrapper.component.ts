import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../../../auth/authentication.service';
import { CardFilterActions } from '../../../state/card-filter/card-filter.actions';
import { CardColor, CardType } from '../../../model/card.model';
import { CardRarity } from '../../../model/card-rarity.enum';

@Component({
    selector: 'app-magic-card-rarity-filter',
    templateUrl: './card-filter-wrapper.component.html',
    styleUrls: ['./card-filter-wrapper.component.scss'],
})
export class MagicCardRarityFilterComponent implements OnInit {
    isAuth = false;

    constructor(
        private authenticationService: AuthenticationService,
        private store: Store,
    ) {}

    ngOnInit() {
        this.authenticationService.currentUserSubject.subscribe(newStatus => {
            this.isAuth = newStatus !== null;
        });
    }

    setPresetColor(colorCode: string) {
        // Turn off all colors first
        const allColors = [CardColor.WHITE, CardColor.BLUE, CardColor.BLACK, CardColor.RED, CardColor.GREEN, CardColor.COLORLESS];
        allColors.forEach(color => {
            this.store.dispatch(
                CardFilterActions.changeColorFilter({ 
                    filterChangeName: color, 
                    filterChangeTo: color === colorCode 
                })
            );
        });
    }

    setPresetType(typeName: string) {
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

    setPresetRarity(rarityCode: string) {
        // Turn off all rarities first
        const allRarities = [CardRarity.Common, CardRarity.Uncommon, CardRarity.Rare, CardRarity.Mythic];
        allRarities.forEach(rarity => {
            this.store.dispatch(
                CardFilterActions.changeRarityFilter({ 
                    filterChangeName: rarity, 
                    filterChangeTo: rarity === rarityCode 
                })
            );
        });
    }

    resetAllFilters() {
        // Reset all filters to show everything (all ON)
        this.store.dispatch(CardFilterActions.changeColorFilters({ filterChangeTo: true }));
        this.store.dispatch(CardFilterActions.changeTypeFilters({ filterChangeTo: true }));
        this.store.dispatch(CardFilterActions.changeRarityFilters({ filterChangeTo: true }));
    }
}
