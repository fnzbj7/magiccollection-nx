import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { magicSetArray } from '../../magic/magic-card-list/magic-cards-list.service';
import { MagicSet } from '../../magic/magic-card-list/model/magic-set.model';
import { DraftViewerService } from '../draft-viewer.service';
import { DraftDef, PlayerPicks, DraftPicks, CardPick } from '@pointless/api-interfaces';

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
    isSaveOngoing = false;
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
            // Convert old format to new format if needed
            this.convertLegacyFormat();
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

    private convertLegacyFormat() {
        // Convert old string format to new picks format if needed
        this.draftDef.playerPicks.forEach(player => {
            player.rounds.forEach(round => {
                if (round.cards && !round.picks) {
                    const separator = round.cards.includes('\n') ? '\n' : ' ';
                    const cardNumbers = round.cards
                        .split(separator)
                        .map(c => c.trim())
                        .filter(c => c !== '');
                    round.picks = cardNumbers.map(cardNumber => ({
                        cardNumber: cardNumber,
                        setCode: this.draftDef.setCode,
                    }));
                }
            });
        });
    }

    private creating8Player(): PlayerPicks[] {
        const players = [];
        for (let i = 1; i <= 8; i++) {
            players.push({
                playerName: 'Player ' + i,
                rounds: [
                    { picks: this.createEmptyPicks() },
                    { picks: this.createEmptyPicks() },
                    { picks: this.createEmptyPicks() },
                ],
            });
        }
        return players;
    }

    private createEmptyPicks(): CardPick[] {
        return Array(this.draftDef?.cardsPerPack || 15)
            .fill(null)
            .map(() => ({
                cardNumber: '',
                setCode: this.draftDef?.setCode || '',
            }));
    }

    getPicksForRound(playerIndex: number, roundIndex: number): CardPick[] {
        const round = this.draftDef.playerPicks[playerIndex]?.rounds[roundIndex];
        if (!round) {
            return this.createEmptyPicks();
        }
        if (!round.picks) {
            round.picks = this.createEmptyPicks();
        }
        // Ensure we have enough picks for cardsPerPack
        while (round.picks.length < this.draftDef.cardsPerPack) {
            round.picks.push({
                cardNumber: '',
                setCode: this.draftDef.setCode,
            });
        }
        // Trim to cardsPerPack if needed
        if (round.picks.length > this.draftDef.cardsPerPack) {
            round.picks = round.picks.slice(0, this.draftDef.cardsPerPack);
        }
        // Update setCode for empty picks to match draft's setCode
        round.picks.forEach(pick => {
            if (!pick.cardNumber && (!pick.setCode || pick.setCode === this.draftDef.setCode)) {
                pick.setCode = this.draftDef.setCode;
            }
        });
        return round.picks;
    }

    // Ensure setCode defaults to draft's setCode if empty
    ensureSetCode(pick: CardPick) {
        if (!pick.setCode) {
            pick.setCode = this.draftDef.setCode;
        }
    }

    handleKeydown(
        event: KeyboardEvent,
        playerIndex: number,
        roundIndex: number,
        pickIndex: number,
    ) {
        const input = event.target as HTMLInputElement;
        const cursorPosition = input.selectionStart || 0;
        const valueLength = input.value.length;

        // Space key: move to next input
        if (event.key === ' ') {
            event.preventDefault();
            this.focusNextInput(playerIndex, roundIndex, pickIndex);
            return;
        }

        // Left arrow: if at start, move to previous input
        if (event.key === 'ArrowLeft' && cursorPosition === 0) {
            event.preventDefault();
            this.focusPreviousInput(playerIndex, roundIndex, pickIndex);
            return;
        }

        // Right arrow: if at end, move to next input
        if (event.key === 'ArrowRight' && cursorPosition === valueLength) {
            event.preventDefault();
            this.focusNextInput(playerIndex, roundIndex, pickIndex);
            return;
        }
    }

    focusNextInput(playerIndex: number, roundIndex: number, pickIndex: number) {
        const maxPicks = this.draftDef.cardsPerPack - 1;

        // Try next pick in same round
        if (pickIndex < maxPicks) {
            const nextInput = document.getElementById(
                `cardNumber-${playerIndex}-${roundIndex}-${pickIndex + 1}`,
            );
            if (nextInput) {
                nextInput.focus();
                (nextInput as HTMLInputElement).select();
                return;
            }
        }

        // Try first pick of next round
        if (roundIndex < 2) {
            const nextInput = document.getElementById(
                `cardNumber-${playerIndex}-${roundIndex + 1}-0`,
            );
            if (nextInput) {
                nextInput.focus();
                (nextInput as HTMLInputElement).select();
                return;
            }
        }

        // Try first pick of first round of next player
        if (playerIndex < this.draftDef.playerPicks.length - 1) {
            const nextInput = document.getElementById(`cardNumber-${playerIndex + 1}-0-0`);
            if (nextInput) {
                nextInput.focus();
                (nextInput as HTMLInputElement).select();
            }
        }
    }

    focusPreviousInput(playerIndex: number, roundIndex: number, pickIndex: number) {
        // Try previous pick in same round
        if (pickIndex > 0) {
            const prevInput = document.getElementById(
                `cardNumber-${playerIndex}-${roundIndex}-${pickIndex - 1}`,
            );
            if (prevInput) {
                prevInput.focus();
                (prevInput as HTMLInputElement).setSelectionRange(
                    (prevInput as HTMLInputElement).value.length,
                    (prevInput as HTMLInputElement).value.length,
                );
                return;
            }
        }

        // Try last pick of previous round
        if (roundIndex > 0) {
            const maxPicks = this.draftDef.cardsPerPack - 1;
            const prevInput = document.getElementById(
                `cardNumber-${playerIndex}-${roundIndex - 1}-${maxPicks}`,
            );
            if (prevInput) {
                prevInput.focus();
                (prevInput as HTMLInputElement).setSelectionRange(
                    (prevInput as HTMLInputElement).value.length,
                    (prevInput as HTMLInputElement).value.length,
                );
                return;
            }
        }

        // Try last pick of last round of previous player
        if (playerIndex > 0) {
            const maxPicks = this.draftDef.cardsPerPack - 1;
            const prevInput = document.getElementById(
                `cardNumber-${playerIndex - 1}-2-${maxPicks}`,
            );
            if (prevInput) {
                prevInput.focus();
                (prevInput as HTMLInputElement).setSelectionRange(
                    (prevInput as HTMLInputElement).value.length,
                    (prevInput as HTMLInputElement).value.length,
                );
            }
        }
    }

    saveDraft() {
        this.isSaveOngoing = true;
        // Clean up empty picks before saving
        this.draftDef.playerPicks.forEach(player => {
            player.rounds.forEach(round => {
                if (round.picks) {
                    // Remove empty picks at the end
                    while (
                        round.picks.length > 0 &&
                        !round.picks[round.picks.length - 1]?.cardNumber
                    ) {
                        round.picks.pop();
                    }
                    // Filter out completely empty picks
                    round.picks = round.picks.filter(
                        pick => pick.cardNumber && pick.cardNumber.trim() !== '',
                    );
                }
            });
        });

        if (this.isEditMode) {
            this.draftViewerService
                .updateDraft(this.draftDef as DraftDef)
                .subscribe(updatedDraft => {
                    // navigate back to  the list
                    this.router.navigate(['/draft-viewer/list']);
                    console.log('Draft saved');
                });
        } else {
            this.draftViewerService.createNewDraft(this.draftDef).subscribe(drafts => {
                console.log({ drafts });
                this.router.navigate(['/draft-viewer/list']);
            });
        }
    }
}
