import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { magicSetArray } from '../../magic/magic-card-list/magic-cards-list.service';
import { MagicSet } from '../../magic/magic-card-list/model/magic-set.model';

@Component({
    selector: 'app-draft-modify',
    templateUrl: './draft-modify.component.html',
    styleUrls: ['./draft-modify.component.scss'],
})
export class DraftModifyComponent implements OnInit {
    draftId: string | null = null;
    magicSetArray!: MagicSet[];
    cardNumbersStr!: string;

    constructor(private activatedRoute: ActivatedRoute) {
        // Constructor logic can go here if needed
    }

    ngOnInit() {
        this.draftId = this.activatedRoute.snapshot.params['draftId'];
        this.magicSetArray = magicSetArray.filter(x => !x.secondary);
        // Initialization logic can go here if needed
    }

    saveDraft() {
        // TODO save draft
        console.log('Draft saved', this.cardNumbersStr);
    }
}
