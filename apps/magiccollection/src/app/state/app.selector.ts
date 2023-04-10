import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardFilterState } from './card-filter/card-filter.reducer';
import { ModifyCardState } from './modify-card.reducer';

export interface AppState {
    modifyCard: ModifyCardState;
    cardFilter: CardFilterState;
}

export const selectFeature = (state: AppState) => state.modifyCard;

export const selectCollectionState = createFeatureSelector<ModifyCardState>('modifyCard');

export const selectSetName = createSelector(
    selectFeature,
    (state: ModifyCardState) => state.setName,
);

export const selectCardFilter = createFeatureSelector<CardFilterState>('cardFilter');
