import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DraftDef, DraftViewerService } from '../draft-viewer.service';
import { ActivatedRoute } from '@angular/router';
import { Card, CardLayout } from '../../model/card.model';
import { SwipeModel } from '../../shared/swipe/swipe.model';

export interface PlayerDraftPicks {
    cards: Card[];
}

@Component({
    selector: 'app-draft-viewer-core',
    templateUrl: './draft-viewer-core.component.html',
    styleUrls: ['./draft-viewer-core.component.scss'],
})
export class DraftViewerCoreComponent implements OnInit, AfterViewInit {
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

    ngAfterViewInit(): void {
        const c: HTMLDivElement | null = document.querySelector('#viewer-container');
        if (c) {
            new SwipeModel(c, {
                callbackLeft: this.onSwipeLeft.bind(this),
                callbackRight: this.onSwipeRight.bind(this),
            });
        } else {
            console.warn('nem volt található a #viewer-container');
        }
    }

    goForward() {
        if (this.pickSelect !== '14') {
            this.pickSelect = (+this.pickSelect + 1).toString();
            this.onFilterChange();
        }
    }

    goBackward() {
        console.log('Hy im here B');
        if (this.pickSelect !== '0') {
            this.pickSelect = (+this.pickSelect - 1).toString();
            this.onFilterChange();
        }
    }

    onSwipeLeft() {
        this.goForward();
    }

    onSwipeRight() {
        this.goBackward();
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

        for (let pick = 0; pick < packs[round].length; pick++) {
            for (let person = 0; person < packs.length; person++) {
                if (pick < +this.pickSelect) {
                    continue;
                }
                // We need to shit j by i because the packs are given in circle
                // const nextPackInd = (j + i + (round % 2)) % packs.length; // (this.isEven(round) ? (j + i) % packs.length : (packs.length - 1 - ((j + i) % packs.length))) ;
                const nextPackInd = this.getPackIndex(person, round, pick);
                if (!this.reconstructedPicks[nextPackInd]) {
                    this.reconstructedPicks[nextPackInd] = [];
                }
                const cardId = packs[person][pick];
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

        this.showPackindex = this.getPackIndex(
            +this.playerSelect,
            +this.packSelect,
            +this.pickSelect,
        );
        console.log(
            this.showPackindex,
            this.playerSelect,
            this.packSelect,
            this.pickSelect,
            this.selectedCard,
        );
    }

    getPackIndex(playerSelect: number, packSelect: number, pickSelect: number) {
        if (this.isEven(packSelect)) {
            return (playerSelect + (8 - (pickSelect % 8))) % 8;
        } else {
            return (playerSelect + pickSelect) % 8;
        }
    }
}
