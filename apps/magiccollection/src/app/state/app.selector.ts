import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModifyCardState } from './modify-card.reducer';
     
 
export interface AppState {
    modifyCard: ModifyCardState;
}
 
export const selectFeature = (state: AppState) => state.modifyCard;

export const selectCollectionState =
  createFeatureSelector<ModifyCardState>('modifyCard');
 
export const selectSetName = createSelector(
  selectFeature,
  (state: ModifyCardState) => state.setName
);