import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { magicSetArray } from '../../magic/magic-card-list/magic-cards-list.service';
import { MagicSet } from '../../magic/magic-card-list/model/magic-set.model';
import { DraftViewerService } from '../draft-viewer.service';
import { DraftDef, PlayerPicks } from '@pointless/api-interfaces';

type modifyDraft = DraftDef | Omit<DraftDef, 'id'>;

@Component({
    selector: 'app-draft-modify',
    templateUrl: './draft-modify.component.html',
    styleUrls: ['./draft-modify.component.scss'],
})
export class DraftModifyComponent implements OnInit {
    // draftId: string | null = null;
    magicSetArray!: MagicSet[];
    draft: DraftDef | null = null;
    isEditMode = false;
    draftDef!: modifyDraft;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private draftViewerService: DraftViewerService,
    ) {
        // Constructor logic can go here if needed
    }

    ngOnInit() {
        this.loadDraft();
        this.magicSetArray = magicSetArray.filter(x => !x.secondary);
    }

    loadDraft() {
        const draftId = this.activatedRoute.snapshot.params['draftId'];
        if (draftId) {
            this.isEditMode = true;
            this.draftDef = this.draftViewerService.getDraftById(draftId);
            if (!this.draftDef) {
                console.error(`Draft with id ${draftId} not found`);
                this.router.navigate(['/draft-viewer/list']);
                return;
            }
        } else {
            this.isEditMode = false;
            this.draftDef = {
                name: 'New Draft',
                draftDate: new Date(),
                setCode: '',
                cardsPerPack: 15,
                playerPicks: this.creating8Player(),
            };
            console.log('New draft creation ongoing', this.draftDef);
        }
    }

    private creating8Player(): PlayerPicks[] {
        const players = [];
        for (let i = 1; i <= 8; i++) {
            players.push({
                playerName: 'Player ' + i,
                rounds: [{ cards: '' }, { cards: '' }, { cards: '' }],
            });
        }
        return players;
    }

    saveDraft() {
        if (this.isEditMode) {
            this.draftViewerService.updateDraft(this.draftDef as DraftDef);
        } else {
            this.draftViewerService.createNewDraft(this.draftDef);
        }
        // navigate back to  the list
        this.router.navigate(['/draft-viewer/list']);
        console.log('Draft saved');
    }
}
