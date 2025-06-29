import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { DraftViewerService } from '../draft-viewer.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    /**
     * Returns the current picked card for the given player index (idx) for the current pack and pick.
     * Returns null if not available.
     */
    getCurrentPickCard(idx: number): Card | null {
        if (!this.draftDef || !this.draftDef.playerPicks[idx]) return null;
        const rounds = this.draftDef.playerPicks[idx].rounds;
        const packIdx = +this.packSelect;
        const pickIdx = +this.pickSelect;
        if (!rounds[packIdx]) return null;
        const split = rounds[packIdx].cards.split(this.separeator);
        const cardId = split[pickIdx];
        if (!cardId) return null;
        const paddedCardId = cardId.padStart(3, '0');
        return this.setCards.find(card => card.cardNumber === paddedCardId) || null;
    }
    Arr = Array;
    draftDef!: DraftDef;
    reconstructedPicks: string[][] = [];
    reconstructedPicksCards: Card[][] = [];
    playerNames: string[] = [];
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

    separeator = ' ';

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private draftViewerService: DraftViewerService,
        private magicCardsListService: MagicCardsListService,
    ) {}

    ngOnInit(): void {
        const draftId = this.activatedRoute.snapshot.params['draftId'];
        this.draftDef = this.draftViewerService.getDraftById(draftId);

        if (this.draftDef === undefined) {
            console.error(`Draft with id ${draftId} not found`);
            this.router.navigate(['/draft-viewer/list']);
            return;
        }

        this.draftDef.playerPicks.forEach((pick, index) => {
            this.playerNames.push(pick.playerName);
        });

        if (this.draftDef.playerPicks[0].rounds[0].cards.includes(' ')) {
            this.separeator = ' ';
        } else if (this.draftDef.playerPicks[0].rounds[0].cards.includes('\n')) {
            this.separeator = '\n';
        }

        this.magicCardsListService
            .getCardsForExpansion(undefined, this.draftDef.setCode)
            .subscribe(cards => {
                this.isLoading = false;
                this.setCards = cards;

                this.getPacksForPlayer(+this.packSelect);
                this.onFilterChange();
            });
    }

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

    goForward() {
        if (+this.pickSelect < this.draftDef.cardsPerPack - 1) {
            this.pickSelect = (+this.pickSelect + 1).toString();
            this.onFilterChange();
        } else {
            if (+this.packSelect < this.draftDef.playerPicks[0].rounds.length - 1) {
                this.packSelect = (+this.packSelect + 1).toString();
                this.pickSelect = '0';
                this.onFilterChange();
            }
        }
    }

    goBackward() {
        if (this.pickSelect !== '0') {
            this.pickSelect = (+this.pickSelect - 1).toString();
            this.onFilterChange();
        } else {
            if (this.packSelect !== '0') {
                this.packSelect = (+this.packSelect - 1).toString();
                this.pickSelect = (this.draftDef.cardsPerPack - 1).toString();
                this.onFilterChange();
            }
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
            const picked = pick.rounds[round].cards.split(this.separeator);
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

        const split = this.draftDef.playerPicks[+this.playerSelect].rounds[
            +this.packSelect
        ].cards.split(this.separeator);

        this.selectedCard = split[+this.pickSelect];
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
                    r.cards.split(this.separeator).forEach(c => {
                        const card = this.setCards.find(
                            card => card.cardNumber === c.padStart(3, '0'),
                        ) as Card;
                        this.pickedCards.push({
                            ...card,
                        });
                    });
                } else {
                    r.cards
                        .split(this.separeator)
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
