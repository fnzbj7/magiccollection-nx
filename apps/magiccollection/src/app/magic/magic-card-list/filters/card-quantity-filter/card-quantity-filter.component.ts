import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../../../../auth/authentication.service';
import { QuantityFilterEnum } from '../../../../model/quantity-filter.enum';
import { selectCardFilter } from '../../../../state/app.selector';
import { CardFilterActions } from '../../../../state/card-filter/card-filter.actions';
import { take } from 'rxjs';

@Component({
    selector: 'div[app-card-quantity]',
    templateUrl: './card-quantity-filter.component.html',
    styleUrls: ['./card-quantity-filter.component.scss'],
})
export class CardQuantityFilterComponent implements OnInit {
    quantityEnum = QuantityFilterEnum;
    quantityFilter!: QuantityFilterEnum;

    constructor(private authenticationService: AuthenticationService, private store: Store) {}

    ngOnInit(): void {
        this.store
            .select(selectCardFilter)
            .pipe(take(1))
            .subscribe(x => {
                this.quantityFilter = x.quantityFilter;
            });
        this.authenticationService.currentUserSubject.subscribe(newStatus => {
            const isAuth = newStatus !== null;
            if (!isAuth && QuantityFilterEnum.ALL !== this.quantityFilter) {
                this.quantityFilter = QuantityFilterEnum.ALL;
                this.store.dispatch(
                    CardFilterActions.changeQuantityFilter({ newQuantity: QuantityFilterEnum.ALL }),
                );
            }
        });
    }

    onQuantityChange(newQuantity: QuantityFilterEnum) {
        this.quantityFilter = newQuantity;
        this.store.dispatch(CardFilterActions.changeQuantityFilter({ newQuantity }));
    }
}
