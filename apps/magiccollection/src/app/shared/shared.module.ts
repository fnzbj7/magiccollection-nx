import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsDirective } from '../ui/details/details.directive';
import { ToggleSwitchComponent } from '../ui/toggle/toggle-switch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MagicCardComponent } from '../magic/magic-card-list/magic-card/magic-card.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MagicCardAmountDirective } from '../magic/magic-card-list/magic-card/magic-card-amount.directive';
import { FilterPillComponent } from './filter-pill/filter-pill.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DetailsDirective,
        ToggleSwitchComponent,
        MagicCardComponent,
        MagicCardAmountDirective,
        FilterPillComponent,
    ],
    imports: [
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        LazyLoadImageModule,
        CommonModule,
    ],
    exports: [
        FontAwesomeModule,
        DetailsDirective,
        ToggleSwitchComponent,
        MagicCardComponent,
        MagicCardAmountDirective,
        FilterPillComponent,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class SharedModule {}
