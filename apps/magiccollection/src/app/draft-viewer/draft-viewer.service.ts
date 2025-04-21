import { Injectable } from '@angular/core';

export interface DraftPicks {
    cards: string;
}

export interface PlayerPicks {
    playerName: string;
    rounds: DraftPicks[];
}

export interface DraftDef {
    id: string;
    name: string;
    date: Date;
    setCode: string;
    playerPicks: PlayerPicks[];
}

@Injectable()
export class DraftViewerService {
    temporaryDrafts = new Map<string, DraftDef>();

    constructor() {
        console.log('Csak létrejött a service');
        const dummy = this.creatingDummyDraft();
        this.temporaryDrafts.set(dummy.id, dummy);
    }

    getAllDrafts(): DraftDef[] {
        return Array.from(this.temporaryDrafts.values());
    }

    createNewDraft(draftData: Omit<DraftDef, 'id'>): DraftDef {
        const newDraft: DraftDef = { ...draftData, id: crypto.randomUUID() };
        this.temporaryDrafts.set(newDraft.id, newDraft);
        return newDraft;
    }

    getDraftById(id: string): DraftDef {
        return this.temporaryDrafts.get(id) as DraftDef; // I don't care error handling now
    }

    updateDraft(draft: DraftDef): void {
        if (this.temporaryDrafts.has(draft.id)) {
            this.temporaryDrafts.set(draft.id, draft);
        } else {
            console.error(`Draft with id ${draft.id} not found`);
        }
    }

    deleteDraft(id: string): void {
        if (this.temporaryDrafts.has(id)) {
            this.temporaryDrafts.delete(id);
        } else {
            console.error(`Draft with id ${id} not found`);
        }
    }

    creatingDummyDraft(): DraftDef {
        const players = [];
        for (let i = 0; i < 8; i++) {
            players.push({
                playerName: 'Player ' + (i + 1),
                rounds: [
                    { cards: this.getCardNumbers(i * 3) },
                    { cards: this.getCardNumbers(i * 3 + 1) },
                    { cards: this.getCardNumbers(i * 3 + 2) },
                ],
            });
        }
        return {
            id: 'Dummy-string',
            name: 'Sample Draft ' + Math.floor(Math.random() * 1000),
            date: new Date(),
            setCode: 'TDM',
            playerPicks: players,
        };
    }

    // create a function which gives back a string which will contain numbers starting from i*15 + 1 and goeas to i*15+15
    getCardNumbers(i: number): string {
        let numbers = '';
        for (let j = 1; j <= 15; j++) {
            numbers += i * 15 + j + ' ';
        }
        return numbers.slice(0, -1); // remove the last comma
    }
}
