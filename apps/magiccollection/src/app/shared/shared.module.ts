import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsDirective } from '../ui/details/details.directive';
import { ToggleSwitchComponent } from '../ui/toggle/toggle-switch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailsDirective, ToggleSwitchComponent],
    imports: [FontAwesomeModule, ReactiveFormsModule, FormsModule],
    exports: [
        FontAwesomeModule,
        DetailsDirective,
        ToggleSwitchComponent,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class SharedModule {}
