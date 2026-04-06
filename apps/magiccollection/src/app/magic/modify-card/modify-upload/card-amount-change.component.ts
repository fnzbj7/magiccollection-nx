import { Component, Input } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-card-amount-change',
    templateUrl: './card-amount-change.component.html',
})
export class CardAmountChangeComponent {
    @Input() was = 0;
    @Input() have = 0;
    @Input() imageSrc = '';
    @Input() tooltip = '';
    @Input() tooltipSide: 'left' | 'right' = 'right';

    faAngleDoubleRight = faAngleDoubleRight;
}
