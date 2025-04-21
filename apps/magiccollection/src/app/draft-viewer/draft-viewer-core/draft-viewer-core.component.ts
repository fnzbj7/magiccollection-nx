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
    Arr = Array;
    draftDef!: DraftDef;
    reconstructedPicks: string[][] = [];
    reconstructedPicksCards: Card[][] = [];

    playerSelect = '0';
    packSelect = '0';
    pickSelect = '0';

    selectedCard = '';
    showPackindex = 0;

    constructor(
        private activatedRoute: ActivatedRoute,
        private draftViewerService: DraftViewerService,
    ) {}

    ngOnInit(): void {
        const draftId = this.activatedRoute.snapshot.params['draftId'];
        this.draftDef = this.draftViewerService.getDraftById(draftId);

        this.getPacksForPlayer(+this.packSelect);

        this.onFilterChange();
    }

    getPacksForPlayer(round: number) {
        // TODO
        // const round = 0;
        const packs: string[][] = [];
        this.reconstructedPicksCards = [];
        this.reconstructedPicks = [];
        // const reconstructedPicks: string[][] = [];

        this.draftDef.playerPicks.forEach(pick => {
            // TODO
            const picked = pick.rounds[round].cards.split(' ');
            packs.push(picked);
        });

        for (let i = 0; i < packs[round].length; i++) {
            for (let j = 0; j < packs.length; j++) {
                // We need to shit j by i because the packs are given in circle
                const nextPackInd = (j + i + (round % 2)) % packs.length; // (this.isEven(round) ? (j + i) % packs.length : (packs.length - 1 - ((j + i) % packs.length))) ;
                if (!this.reconstructedPicks[nextPackInd]) {
                    this.reconstructedPicks[nextPackInd] = [];
                }
                const cardId = packs[this.isEven(round) ? j : packs.length - j - 1][i];
                this.reconstructedPicks[nextPackInd].push(cardId);
            }
        }
        this.convertToCard();
    }

    isEven(i: number) {
        return i % 2 == 0;
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

    onFilterChange() {
        this.getPacksForPlayer(+this.packSelect);
        this.selectedCard =
            this.draftDef.playerPicks[+this.playerSelect].rounds[+this.packSelect].cards.split(' ')[
                +this.pickSelect
            ];
        this.selectedCard = this.selectedCard.padStart(3, '0');

        this.showPackindex = (+this.playerSelect + +this.pickSelect) % 8;
        console.log(
            this.showPackindex,
            this.playerSelect,
            this.packSelect,
            this.pickSelect,
            this.selectedCard,
        );
    }
}
