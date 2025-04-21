import { Component, OnInit } from '@angular/core';
import { DraftDef, DraftViewerService } from '../draft-viewer.service';
import { ActivatedRoute } from '@angular/router';
import { Card, CardLayout } from '../../model/card.model';

export interface PlayerDraftPicks {
    cards: Card[];
}

@Component({
    selector: 'app-draft-viewer-core',
    templateUrl: './draft-viewer-core.component.html',
    styleUrls: ['./draft-viewer-core.component.scss'],
})
export class DraftViewerCoreComponent implements OnInit {
    draftDef!: DraftDef;
    reconstructedPicks: string[][] = [];
    reconstructedPicksCards: Card[][] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private draftViewerService: DraftViewerService,
    ) {}

    ngOnInit(): void {
        const draftId = this.activatedRoute.snapshot.params['draftId'];
        this.draftDef = this.draftViewerService.getDraftById(draftId);

        this.getPacksForPlayer(0);
        this.convertToCard();
    }

    getPacksForPlayer(playerindex: number): PlayerDraftPicks[] {
        // TODO
        const round = 0;
        const packs: string[][] = [];
        // const reconstructedPicks: string[][] = [];

        this.draftDef.playerPicks.forEach(pick => {
            // TODO
            const picked = pick.rounds[round].cards.split(' ');
            packs.push(picked);
        });

        for (let i = 0; i < packs[0].length; i++) {
            for (let j = 0; j < packs.length; j++) {
                // We need to shit j by i because the packs are given in circle
                const nextPackInd = (j + i) % packs.length;
                if (!this.reconstructedPicks[nextPackInd]) {
                    this.reconstructedPicks[nextPackInd] = [];
                }
                const cardId = packs[j][i];
                this.reconstructedPicks[nextPackInd].push(cardId);
            }
        }

        console.table(this.reconstructedPicks);

        return [];
    }

    convertToCard() {
        this.reconstructedPicksCards = this.reconstructedPicks.map(top => {
            return top.map(c => {
                return {
                    cardExpansion: this.draftDef.setCode,
                    cardNumber: c.padStart(3, '0'),
                    cardAmount: 1,
                    cardAmountFoil: 0,
                    layout: CardLayout.NORMAL,
                    types: 'creatur',
                    colors: 'W',
                    name: 'I dont care',
                    rarity: 'R',
                };
            });
        });
    }
}
