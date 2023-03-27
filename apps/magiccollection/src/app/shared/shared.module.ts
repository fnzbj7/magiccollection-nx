import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsDirective } from '../ui/details/details.directive';

@NgModule({
    declarations: [DetailsDirective],
    imports: [FontAwesomeModule],
    exports: [FontAwesomeModule, DetailsDirective],
})
export class SharedModule {}
