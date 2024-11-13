import { Card, CardColor, CardType } from '../../model/card.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FilterChange } from '../../model/filter-change.model';
import { CardRarity } from '../../model/card-rarity.enum';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../auth/authentication.service';
import { QuantityFilterEnum } from '../../model/quantity-filter.enum';
import { CardUrls } from '../../model/card-urls.model';
import { MagicSet } from './model/magic-set.model';
import { MagicSetYearBlock } from './model/magic-set-year-block.model';

export const magicSetArray: MagicSet[] = [
    new MagicSet('FDN', 'Foundations', 730, 2024),
    new MagicSet('DSK', 'Duskmourn: House of Horror', 417, 2024),
    new MagicSet('BLB', 'Bloomburrow', 397, 2024),
    new MagicSet('BIG', 'The Big Score', 95, 2024),
    new MagicSet('OTJ', 'Outlaws of Thunder Junction', 374, 2024),
    new MagicSet('OTP', 'Breaking News', 82, 2024),
    new MagicSet('MKM', 'Murders at Karlov Manor', 441, 2024),
    new MagicSet('LCI', 'The Lost Caverns of Ixalan', 471, 2023),
    new MagicSet('WOE', 'Wilds of Eldraine', 453, 2023),
    new MagicSet('WOT', 'Wilds of Eldraine: Enchanting Tales', 103, 2023),
    new MagicSet('MAT', 'March of the Machine: The Aftermath', 230, 2023),
    new MagicSet('MOM', 'March of the Machine', 479, 2023),
    new MagicSet('MUL', 'Multiverse Legends', 195, 2023),
    new MagicSet('ONE', 'Phyrexia: All Will Be One', 479, 2023),
    new MagicSet('BRO', "The Brothers' War", 384, 2022),
    new MagicSet('BRR', "The Brothers' War Retro Artifacts", 126, 2022),
    new MagicSet('DMU', 'Dominaria United', 434, 2022),
    new MagicSet('SNC', 'Streets of New Capenna', 467, 2022),
    new MagicSet('NEO', 'Kamigawa: Neon Dynasty', 512, 2022),
    new MagicSet('VOW', 'Innistrad: Crimson Vow', 407, 2021),
    new MagicSet('MID', 'Innistrad: Midnight Hunt', 391, 2021),
    new MagicSet('AFR', 'Adventures in the Forgotten Realms', 403, 2021),
    new MagicSet('STX', 'Strixhaven: School of Mages', 382, 2021),
    new MagicSet('STA', 'Mystical Archive', 126, 2021),
    new MagicSet('KHM', 'Kaldheim', 405, 2021),
    new MagicSet('ZNR', 'Zendikar Rising', 391, 2020),
    new MagicSet('M21', 'Core Set 2021', 397, 2020),
    new MagicSet('IKO', 'Ikoria: Lair of Behemoths', 387, 2020),
    new MagicSet('THB', 'Theros Beyond Death', 357, 2020),
    new MagicSet('ELD', 'Throne of Eldraine', 392, 2019),
    new MagicSet('M20', 'Core Set 2020', 344, 2019),
    new MagicSet('WAR', 'War of The Spark', 275, 2019),
    new MagicSet('RNA', 'Ravnica Allegiance', 273, 2019),
    new MagicSet('GRN', 'Guilds of Ravnica', 273, 2018),
    new MagicSet('M19', 'Core Set 2019', 314, 2018),
    new MagicSet('DOM', 'Dominaria', 280, 2018),
    new MagicSet('RIX', 'Rival of Ixalan', 205, 2018),
    new MagicSet('XLN', 'Ixalan', 289, 2017),
    new MagicSet('HOU', 'Hour of Devestation', 209, 2017),
    new MagicSet('AKH', 'Amonkhet', 287, 2017),
    new MagicSet('AER', 'Aether Revolt', 194, 2017),
    new MagicSet('KLD', 'Kaladesh', 274, 2016),
    new MagicSet('EMN', 'Eldritch Moon', 205, 2016),
    new MagicSet('SOI', 'Shadows over Innistrad', 297, 2016),
    new MagicSet('OGW', 'Oath of the Gatewatch', 184, 2016),
    new MagicSet('BFZ', 'Battle For Zendikar', 274, 2015),
];

@Injectable({ providedIn: 'root' })
export class MagicCardsListService {
    // RARITY
    rarityFilterArr: string[] = [
        CardRarity.Common,
        CardRarity.Uncommon,
        CardRarity.Rare,
        CardRarity.Mythic,
    ];
    rarityFilterChange = new Subject<FilterChange>();

    // COLOR
    colorFilterArr: string[] = [
        CardColor.WHITE,
        CardColor.BLUE,
        CardColor.BLACK,
        CardColor.RED,
        CardColor.GREEN,
        CardColor.COLORLESS,
    ];
    colorFilterChange = new Subject<FilterChange>();

    // TYPE
    typeFilterArr: string[] = [
        CardType.ARTIFACT,
        CardType.CREATURE,
        CardType.ENCHANTMENT,
        CardType.INSTANT,
        CardType.LAND,
        CardType.PLANESWALKER,
        CardType.SORCERY,
    ];
    typeFilterChange = new Subject<FilterChange>();

    quantityFilterSub = new BehaviorSubject<QuantityFilterEnum>(QuantityFilterEnum.ALL);
    cardImgUrlBase: string;

    cardSetsArray: string[] = magicSetArray.map(magicSet => magicSet.name);

    cardVariantTypes = ['normal', 'etched', 'prerelease', 'stamped', 'list'];

    cardLanguages: string[] = ['En', 'Jp', 'Sp', 'Fr', 'De', 'It', 'Pt', 'Kr', 'Ru', 'Cs', 'Ct'];

    yearBlocks: MagicSetYearBlock[] = this.getMagicSetYearBlocks(magicSetArray);

    constructor(private http: HttpClient, private authService: AuthenticationService) {
        this.cardImgUrlBase = environment.cardImgUrlBase;
    }

    getMagicSetMaxNumber(magicSetName: string): number {
        const foundedMagicSet = magicSetArray.find(magicSet => magicSet.name === magicSetName);
        if (foundedMagicSet === undefined) {
            throw new Error('Magic Set not found!');
        }

        return foundedMagicSet.maxNum;
    }

    getCardsForExpansion(userId: string | number | undefined, cardSet: string): Observable<Card[]> {
        let url: string;
        if (userId) {
            url = `/api/card/user/${userId}/${cardSet}`;
        } else {
            url = `/api/card/cardset/${cardSet}`;
        }
        return this.http.get<Card[]>(url);
    }

    // RARITY
    getRarityFilterArray(): string[] {
        return [...this.rarityFilterArr];
    }

    // COLOR
    getColorFilterArray(): string[] {
        return [...this.colorFilterArr];
    }

    // TYPE
    getTypeFilterArray(): string[] {
        return [...this.typeFilterArr];
    }

    changeRarityFilter(filterChangeName: string, filterChangeTo: boolean) {
        const isInFilterArray = this.rarityFilterArr.includes(filterChangeName);
        if (isInFilterArray !== filterChangeTo) {
            if (isInFilterArray) {
                this.rarityFilterArr.splice(this.rarityFilterArr.indexOf(filterChangeName), 1);
            } else {
                this.rarityFilterArr.push(filterChangeName);
            }
        }
        this.rarityFilterChange.next({
            changedTo: filterChangeTo,
            changeName: filterChangeName,
        });
    }

    changeRarityFilterBulk(filterChangeTo: boolean) {
        if (filterChangeTo) {
            this.rarityFilterArr.push(...['C', 'U', 'R', 'M']);
        } else {
            this.rarityFilterArr = [];
        }
        this.rarityFilterChange.next({
            changedTo: filterChangeTo,
            changeName: 'TODO',
        });
    }

    changeColorFilterBulk(filterChangeTo: boolean) {
        if (filterChangeTo) {
            this.colorFilterArr.push(...['W', 'U', 'B', 'R', 'G', 'C']);
        } else {
            this.colorFilterArr = [];
        }
        this.colorFilterChange.next({
            changedTo: filterChangeTo,
            changeName: 'TODO',
        });
    }

    changeColorFilter(filterChangeName: string, filterChangeTo: boolean) {
        const isInFilterArray = this.colorFilterArr.includes(filterChangeName);
        if (isInFilterArray !== filterChangeTo) {
            if (isInFilterArray) {
                this.colorFilterArr.splice(this.colorFilterArr.indexOf(filterChangeName), 1);
            } else {
                this.colorFilterArr.push(filterChangeName);
            }
        }
        this.colorFilterChange.next({
            changedTo: filterChangeTo,
            changeName: filterChangeName,
        });
    }

    changeTypeFilterBulk(filterChangeTo: boolean) {
        if (filterChangeTo) {
            this.typeFilterArr.push(
                ...[
                    'Creature',
                    'Sorcery',
                    'Instant',
                    'Enchantment',
                    'Artifact',
                    'Planeswalker',
                    'Land',
                ],
            );
        } else {
            this.typeFilterArr = [];
        }
        this.typeFilterChange.next({
            changedTo: filterChangeTo,
            changeName: 'TODO',
        });
    }

    changeTypeFilter(filterChangeName: string, filterChangeTo: boolean) {
        const isInFilterArray = this.typeFilterArr.includes(filterChangeName);
        if (isInFilterArray !== filterChangeTo) {
            if (isInFilterArray) {
                this.typeFilterArr.splice(this.typeFilterArr.indexOf(filterChangeName), 1);
            } else {
                this.typeFilterArr.push(filterChangeName);
            }
        }
        this.typeFilterChange.next({
            changedTo: filterChangeTo,
            changeName: filterChangeName,
        });
    }

    changeQuantityFilter(qualityFilter: QuantityFilterEnum) {
        this.quantityFilterSub.next(qualityFilter);
    }

    creatingCardUrls(card: Card, isFlip: boolean = false): CardUrls {
        const { cardExpansion, cardNumber } = card;
        const cardUrls = new CardUrls(
            `${this.cardImgUrlBase}${cardExpansion}/webp/${cardExpansion}_${cardNumber}.webp`,
            `${this.cardImgUrlBase}${cardExpansion}/png/${cardExpansion}_${cardNumber}.png`,
        );

        if (isFlip) {
            cardUrls.flipCardWebpUrl = `${this.cardImgUrlBase}${cardExpansion}/webp/${cardExpansion}_${cardNumber}_F.webp`;
            cardUrls.flipCardPngUrl = `${this.cardImgUrlBase}${cardExpansion}/png/${cardExpansion}_${cardNumber}_F.png`;
        }

        return cardUrls;
    }

    getAllVersionForCard(cardSet: string, cardNum: number) {
        return this.http.get<{ id: number; possibleCardVariation: PossibleCardVariationDto[] }>(
            '/api/card/all-version',
            { params: { cardNum, cardSet } },
        );
    }

    addPosibleCardVariationDto(addPosibleCardVariationDto: AddPosibleCardVariationDto) {
        return this.http.post<void>(
            '/api/card/add-posible-card-variation',
            addPosibleCardVariationDto,
        );
    }

    private getMagicSetYearBlocks(magicSetArray: MagicSet[]): MagicSetYearBlock[] {
        return magicSetArray.reduce(this.callbackMagicSetYearBlock, [] as MagicSetYearBlock[]);
    }

    private callbackMagicSetYearBlock(
        previouseMagicSetYearBlock: MagicSetYearBlock[],
        magicSet: MagicSet,
    ): MagicSetYearBlock[] {
        const foundMagicSetYearBlock = previouseMagicSetYearBlock.find(
            magicSetYearBlock => magicSetYearBlock.year === magicSet.releaseYear,
        );
        if (foundMagicSetYearBlock) {
            foundMagicSetYearBlock.magicSetArr.push(magicSet.name);
        } else {
            previouseMagicSetYearBlock.push(
                new MagicSetYearBlock(magicSet.releaseYear, magicSet.name),
            );
        }
        return previouseMagicSetYearBlock;
    }
}

export interface PossibleCardVariationDto {
    id: number;
    cardVariantType: CardVariantType;
    hasNormal: boolean;
    hasFoil: boolean;
}

export enum CardVariantType {
    NORMAL = 'normal',
    ETCHED = 'etched',
    PRERELEASE = 'prerelease',
    STAMPED = 'stamped',
    LIST = 'list',
}

export interface AddPosibleCardVariationDto {
    cardVariantType: CardVariantType;
    cardId: number;
    hasNormal: boolean;
    hasFoil: boolean;
}
