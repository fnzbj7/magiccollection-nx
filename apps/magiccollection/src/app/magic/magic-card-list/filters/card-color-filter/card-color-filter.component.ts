import { Component, OnDestroy, OnInit } from '@angular/core';
import { MagicCardsListService } from '../../magic-cards-list.service';
import { Store } from '@ngrx/store';
import { CardFilterActions } from '../../../../state/card-filter/card-filter.actions';
import { FilterChange } from '../../../../model/filter-change.model';
import { CardColor } from '../../../../model/card.model';
import { Subscription } from 'rxjs';
import { selectCardFilter } from '../../../../state/app.selector';

@Component({
    selector: 'div[app-card-color-filter]',
    templateUrl: './card-color-filter.component.html',
})
export class CardColorFilterComponent implements OnInit, OnDestroy {
    // Color
    isAllColorOn = true;
    isWhite = true;
    isBlue = true;
    isBlack = true;
    isRed = true;
    isGreen = true;
    isColorless = true;
    private subscription?: Subscription;

    constructor(private magicCardsListService: MagicCardsListService, private store: Store) {}

    ngOnInit(): void {
        this.subscription = this.store
            .select(selectCardFilter)
            .subscribe(x => {
                this.initColorFilterValues(x.colorFilterArr);
            });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    initColorFilterValues(filterArray: string[]) {
        let differenceArray: string[] = [
            CardColor.WHITE,
            CardColor.BLUE,
            CardColor.BLACK,
            CardColor.RED,
            CardColor.GREEN,
            CardColor.COLORLESS,
        ];

        filterArray.forEach(color => {
            this.setColorFilter(new FilterChange(color, true));
        });

        differenceArray = differenceArray.filter(color => filterArray.indexOf(color) < 0);
        differenceArray.forEach(color => {
            this.setColorFilter(new FilterChange(color, false));
        });
    }

    setColorFilter(filterChange: FilterChange) {
        switch (filterChange.changeName) {
            case CardColor.WHITE:
                this.isWhite = filterChange.changedTo;
                break;
            case CardColor.BLUE:
                this.isBlue = filterChange.changedTo;
                break;
            case CardColor.BLACK:
                this.isBlack = filterChange.changedTo;
                break;
            case CardColor.RED:
                this.isRed = filterChange.changedTo;
                break;
            case CardColor.GREEN:
                this.isGreen = filterChange.changedTo;
                break;
            case CardColor.COLORLESS:
                this.isColorless = filterChange.changedTo;
                break;
            default:
                break;
        }
    }

    onColorButtonClick(event: MouseEvent, colorCode: string, newValue: boolean) {
        const target = event.target as HTMLElement;
        // Check if the click was on the arrow span
        const isArrowClick = target.getAttribute('title')?.includes('Only') || 
                             target.textContent?.trim() === '→' ||
                             (target.tagName === 'SPAN' && target.textContent?.trim() === '→');
        if (isArrowClick) {
            event.stopPropagation();
            this.onSetOnlyColor(colorCode);
        } else {
            this.onChangeColorFilter(colorCode, newValue);
        }
    }

    onChangeColorFilter(filterChangeName: string, filterChangeTo: boolean) {
        this.store.dispatch(
            CardFilterActions.changeColorFilter({ filterChangeName, filterChangeTo }),
        );
        if (
            this.isWhite === this.isBlue &&
            this.isBlue === this.isBlack &&
            this.isBlack === this.isRed &&
            this.isRed === this.isGreen &&
            this.isGreen === this.isColorless
        ) {
            this.isAllColorOn = this.isWhite;
        } else if (
            this.isWhite ||
            this.isBlue ||
            this.isBlack ||
            this.isRed ||
            this.isGreen ||
            this.isColorless
        ) {
            this.isAllColorOn = true;
        }
    }

    changeAllColorOn() {
        this.store.dispatch(
            CardFilterActions.changeColorFilters({ filterChangeTo: this.isAllColorOn }),
        );

        this.isWhite =
            this.isBlue =
            this.isBlack =
            this.isRed =
            this.isGreen =
            this.isColorless =
                this.isAllColorOn;
    }

    onSetOnlyColor(colorCode: string) {
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
}
