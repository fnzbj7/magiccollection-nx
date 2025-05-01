import { Component, OnInit } from '@angular/core';
import { DraftViewerService } from '../draft-viewer.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { magicSetArray } from '../../magic/magic-card-list/magic-cards-list.service';

interface DraftTableView {
    id: string;
    draftName: string;
    draftDate: string;
    setFullName: string;
    setCode: string;
}

@Component({
    selector: 'app-draft-list',
    templateUrl: './draft-list.component.html',
    styleUrls: ['./draft-list.component.scss'],
})
export class DraftListComponent implements OnInit {
    draftsTableView!: DraftTableView[];

    isLoading = true;
    faPenToSquare = faEdit;

    constructor(private draftViewerService: DraftViewerService) {
        // Constructor logic can go here if needed
    }

    ngOnInit() {
        this.draftViewerService.getAllDrafts().subscribe(drafts => {
            this.isLoading = false;
            console.log({ drafts });
            this.draftsTableView = drafts.map(draft => {
                return {
                    id: draft.id,
                    draftName: draft.name,
                    draftDate: new Date(draft.draftDate)
                        .toISOString()
                        .split('T')[0]
                        .replace(/-/g, '.'),
                    setFullName:
                        magicSetArray.find(set => set.name === draft.setCode)?.fullName ||
                        'Unknown Set',
                    setCode: draft.setCode,
                } as DraftTableView;
            });
        });
    }
}
