export interface Message {
    message: string;
}

export interface CardPick {
    cardNumber: string;
    setCode: string; // defaults to draft's setCode if not specified
}

export interface DraftPicks {
    cards?: string; // Legacy format - kept for backward compatibility
    picks?: CardPick[]; // New format - array of card picks with set codes
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
