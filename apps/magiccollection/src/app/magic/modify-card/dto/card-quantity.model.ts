export class CardQuantity {
    cardNumber!: number;
    cardQuantity!: number;
    cardQuantityFoil!: number;
    language!: string;
    type!: string;
}

export interface PriorityList {
    cardNumber: string;
    upload: number;
    was: number;
    have: number;
    uploadF: number;
    wasF: number;
    haveF: number;
}
