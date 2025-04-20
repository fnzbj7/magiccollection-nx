import { Component, OnInit } from '@angular/core';
import { DraftDef, DraftViewerService } from '../draft-viewer.service';

@Component({
    selector: 'app-draft-list',
    templateUrl: './draft-list.component.html',
    styleUrls: ['./draft-list.component.scss'],
})
export class DraftListComponent implements OnInit {
    drafts!: DraftDef[];

    constructor(private draftViewerService: DraftViewerService) {
        // Constructor logic can go here if needed
    }

    ngOnInit() {
        this.drafts = this.draftViewerService.getAllDrafts();
    }
}
