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
        if (!round.picks || !Array.isArray(round.picks)) return null;
        
        const cardPick = round.picks[pickIdx];
        if (!cardPick || !cardPick.cardNumber) return null;

        const paddedCardId = cardPick.cardNumber.padStart(3, '0');
        const cards = this.cardsBySet.get(cardPick.setCode) || this.setCards;
        return cards.find(card => card.cardNumber === paddedCardId) || null;
    }
    Arr = Array;
    draftDef!: DraftDef;
    reconstructedPicks: Array<{ cardNumber: string; setCode: string }>[] = [];
    reconstructedPicksCards: Card[][] = [];
    playerNames: string[] = [];
    selectedCards: Card[] = [];

    playerSelect = '0';
    packSelect = '0';
    pickSelect = '0';

    selectedCard = '';
    selectedCardIndex = -1;
    showPackindex = 0;
    pickedCards: Card[] = [];
    isLoading = true;
    isSwipeLoaded = false;
    setCards: Card[] = [];
    cardsBySet: Map<string, Card[]> = new Map();

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
            if (!roundData.picks || !Array.isArray(roundData.picks)) {
                packs.push([]);
                return;
            }

            const playerPicks = roundData.picks.map(p => ({
                cardNumber: p.cardNumber,
                setCode: p.setCode || this.draftDef.setCode,
            }));

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
                    this.reconstructedPicks[nextPackInd].push({
                        cardNumber: cardPick.cardNumber,
                        setCode: cardPick.setCode,
                    });
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
                    const paddedCardId = c.cardNumber.padStart(3, '0');
                    const cards = this.cardsBySet.get(c.setCode) || this.setCards;
                    const card = cards.find(card => card.cardNumber === paddedCardId);
                    return card ? { ...card } : null;
                })
                .filter(card => card !== null) as Card[];
        });
    }

    onFilterChange() {
        this.getPacksForPlayer(+this.packSelect);

        const round = this.draftDef.playerPicks[+this.playerSelect].rounds[+this.packSelect];
        const cardPick = round.picks && Array.isArray(round.picks) ? round.picks[+this.pickSelect] : null;

        if (cardPick && cardPick.cardNumber) {
            const setCode = cardPick.setCode || this.draftDef.setCode;
            const paddedCardNumber = cardPick.cardNumber.padStart(3, '0');
            this.selectedCard = setCode + paddedCardNumber;
        } else {
            this.selectedCard = '';
        }

        this.showPackindex = this.getPackIndex(
            +this.playerSelect,
            +this.packSelect,
            +this.pickSelect,
        );
        this.selectedCards = this.reconstructedPicksCards[this.showPackindex] || [];

        // Find the index of the picked card in the booster
        // The picked card is the one that was at position pickSelect for playerSelect
        // We need to find which position in the reconstructed booster corresponds to that card
        // We do this by simulating the reconstruction and tracking when the picked card is added
        this.selectedCardIndex = -1;
        if (cardPick && cardPick.cardNumber) {
            const setCode = cardPick.setCode || this.draftDef.setCode;
            const paddedCardNumber = cardPick.cardNumber.padStart(3, '0');
            const targetIdentifier = setCode + paddedCardNumber;
            
            // Simulate the reconstruction to find the exact position
            // The picked card is added when person === playerSelect and pick === pickSelect
            // and nextPackInd === showPackindex
            const reconstructedPack = this.reconstructedPicks[this.showPackindex] || [];
            
            // Count how many cards with the same identity appear in the booster
            // before the position where the picked card was added during reconstruction
            let sameCardCountBeforePickedCard = 0;
            
            // Iterate through the reconstruction order (same as in getPacksForPlayer)
            // to find when the picked card was added and count cards with same identity before it
            const maxPicks = Math.max(...this.draftDef.playerPicks.map(p => {
                const round = p.rounds[+this.packSelect];
                return round.picks && Array.isArray(round.picks) ? round.picks.length : 0;
            }), 0);
            
            for (let pick = +this.pickSelect; pick < maxPicks; pick++) {
                for (let person = 0; person < this.draftDef.playerPicks.length; person++) {
                    const nextPackInd = this.getPackIndex(person, +this.packSelect, pick);
                    if (nextPackInd !== this.showPackindex) {
                        continue;
                    }
                    
                    // Get the card at this position (same logic as in getPacksForPlayer)
                    const roundData = this.draftDef.playerPicks[person].rounds[+this.packSelect];
                    let cardAtPosition: { cardNumber: string; setCode: string } | null = null;
                    
                    if (roundData.picks && Array.isArray(roundData.picks) && roundData.picks[pick]) {
                        const p = roundData.picks[pick];
                        cardAtPosition = {
                            cardNumber: p.cardNumber,
                            setCode: p.setCode || this.draftDef.setCode,
                        };
                    }
                    
                    if (cardAtPosition && cardAtPosition.cardNumber) {
                        const cardIdentifier = cardAtPosition.setCode + cardAtPosition.cardNumber.padStart(3, '0');
                        
                        // Check if this is the picked card
                        if (person === +this.playerSelect && pick === +this.pickSelect) {
                            // This is the picked card - find its index in the reconstructed pack
                            // It should be at position sameCardCountBeforePickedCard (0-indexed)
                            // among cards with the same identity
                            let currentIndex = 0;
                            for (let i = 0; i < reconstructedPack.length; i++) {
                                const packCardIdentifier = reconstructedPack[i].setCode + reconstructedPack[i].cardNumber.padStart(3, '0');
                                if (packCardIdentifier === targetIdentifier) {
                                    if (currentIndex === sameCardCountBeforePickedCard) {
                                        this.selectedCardIndex = i;
                                        break;
                                    }
                                    currentIndex++;
                                }
                            }
                            break;
                        } else if (cardIdentifier === targetIdentifier) {
                            // This is another card with the same identity that was added before the picked card
                            sameCardCountBeforePickedCard++;
                        }
                    }
                }
                if (this.selectedCardIndex !== -1) {
                    break;
                }
            }
        }

        this.pickedCards = [];
        this.draftDef.playerPicks[+this.playerSelect].rounds
            .filter((r, index) => index <= +this.packSelect)
            .forEach((r, index) => {
                if (!r.picks || !Array.isArray(r.picks)) {
                    return;
                }
                const picks = r.picks;

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
