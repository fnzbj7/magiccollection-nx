import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-filter-pill',
    templateUrl: './filter-pill.component.html',
})
export class FilterPillComponent {
    @Input() label!: string;
    @Input() isActive = false;
    @Input() tooltip?: string;
    @Input() showSecondaryAction = true;
    @Input() secondaryActionTooltip?: string;

    @Output() primaryAction = new EventEmitter<void>();
    @Output() secondaryAction = new EventEmitter<void>();

    onPrimaryClick(): void {
        this.primaryAction.emit();
    }

    onSecondaryClick(event: MouseEvent): void {
        event.stopPropagation();
        this.secondaryAction.emit();
    }
}
