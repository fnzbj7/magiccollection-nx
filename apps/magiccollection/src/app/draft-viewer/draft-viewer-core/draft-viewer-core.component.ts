import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { DraftViewerService } from '../draft-viewer.service';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../model/card.model';
import { SwipeModel } from '../../shared/swipe/swipe.model';
import { MagicCardsListService } from '../../magic/magic-card-list/magic-cards-list.service';
import { DraftDef } from '@pointless/api-interfaces';

export interface PlayerDraftPicks {
    cards: Card[];
}

@Component({
    selector: 'app-draft-viewer-core',
    templateUrl: './draft-viewer-core.component.html',
    styleUrls: ['./draft-viewer-core.component.scss'],
})
export class DraftViewerCoreComponent implements OnInit, AfterViewChecked {
    Arr = Array;
    draftDef!: DraftDef;
    reconstructedPicks: string[][] = [];
    reconstructedPicksCards: Card[][] = [];
    selectedCards: Card[] = [];

    playerSelect = '0';
    packSelect = '0';
    pickSelect = '0';

    selectedCard = '';
    showPackindex = 0;
    pickedCards: Card[] = [];
    isLoading = true;
    isSwipeLoaded = false;
    setCards: Card[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private draftViewerService: DraftViewerService,
        private magicCardsListService: MagicCardsListService,
    ) {}

    ngAfterViewChecked(): void {
        if (!this.isSwipeLoaded && !this.isLoading) {
            this.isSwipeLoaded = true;
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
    }

    ngOnInit(): void {
        const draftId = this.activatedRoute.snapshot.params['draftId'];
        this.draftDef = this.draftViewerService.getDraftById(draftId);

        this.magicCardsListService
            .getCardsForExpansion(undefined, this.draftDef.setCode)
            .subscribe(cards => {
                this.isLoading = false;
                this.setCards = cards;

                this.getPacksForPlayer(+this.packSelect);
                this.onFilterChange();
            });
    }

    goForward() {
        if (+this.pickSelect == this.draftDef.cardsPerPack - 1) {
            this.pickSelect = (+this.pickSelect + 1).toString();
            this.onFilterChange();
        }
    }

    goBackward() {
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
                const card = this.setCards.find(
                    card => card.cardNumber === c.padStart(3, '0'),
                ) as Card;
                return {
                    ...card,
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
        this.selectedCards = this.reconstructedPicksCards[this.showPackindex];

        this.pickedCards = [];
        this.draftDef.playerPicks[+this.playerSelect].rounds
            .filter((r, index) => index <= +this.packSelect)
            .forEach((r, index) => {
                if (index !== +this.packSelect) {
                    r.cards.split(' ').forEach(c => {
                        const card = this.setCards.find(
                            card => card.cardNumber === c.padStart(3, '0'),
                        ) as Card;
                        this.pickedCards.push({
                            ...card,
                        });
                    });
                } else {
                    r.cards
                        .split(' ')
                        .filter((_, index) => index <= +this.pickSelect)
                        .forEach(c => {
                            const card = this.setCards.find(
                                card => card.cardNumber === c.padStart(3, '0'),
                            ) as Card;
                            this.pickedCards.push({
                                ...card,
                            });
                        });
                }
            });

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

    trackCard(_index: number, card: Card) {
        return card.cardExpansion + card.cardNumber;
    }
}
