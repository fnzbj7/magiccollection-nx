import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CardFilterActions = createActionGroup({
    source: 'Card Filter',
    events: {
        'Change Filter': props<{ bookId: string }>(),
        'Change Filters': props<{ bookId: string }>(),
    },
});
