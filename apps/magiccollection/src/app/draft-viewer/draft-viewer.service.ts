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
}
