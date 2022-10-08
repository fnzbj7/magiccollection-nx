import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-magic-set-icon',
    templateUrl: './magic-set-icon.component.html',
    styleUrls: ['./magic-set-icon.component.scss'],
})
export class MagicSetIconComponent {
    @Input() expansionName!: string;
    @Input() userId: string | undefined;
}
