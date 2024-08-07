import { MigrationInterface, QueryRunner } from 'typeorm';
import { CardSet } from '../card/entity/card-set.entity';
import { CardVariantType } from '../card/entity/card-variant-type.enum';
import { Card } from '../card/entity/card.entity';
import { PossibleCardVariation } from '../card/entity/possible-card-variation.entity';
import { MigrationHelper } from './helper/migration-helper';

export class addWot1693652437654 implements MigrationInterface {
    shortName = 'WOT';
    public async up(queryRunner: QueryRunner): Promise<void> {
        const cardValues = [
            {
                cardNumber: 1,
                name: 'Blind Obedience',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 2,
                name: 'Dawn of Hope',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 3,
                name: 'Grasp of Fate',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 4,
                name: 'Greater Auramancy',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 5,
                name: 'Griffin Aerie',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 6,
                name: 'Intangible Virtue',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 7,
                name: 'Karmic Justice',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 8,
                name: 'Knightly Valor',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 9,
                name: 'Land Tax',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 10,
                name: 'Leyline of Sanctity',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 11,
                name: 'Phyrexian Unlife',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 12,
                name: 'Rest in Peace',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 13,
                name: 'Smothering Tithe',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 14,
                name: 'As Foretold',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 15,
                name: 'Compulsion',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 16,
                name: 'Copy Enchantment',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 17,
                name: 'Curiosity',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 18,
                name: 'Forced Fruition',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 19,
                name: 'Fraying Sanity',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 20,
                name: 'Hatching Plans',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 21,
                name: 'Intruder Alarm',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 22,
                name: 'Kindred Discovery',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 23,
                name: 'Leyline of Anticipation',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 24,
                name: 'Omniscience',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 25,
                name: 'Rhystic Study',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 26,
                name: 'Spreading Seas',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 27,
                name: 'Bitterblossom',
                rarity: 'M',
                layout: 'normal',
                types: 'Tribal,Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 28,
                name: 'Dark Tutelage',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 29,
                name: 'Grave Pact',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 30,
                name: 'Leyline of the Void',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 31,
                name: 'Necropotence',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 32,
                name: 'Oppression',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 33,
                name: 'Oversold Cemetery',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 34,
                name: 'Polluted Bonds',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 35,
                name: 'Sanguine Bond',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 36,
                name: 'Stab Wound',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 37,
                name: 'Vampiric Rites',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 38,
                name: 'Waste Not',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 39,
                name: 'Aggravated Assault',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 40,
                name: 'Blood Moon',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 41,
                name: 'Dragon Mantle',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 42,
                name: 'Fiery Emancipation',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 43,
                name: 'Goblin Bombardment',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 44,
                name: 'Impact Tremors',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 45,
                name: 'Leyline of Lightning',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 46,
                name: 'Mana Flare',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 47,
                name: 'Raid Bombardment',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 48,
                name: 'Repercussion',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 49,
                name: 'Shared Animosity',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 50,
                name: 'Sneak Attack',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 51,
                name: 'Defense of the Heart',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 52,
                name: 'Doubling Season',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 53,
                name: "Garruk's Uprising",
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 54,
                name: 'Ground Seal',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 55,
                name: 'Hardened Scales',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 56,
                name: 'Leyline of Abundance',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 57,
                name: "Nature's Will",
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 58,
                name: 'Parallel Lives',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 59,
                name: 'Primal Vigor',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 60,
                name: 'Prismatic Omen',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 61,
                name: 'Season of Growth',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 62,
                name: 'Unnatural Growth',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 63,
                name: 'Utopia Sprawl',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 64,
                name: 'Greater Auramancy',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 65,
                name: 'Karmic Justice',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 66,
                name: 'Land Tax',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 67,
                name: 'Smothering Tithe',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 68,
                name: 'As Foretold',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 69,
                name: 'Kindred Discovery',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 70,
                name: 'Omniscience',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 71,
                name: 'Rhystic Study',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 72,
                name: 'Bitterblossom',
                rarity: 'M',
                layout: 'normal',
                types: 'Tribal,Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 73,
                name: 'Grave Pact',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 74,
                name: 'Necropotence',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 75,
                name: 'Polluted Bonds',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 76,
                name: 'Aggravated Assault',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 77,
                name: 'Blood Moon',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 78,
                name: 'Repercussion',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 79,
                name: 'Sneak Attack',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 80,
                name: 'Defense of the Heart',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 81,
                name: 'Doubling Season',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 82,
                name: "Nature's Will",
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 83,
                name: 'Parallel Lives',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 84,
                name: 'Greater Auramancy',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 85,
                name: 'Karmic Justice',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 86,
                name: 'Land Tax',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 87,
                name: 'Smothering Tithe',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 88,
                name: 'As Foretold',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 89,
                name: 'Kindred Discovery',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 90,
                name: 'Omniscience',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 91,
                name: 'Rhystic Study',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U',
            },
            {
                cardNumber: 92,
                name: 'Bitterblossom',
                rarity: 'M',
                layout: 'normal',
                types: 'Tribal,Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 93,
                name: 'Grave Pact',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 94,
                name: 'Necropotence',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 95,
                name: 'Polluted Bonds',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 96,
                name: 'Aggravated Assault',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 97,
                name: 'Blood Moon',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 98,
                name: 'Repercussion',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 99,
                name: 'Sneak Attack',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 100,
                name: 'Defense of the Heart',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 101,
                name: 'Doubling Season',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 102,
                name: "Nature's Will",
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 103,
                name: 'Parallel Lives',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
        ];

        await MigrationHelper.cardSetUp(
            queryRunner,
            'Wilds of Eldraine: Enchanting Tales',
            this.shortName,
            cardValues,
            [`id`, `cardNumber`, `name`, `rarity`, `layout`, `cardSet`, `colors`, `types`],
        );

        const cards = await queryRunner.manager
            .createQueryBuilder<Card>('Card', 'c')
            .select('c.id')
            .leftJoin(CardSet, 'cs', 'c.card_set_1 = cs.id')
            .where('cs.short_name = :shortName', { shortName: this.shortName })
            .getMany();

        const insertDefaultPossibleCards: PossibleCardVariation[] = [];
        cards.forEach(card => {
            const defaultPossibleCard = queryRunner.manager
                .getRepository<PossibleCardVariation>(PossibleCardVariation)
                .create();
            defaultPossibleCard.card = card;
            defaultPossibleCard.cardVariantType = CardVariantType.NORMAL;
            defaultPossibleCard.hasNormal = true;
            defaultPossibleCard.hasFoil = true;
            insertDefaultPossibleCards.push(defaultPossibleCard);
        });

        await queryRunner.manager
            .getRepository<PossibleCardVariation>(PossibleCardVariation)
            .insert(insertDefaultPossibleCards);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const deletablePossibleCardVariations = await queryRunner.manager
            .createQueryBuilder<PossibleCardVariation>(PossibleCardVariation, 'pcv')
            .select(['pcv.id'])
            .innerJoin(Card, 'c', 'pcv.card_1 = c.id')
            .innerJoin(CardSet, 'cs', 'cs.id = c.card_set_1')
            .where(`cs.short_name = '${this.shortName}'`)
            .getMany();

        if (deletablePossibleCardVariations.length > 0) {
            await queryRunner.manager.delete<PossibleCardVariation>(
                PossibleCardVariation,
                deletablePossibleCardVariations,
            );
        }

        await MigrationHelper.cardSetDown(queryRunner, this.shortName);
    }
}
