export interface Message {
    message: string;
}

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
    draftDate: Date;
    setCode: string;
    cardsPerPack: number;
    playerPicks: PlayerPicks[];
}
