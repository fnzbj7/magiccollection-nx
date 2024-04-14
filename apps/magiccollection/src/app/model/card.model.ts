export class Card {
    cardExpansion!: string;
    cardNumber!: string;
    cardAmount!: number;
    cardAmountFoil!: number;
    layout!: CardLayout;
    types!: string;
    colors!: string;
    name!: string;
    rarity!: string;
    uniqueCardId?: number;
    cardVariation?: CardVariationDto;
}

export enum CardLayout {
    NORMAL = 'normal',
    TRANSFORM = 'transform',
    MELD = 'meld',
    ADVENTURE = 'adventure',
    AFTERMATH = 'aftermath',
    SAGA = 'saga',
    SPLIT = 'split',

    NONE = 'none',
}

export enum CardType {
    CREATURE = 'Creature',
    ENCHANTMENT = 'Enchantment',
    PLANESWALKER = 'Planeswalker',
    INSTANT = 'Instant',
    SORCERY = 'Sorcery',
    ARTIFACT = 'Artifact',
    LAND = 'Land',
    BATTLE = 'Battle',
}

export enum CardColor {
    WHITE = 'W',
    BLUE = 'U',
    BLACK = 'B',
    RED = 'R',
    GREEN = 'G',
    COLORLESS = 'C',
}

export class CardVariationDto {
    nEn!: number;
    fEn!: number;
    nJp!: number;
    fJp!: number;
    nSp!: number;
    fSp!: number;
    nFr!: number;
    fFr!: number;
    nDe!: number;
    fDe!: number;
    nIt!: number;
    fIt!: number;
    nPt!: number;
    fPt!: number;
    nKr!: number;
    fKr!: number;
    nRu!: number;
    fRu!: number;
    nCs!: number;
    fCs!: number;
    nCt!: number;
    fCt!: number;
}
