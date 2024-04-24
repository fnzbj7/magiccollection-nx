import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ModifyCardActions = createActionGroup({
    source: 'Modify Card',
    events: {
        'Add Book': props<{ bookId: string }>(),
        'Remove Book': props<{ bookId: string }>(),
        'Change Set': props<{ setName: string }>(),
        'Change Language': props<{ language: string }>(),
        Reset: emptyProps(),
    },
});

// export const BooksApiActions = createActionGroup({
//   source: 'Books API',
//   events: {
//     'Retrieved Book List': props<{ books: ReadonlyArray<Book> }>(),
//   },
// });
