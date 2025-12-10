import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { DraftViewerService } from '../draft-viewer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../model/card.model';
import { SwipeModel } from '../../shared/swipe/swipe.model';
import { MagicCardsListService } from '../../magic/magic-card-list/magic-cards-list.service';
import { DraftDef, CardPick } from '@pointless/api-interfaces';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

        const round = rounds[packIdx];
        let cardPick: CardPick | null = null;

        // Handle new format
        if (round.picks && Array.isArray(round.picks)) {
            cardPick = round.picks[pickIdx];
            if (!cardPick || !cardPick.cardNumber) return null;
        } else if (round.cards) {
            // Handle legacy format
            const split = round.cards.split(this.separeator);
            const cardId = split[pickIdx];
            if (!cardId) return null;
            cardPick = {
                cardNumber: cardId.trim(),
                setCode: this.draftDef.setCode,
            };
        } else {
            return null;
        }

        const paddedCardId = cardPick.cardNumber.padStart(3, '0');
        const cards = this.cardsBySet.get(cardPick.setCode) || this.setCards;
        return cards.find(card => card.cardNumber === paddedCardId) || null;
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
    cardsBySet: Map<string, Card[]> = new Map();

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

        // Determine separator for legacy format
        const firstRound = this.draftDef.playerPicks[0]?.rounds[0];
        if (firstRound?.cards) {
            if (firstRound.cards.includes(' ')) {
                this.separeator = ' ';
            } else if (firstRound.cards.includes('\n')) {
                this.separeator = '\n';
            }
        }

        // Collect all unique set codes from the draft
        const setCodes = new Set<string>();
        setCodes.add(this.draftDef.setCode); // Always include primary set

        this.draftDef.playerPicks.forEach(player => {
            player.rounds.forEach(round => {
                if (round.picks && Array.isArray(round.picks)) {
                    round.picks.forEach(pick => {
                        if (pick.setCode) {
                            setCodes.add(pick.setCode);
                        }
                    });
                }
            });
        });

        // Load cards for all sets
        const cardLoaders = Array.from(setCodes).map(setCode =>
            this.magicCardsListService
                .getCardsForExpansion(undefined, setCode)
                .pipe(map(cards => ({ setCode, cards }))),
        );

        if (cardLoaders.length === 0) {
            this.isLoading = false;
            return;
        }

        forkJoin(cardLoaders).subscribe(results => {
            results.forEach(({ setCode, cards }) => {
                this.cardsBySet.set(setCode, cards);
            });

            // Set primary set cards for backward compatibility
            this.setCards = this.cardsBySet.get(this.draftDef.setCode) || [];

            this.isLoading = false;
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
        const packs: Array<{ cardNumber: string; setCode: string }>[] = [];
        this.reconstructedPicksCards = [];
        this.reconstructedPicks = [];

        // Extract picks from each player's round
        this.draftDef.playerPicks.forEach(pick => {
            const roundData = pick.rounds[round];
            let playerPicks: Array<{ cardNumber: string; setCode: string }> = [];

            if (roundData.picks && Array.isArray(roundData.picks)) {
                // New format
                playerPicks = roundData.picks.map(p => ({
                    cardNumber: p.cardNumber,
                    setCode: p.setCode || this.draftDef.setCode,
                }));
            } else if (roundData.cards) {
                // Legacy format
                const split = roundData.cards.split(this.separeator);
                playerPicks = split.map(cardNumber => ({
                    cardNumber: cardNumber.trim(),
                    setCode: this.draftDef.setCode,
                }));
            }

            packs.push(playerPicks);
        });

        // Reconstruct packs based on draft mechanics
        const maxPicks = Math.max(...packs.map(p => p.length), 0);
        for (let pick = 0; pick < maxPicks; pick++) {
            for (let person = 0; person < packs.length; person++) {
                if (pick < +this.pickSelect) {
                    continue;
                }

                const nextPackInd = this.getPackIndex(person, round, pick);
                if (!this.reconstructedPicks[nextPackInd]) {
                    this.reconstructedPicks[nextPackInd] = [];
                }
                const cardPick = packs[person][pick];
                if (cardPick && cardPick.cardNumber) {
                    this.reconstructedPicks[nextPackInd].push(cardPick.cardNumber);
                }
            }
        }
        this.convertToCard();
    }

    isEven(i: number) {
        return i % 2 == 0;
    }

    convertToCard() {
        this.reconstructedPicksCards = this.reconstructedPicks.map(top => {
            return top
                .map(c => {
                    const cardPick =
                        typeof c === 'string'
                            ? { cardNumber: c, setCode: this.draftDef.setCode }
                            : c;
                    const paddedCardId = cardPick.cardNumber.padStart(3, '0');
                    const cards = this.cardsBySet.get(cardPick.setCode) || this.setCards;
                    const card = cards.find(card => card.cardNumber === paddedCardId);
                    return card ? { ...card } : null;
                })
                .filter(card => card !== null) as Card[];
        });
    }

    onFilterChange() {
        this.getPacksForPlayer(+this.packSelect);

        const round = this.draftDef.playerPicks[+this.playerSelect].rounds[+this.packSelect];
        let cardPick: CardPick | null = null;

        if (round.picks && Array.isArray(round.picks)) {
            cardPick = round.picks[+this.pickSelect];
        } else if (round.cards) {
            const split = round.cards.split(this.separeator);
            const cardId = split[+this.pickSelect];
            if (cardId) {
                cardPick = {
                    cardNumber: cardId.trim(),
                    setCode: this.draftDef.setCode,
                };
            }
        }

        if (cardPick && cardPick.cardNumber) {
            this.selectedCard = cardPick.cardNumber.padStart(3, '0');
        } else {
            this.selectedCard = '';
        }

        this.showPackindex = this.getPackIndex(
            +this.playerSelect,
            +this.packSelect,
            +this.pickSelect,
        );
        this.selectedCards = this.reconstructedPicksCards[this.showPackindex] || [];

        this.pickedCards = [];
        this.draftDef.playerPicks[+this.playerSelect].rounds
            .filter((r, index) => index <= +this.packSelect)
            .forEach((r, index) => {
                let picks: CardPick[] = [];
                if (r.picks && Array.isArray(r.picks)) {
                    picks = r.picks;
                } else if (r.cards) {
                    picks = r.cards.split(this.separeator).map(c => ({
                        cardNumber: c.trim(),
                        setCode: this.draftDef.setCode,
                    }));
                }

                if (index !== +this.packSelect) {
                    picks.forEach(pick => {
                        if (pick.cardNumber) {
                            const paddedCardId = pick.cardNumber.padStart(3, '0');
                            const cards = this.cardsBySet.get(pick.setCode) || this.setCards;
                            const card = cards.find(c => c.cardNumber === paddedCardId);
                            if (card) {
                                this.pickedCards.push({ ...card });
                            }
                        }
                    });
                } else {
                    picks
                        .filter((_, idx) => idx <= +this.pickSelect)
                        .forEach(pick => {
                            if (pick.cardNumber) {
                                const paddedCardId = pick.cardNumber.padStart(3, '0');
                                const cards = this.cardsBySet.get(pick.setCode) || this.setCards;
                                const card = cards.find(c => c.cardNumber === paddedCardId);
                                if (card) {
                                    this.pickedCards.push({ ...card });
                                }
                            }
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
