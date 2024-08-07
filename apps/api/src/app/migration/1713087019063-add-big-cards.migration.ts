import { MigrationInterface, QueryRunner } from 'typeorm';
import { CardSet } from '../card/entity/card-set.entity';
import { CardVariantType } from '../card/entity/card-variant-type.enum';
import { Card } from '../card/entity/card.entity';
import { PossibleCardVariation } from '../card/entity/possible-card-variation.entity';
import { MigrationHelper } from './helper/migration-helper';

export class addBig1713087019063 implements MigrationInterface {
    shortName = 'BIG';
    public async up(queryRunner: QueryRunner): Promise<void> {
        const cardValues = [
            {
                cardNumber: 1,
                name: "Collector's Cage",
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'W',
            },
            {
                cardNumber: 2,
                name: 'Grand Abolisher',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'W',
            },
            {
                cardNumber: 3,
                name: 'Oltec Matterweaver',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'W',
            },
            {
                cardNumber: 4,
                name: 'Rest in Peace',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 5,
                name: 'Esoteric Duplicator',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'U',
            },
            {
                cardNumber: 6,
                name: 'Simulacrum Synthesizer',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'U',
            },
            {
                cardNumber: 7,
                name: 'Worldwalker Helm',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'U',
            },
            {
                cardNumber: 8,
                name: "Greed's Gambit",
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 9,
                name: 'Harvester of Misery',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'B',
            },
            {
                cardNumber: 10,
                name: 'Hostile Investigator',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'B',
            },
            {
                cardNumber: 11,
                name: 'Generous Plunderer',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'R',
            },
            {
                cardNumber: 12,
                name: 'Legion Extruder',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'R',
            },
            {
                cardNumber: 13,
                name: 'Memory Vessel',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'R',
            },
            {
                cardNumber: 14,
                name: 'Molten Duplication',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R',
            },
            {
                cardNumber: 15,
                name: 'Territory Forge',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'R',
            },
            {
                cardNumber: 16,
                name: 'Ancient Cornucopia',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'G',
            },
            {
                cardNumber: 17,
                name: 'Bristlebud Farmer',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 18,
                name: 'Omenpath Journey',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 19,
                name: 'Sandstorm Salvager',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 20,
                name: 'Vaultborn Tyrant',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 21,
                name: 'Loot, the Key to Everything',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G,R,U',
            },
            {
                cardNumber: 22,
                name: 'Pest Control',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B,W',
            },
            {
                cardNumber: 23,
                name: 'Lost Jitte',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 24,
                name: 'Lotus Ring',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 25,
                name: 'Nexus of Becoming',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 26,
                name: 'Sword of Wealth and Power',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 27,
                name: 'Torpor Orb',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 28,
                name: 'Transmutation Font',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 29,
                name: 'Fomori Vault',
                rarity: 'M',
                layout: 'normal',
                types: 'Land',
                colors: '',
            },
            {
                cardNumber: 30,
                name: 'Tarnation Vista',
                rarity: 'M',
                layout: 'normal',
                types: 'Land',
                colors: '',
            },
            {
                cardNumber: 31,
                name: "Collector's Cage",
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'W',
            },
            {
                cardNumber: 32,
                name: 'Grand Abolisher',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'W',
            },
            {
                cardNumber: 33,
                name: 'Oltec Matterweaver',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'W',
            },
            {
                cardNumber: 34,
                name: 'Rest in Peace',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 35,
                name: 'Esoteric Duplicator',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'U',
            },
            {
                cardNumber: 36,
                name: 'Simulacrum Synthesizer',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'U',
            },
            {
                cardNumber: 37,
                name: 'Worldwalker Helm',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'U',
            },
            {
                cardNumber: 38,
                name: "Greed's Gambit",
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 39,
                name: 'Harvester of Misery',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'B',
            },
            {
                cardNumber: 40,
                name: 'Hostile Investigator',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'B',
            },
            {
                cardNumber: 41,
                name: 'Generous Plunderer',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'R',
            },
            {
                cardNumber: 42,
                name: 'Legion Extruder',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'R',
            },
            {
                cardNumber: 43,
                name: 'Memory Vessel',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'R',
            },
            {
                cardNumber: 44,
                name: 'Molten Duplication',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R',
            },
            {
                cardNumber: 45,
                name: 'Territory Forge',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'R',
            },
            {
                cardNumber: 46,
                name: 'Ancient Cornucopia',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'G',
            },
            {
                cardNumber: 47,
                name: 'Bristlebud Farmer',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 48,
                name: 'Omenpath Journey',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 49,
                name: 'Sandstorm Salvager',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 50,
                name: 'Vaultborn Tyrant',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 51,
                name: 'Loot, the Key to Everything',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G,R,U',
            },
            {
                cardNumber: 52,
                name: 'Pest Control',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B,W',
            },
            {
                cardNumber: 53,
                name: 'Lost Jitte',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 54,
                name: 'Lotus Ring',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 55,
                name: 'Nexus of Becoming',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 56,
                name: 'Sword of Wealth and Power',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 57,
                name: 'Torpor Orb',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 58,
                name: 'Transmutation Font',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 59,
                name: 'Fomori Vault',
                rarity: 'M',
                layout: 'normal',
                types: 'Land',
                colors: '',
            },
            {
                cardNumber: 60,
                name: 'Tarnation Vista',
                rarity: 'M',
                layout: 'normal',
                types: 'Land',
                colors: '',
            },
            {
                cardNumber: 61,
                name: 'Vaultborn Tyrant',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 62,
                name: 'Loot, the Key to Everything',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G,R,U',
            },
            {
                cardNumber: 63,
                name: 'Lotus Ring',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 64,
                name: 'Sword of Wealth and Power',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 65,
                name: 'Tarnation Vista',
                rarity: 'M',
                layout: 'normal',
                types: 'Land',
                colors: '',
            },
            {
                cardNumber: 66,
                name: "Collector's Cage",
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'W',
            },
            {
                cardNumber: 67,
                name: 'Grand Abolisher',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'W',
            },
            {
                cardNumber: 68,
                name: 'Oltec Matterweaver',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'W',
            },
            {
                cardNumber: 69,
                name: 'Rest in Peace',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 70,
                name: 'Esoteric Duplicator',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'U',
            },
            {
                cardNumber: 71,
                name: 'Simulacrum Synthesizer',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'U',
            },
            {
                cardNumber: 72,
                name: 'Worldwalker Helm',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'U',
            },
            {
                cardNumber: 73,
                name: "Greed's Gambit",
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'B',
            },
            {
                cardNumber: 74,
                name: 'Harvester of Misery',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'B',
            },
            {
                cardNumber: 75,
                name: 'Hostile Investigator',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'B',
            },
            {
                cardNumber: 76,
                name: 'Generous Plunderer',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'R',
            },
            {
                cardNumber: 77,
                name: 'Legion Extruder',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'R',
            },
            {
                cardNumber: 78,
                name: 'Memory Vessel',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'R',
            },
            {
                cardNumber: 79,
                name: 'Molten Duplication',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R',
            },
            {
                cardNumber: 80,
                name: 'Territory Forge',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'R',
            },
            {
                cardNumber: 81,
                name: 'Ancient Cornucopia',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: 'G',
            },
            {
                cardNumber: 82,
                name: 'Bristlebud Farmer',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 83,
                name: 'Omenpath Journey',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 84,
                name: 'Sandstorm Salvager',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 85,
                name: 'Vaultborn Tyrant',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G',
            },
            {
                cardNumber: 86,
                name: 'Loot, the Key to Everything',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'G,R,U',
            },
            {
                cardNumber: 87,
                name: 'Pest Control',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B,W',
            },
            {
                cardNumber: 88,
                name: 'Lost Jitte',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 89,
                name: 'Lotus Ring',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 90,
                name: 'Nexus of Becoming',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 91,
                name: 'Sword of Wealth and Power',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 92,
                name: 'Torpor Orb',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 93,
                name: 'Transmutation Font',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 94,
                name: 'Fomori Vault',
                rarity: 'M',
                layout: 'normal',
                types: 'Land',
                colors: '',
            },
            {
                cardNumber: 95,
                name: 'Tarnation Vista',
                rarity: 'M',
                layout: 'normal',
                types: 'Land',
                colors: '',
            },
        ];

        await MigrationHelper.cardSetUp(queryRunner, 'The Big Score', this.shortName, cardValues, [
            `id`,
            `cardNumber`,
            `name`,
            `rarity`,
            `layout`,
            `cardSet`,
            `colors`,
            `types`,
        ]);

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
