import { Component, OnInit } from '@angular/core';
import { DraftViewerService } from '../draft-viewer.service';
import { DraftDef } from '@pointless/api-interfaces';

@Component({
    selector: 'app-draft-list',
    templateUrl: './draft-list.component.html',
    styleUrls: ['./draft-list.component.scss'],
})
export class DraftListComponent implements OnInit {
    drafts!: DraftDef[];
    isLoading = true;

    constructor(private draftViewerService: DraftViewerService) {
        // Constructor logic can go here if needed
    }

    ngOnInit() {
        this.draftViewerService.getAllDrafts().subscribe(drafts => {
            this.drafts = drafts;
            this.isLoading = false;
            console.log({ drafts });
        });
    }
}
