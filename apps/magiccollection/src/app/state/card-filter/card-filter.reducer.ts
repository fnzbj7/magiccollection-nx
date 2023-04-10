import { createReducer, on } from '@ngrx/store';
import { CardColor } from '../../model/card.model';
import { CardFilterActions } from './card-filter.actions';

export interface CardFilterState {
    filters: string[];
    colorFilterArr: string[];
}

// colorFilterArr: string[] = [
//     CardColor.WHITE,

export const initialState: CardFilterState = {
    filters: ['A'],
    colorFilterArr: [
        CardColor.WHITE,
        CardColor.BLUE,
        CardColor.BLACK,
        CardColor.RED,
        CardColor.GREEN,
        CardColor.COLORLESS,
    ],
};

export const cardFilterReducer = createReducer(
    initialState,
    on(CardFilterActions.changeFilter, (state, { bookId }) => ({ ...state })),
    on(CardFilterActions.changeFilter, (state, { bookId }) => {
        return { ...state };
    }),
);
