import { Component, OnInit } from '@angular/core';
import { DraftViewerService } from '../draft-viewer.service';
import { DraftDef } from '@pointless/api-interfaces';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { magicSetArray } from '../../magic/magic-card-list/magic-cards-list.service';

@Component({
    selector: 'app-draft-list',
    templateUrl: './draft-list.component.html',
    styleUrls: ['./draft-list.component.scss'],
})
export class DraftListComponent implements OnInit {
    drafts!: DraftDef[];

    isLoading = true;
    faPenToSquare = faEdit;

    constructor(private draftViewerService: DraftViewerService) {
        // Constructor logic can go here if needed
    }

    ngOnInit() {
        this.draftViewerService.getAllDrafts().subscribe(drafts => {
            this.drafts = drafts;
            this.isLoading = false;
            console.log({ drafts });
            drafts.map(draft => {
                draft.setCode =
                    magicSetArray.find(set => set.name === draft.setCode)?.fullName ||
                    'Unknown Set';
                // draft.draftDate = new Date(draft.draftDate);
                return draft;
            });
        });
    }

    toggleDropdown(draftId: string) {
        const dropdown = document.getElementById(`dropdown-${draftId}`);
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }

    isDropdownOpen(draftId: string): boolean {
        const dropdown = document.getElementById(`dropdown-${draftId}`);
        return dropdown ? dropdown.classList.contains('show') : false;
    }
}
