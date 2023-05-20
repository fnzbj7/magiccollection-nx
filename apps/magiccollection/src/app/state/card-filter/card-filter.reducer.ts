import { createReducer, on } from '@ngrx/store';
import { CardRarity } from '../../model/card-rarity.enum';
import { CardColor, CardType } from '../../model/card.model';
import { QuantityFilterEnum } from '../../model/quantity-filter.enum';
import { CardFilterActions } from './card-filter.actions';

export interface CardFilterState {
    quantityFilter: QuantityFilterEnum;
    rarityFilterArr: string[];
    colorFilterArr: string[];
    typeFilterArr: string[];
}

export const initialState: CardFilterState = {
    quantityFilter: QuantityFilterEnum.ALL,
    rarityFilterArr: [CardRarity.Common, CardRarity.Uncommon, CardRarity.Rare, CardRarity.Mythic],
    colorFilterArr: [
        CardColor.WHITE,
        CardColor.BLUE,
        CardColor.BLACK,
        CardColor.RED,
        CardColor.GREEN,
        CardColor.COLORLESS,
    ],
    typeFilterArr: [
        CardType.ARTIFACT,
        CardType.CREATURE,
        CardType.ENCHANTMENT,
        CardType.INSTANT,
        CardType.LAND,
        CardType.PLANESWALKER,
        CardType.SORCERY,
        CardType.BATTLE,
    ],
};

export const cardFilterReducer = createReducer(
    initialState,
    on(CardFilterActions.changeQuantityFilter, (state, { newQuantity: newFilter }) => {
        return {
            ...state,
            quantityFilter: newFilter,
        };
    }),
    on(CardFilterActions.changeRarityFilter, (state, { filterChangeName, filterChangeTo }) => {
        const isInFilterArray = state.rarityFilterArr.includes(filterChangeName);
        if (isInFilterArray !== filterChangeTo) {
            if (isInFilterArray) {
                return {
                    ...state,
                    rarityFilterArr: state.rarityFilterArr.filter(r => r !== filterChangeName),
                };
            } else {
                return {
                    ...state,
                    rarityFilterArr: [...state.rarityFilterArr, filterChangeName],
                };
            }
        }

        return state;
    }),
    on(CardFilterActions.changeRarityFilters, (state, { filterChangeTo }) => {
        return {
            ...state,
            rarityFilterArr: filterChangeTo
                ? [CardRarity.Common, CardRarity.Uncommon, CardRarity.Rare, CardRarity.Mythic]
                : [],
        };
    }),
    on(CardFilterActions.changeColorFilter, (state, { filterChangeName, filterChangeTo }) => {
        const isInFilterArray = state.colorFilterArr.includes(filterChangeName);
        if (isInFilterArray !== filterChangeTo) {
            if (isInFilterArray) {
                return {
                    ...state,
                    colorFilterArr: state.colorFilterArr.filter(c => c !== filterChangeName),
                };
            } else {
                return {
                    ...state,
                    colorFilterArr: [...state.colorFilterArr, filterChangeName],
                };
            }
        }
        return state;
    }),
    on(CardFilterActions.changeColorFilters, (state, { filterChangeTo }) => {
        return {
            ...state,
            colorFilterArr: filterChangeTo
                ? [
                      CardColor.WHITE,
                      CardColor.BLUE,
                      CardColor.BLACK,
                      CardColor.RED,
                      CardColor.GREEN,
                      CardColor.COLORLESS,
                  ]
                : [],
        };
    }),
    on(CardFilterActions.changeTypeFilter, (state, { filterChangeName, filterChangeTo }) => {
        const isInFilterArray = state.typeFilterArr.includes(filterChangeName);
        if (isInFilterArray !== filterChangeTo) {
            if (isInFilterArray) {
                return {
                    ...state,
                    typeFilterArr: state.typeFilterArr.filter(t => t !== filterChangeName),
                };
            } else {
                return {
                    ...state,
                    typeFilterArr: [...state.typeFilterArr, filterChangeName],
                };
            }
        }

        return state;
    }),
    on(CardFilterActions.changeTypeFilters, (state, { filterChangeTo }) => {
        return {
            ...state,
            typeFilterArr: filterChangeTo
                ? [
                      CardType.ARTIFACT,
                      CardType.CREATURE,
                      CardType.ENCHANTMENT,
                      CardType.INSTANT,
                      CardType.LAND,
                      CardType.PLANESWALKER,
                      CardType.SORCERY,
                      CardType.BATTLE,
                  ]
                : [],
        };
    }),
);
