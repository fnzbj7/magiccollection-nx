import { Component, OnInit } from '@angular/core';
import { MagicCardsListService } from '../magic-cards-list.service';
import { QuantityFilterEnum } from '../../../model/quantity-filter.enum';
import { CardRarity } from '../../../model/card-rarity.enum';
import { FilterChange } from '../../../model/filter-change.model';
import { AuthenticationService } from '../../../auth/authentication.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CardColor } from '../../../model/card.model';
import { Store } from '@ngrx/store';
import { CardFilterActions } from '../../../state/card-filter/card-filter.actions';

@Component({
    selector: 'app-magic-card-rarity-filter',
    templateUrl: './magic-card-rarity-filter.component.html',
    styleUrls: ['./magic-card-rarity-filter.component.scss'],
})
export class MagicCardRarityFilterComponent implements OnInit {
    isAuth = false;
    // Color
    isAllColorOn = true;
    isWhite = true;
    isBlue = true;
    isBlack = true;
    isRed = true;
    isGreen = true;
    isColorless = true;

    // Font-Aesome
    faInfoCircle = faInfoCircle;

    constructor(
        private magicCardsListService: MagicCardsListService,
        private authenticationService: AuthenticationService,
        private store: Store,
    ) {}

    ngOnInit() {
        this.initColorFilterValues(this.magicCardsListService.getColorFilterArray());

        this.magicCardsListService.colorFilterChange.subscribe(change => {
            this.setColorFilter(change);
        });

        this.authenticationService.currentUserSubject.subscribe(newStatus => {
            this.isAuth = newStatus !== null;
        });
    }

    changeAllColorOn() {
        this.magicCardsListService.changeColorFilterBulk(this.isAllColorOn);
        this.isWhite =
            this.isBlue =
            this.isBlack =
            this.isRed =
            this.isGreen =
            this.isColorless =
                this.isAllColorOn;
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
        // switch (filterChange.changeName) {
        //     case CardColor.WHITE:
        //         this.isWhite = filterChange.changedTo;
        //         break;
        //     case CardColor.BLUE:
        //         this.isBlue = filterChange.changedTo;
        //         break;
        //     case CardColor.BLACK:
        //         this.isBlack = filterChange.changedTo;
        //         break;
        //     case CardColor.RED:
        //         this.isRed = filterChange.changedTo;
        //         break;
        //     case CardColor.GREEN:
        //         this.isGreen = filterChange.changedTo;
        //         break;
        //     case CardColor.COLORLESS:
        //         this.isColorless = filterChange.changedTo;
        //         break;
        //     default:
        //         break;
        // }
    }
}
