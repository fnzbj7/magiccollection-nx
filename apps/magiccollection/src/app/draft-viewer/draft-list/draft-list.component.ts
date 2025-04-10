import { Component } from '@angular/core';

@Component({
    selector: 'app-draft-list',
    templateUrl: './draft-list.component.html',
    styleUrls: ['./draft-list.component.scss'],
})
export class DraftListComponent {
    drafts = [
        { id: 1, name: 'Draft 1', date: '2023-10-01' },
        { id: 2, name: 'Draft 2', date: '2023-10-01' },
    ];
}
