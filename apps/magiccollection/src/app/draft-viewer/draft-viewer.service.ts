import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DraftDef } from '@pointless/api-interfaces';
import { map, tap } from 'rxjs';

@Injectable()
export class DraftViewerService {
    temporaryDrafts = new Map<string, DraftDef>();

    constructor(private http: HttpClient) {
        console.log('Csak létrejött a service');
        const dummy = this.creatingDummyDraft();
        this.temporaryDrafts.set(dummy.id, dummy);
    }

    getAllDrafts() {
        return this.http.get<DraftDef[]>('/api/draft-view/drafts').pipe(
            tap(drafts => {
                drafts.forEach(draft => {
                    this.temporaryDrafts.set(draft.id, draft);
                });
            }),
            map(drafts => {
                drafts.forEach(draft => {
                    draft.draftDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') as unknown as Date; //new Date(draft.draftDate);
                });
                return drafts;
            }),
        );
    }

    createNewDraft(draftData: Omit<DraftDef, 'id'>) {
        return this.http.post('/api/draft-view/create', draftData);
    }

    getDraftById(id: string): DraftDef {
        return this.temporaryDrafts.get(id) as DraftDef; // I don't care error handling now
    }

    updateDraft(draft: DraftDef) {
        return this.http.put('/api/draft-view/update', draft);
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
            draftDate: new Date(),
            setCode: 'TDM',
            cardsPerPack: 15,
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
