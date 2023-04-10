import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { QuantityFilterEnum } from '../../model/quantity-filter.enum';

export const CardFilterActions = createActionGroup({
    source: 'Card Filter',
    events: {
        'Change Filter': props<{ bookId: string }>(),
        'Change Filters': props<{ bookId: string }>(),
        'Change Quantity Filter': props<{ newQuantity: QuantityFilterEnum }>(),
        'Change Rarity Filter': props<{ filterChangeName: string; filterChangeTo: boolean }>(),
        'Change Rarity Filters': props<{ filterChangeTo: boolean }>(),
        'Change Color Filter': props<{ filterChangeName: string; filterChangeTo: boolean }>(),
        'Change Type Filter': props<{ filterChangeName: string; filterChangeTo: boolean }>(),
        'Change Type Filters': props<{ filterChangeTo: boolean }>(),
    },
});
