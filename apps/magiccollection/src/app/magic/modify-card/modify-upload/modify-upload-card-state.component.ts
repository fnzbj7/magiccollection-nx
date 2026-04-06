import { Component, Input } from '@angular/core';
import { CardLayout } from '../../../model/card.model';
import { PriorityList } from '../dto/card-quantity.model';
import { faBoxes, faHandSparkles, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-modify-upload-card-state',
    templateUrl: './modify-upload-card-state.component.html',
})
export class ModifyUploadCardStateComponent {
    @Input() card!: PriorityList;
    @Input() cardSet!: string;

    CardLayout = CardLayout;
    faStar = faStar;
    faHandSparkles = faHandSparkles;
    faBoxes = faBoxes;
    faTrash = faTrash;
}
