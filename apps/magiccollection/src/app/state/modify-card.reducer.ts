import { createReducer, on } from '@ngrx/store';
import { magicSetArray } from '../magic/magic-card-list/magic-cards-list.service';
import { ModifyCardActions } from './modify-card.actions';

export interface ModifyCardState {
    a: ReadonlyArray<string>;
    setName: string;
    language: string;
}

export const initialState: ModifyCardState = {
    a: [],
    setName: magicSetArray[0].name,
    language: 'En',
};

export const modifyCardReducer = createReducer(
    initialState,
    on(ModifyCardActions.removeBook, (state, { bookId }) => ({
        ...state,
        a: state.a.filter(id => id !== bookId),
    })),
    on(ModifyCardActions.addBook, (state, { bookId }) => {
        if (state.a.indexOf(bookId) > -1) return state;

        return { ...state };
    }),
    on(ModifyCardActions.changeSet, (state, { setName }) => ({ ...state, setName })),
    on(ModifyCardActions.changeLanguage, (state, { language }) => ({ ...state, language })),
    on(ModifyCardActions.reset, state => ({ ...state, a: [] })),
);
