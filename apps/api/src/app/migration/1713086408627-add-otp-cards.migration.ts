import { MigrationInterface, QueryRunner } from 'typeorm';
import { CardSet } from '../card/entity/card-set.entity';
import { CardVariantType } from '../card/entity/card-variant-type.enum';
import { Card } from '../card/entity/card.entity';
import { PossibleCardVariation } from '../card/entity/possible-card-variation.entity';
import { MigrationHelper } from './helper/migration-helper';

export class addOtp1713086408627 implements MigrationInterface {
    shortName = 'OTP';
    public async up(queryRunner: QueryRunner): Promise<void> {
        const cardValues = [
            {
                cardNumber: 1,
                name: 'Fell the Mighty',
                rarity: 'R',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'W',
            },
            {
                cardNumber: 2,
                name: 'Fierce Retribution',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'W',
            },
            {
                cardNumber: 3,
                name: 'Journey to Nowhere',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 4,
                name: 'Leyline Binding',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 5,
                name: 'Pariah',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 6,
                name: 'Path to Exile',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'W',
            },
            {
                cardNumber: 7,
                name: 'Archive Trap',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 8,
                name: "Archmage's Charm",
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 9,
                name: 'Commandeer',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 10,
                name: 'Essence Capture',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 11,
                name: 'Mana Drain',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 12,
                name: 'Mindbreak Trap',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 13,
                name: 'Repulse',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 14,
                name: 'Heartless Pillage',
                rarity: 'U',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B',
            },
            {
                cardNumber: 15,
                name: "Imp's Mischief",
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'B',
            },
            {
                cardNumber: 16,
                name: 'Murder',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'B',
            },
            {
                cardNumber: 17,
                name: 'Overwhelming Forces',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B',
            },
            {
                cardNumber: 18,
                name: 'Reanimate',
                rarity: 'R',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B',
            },
            {
                cardNumber: 19,
                name: 'Surgical Extraction',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'B',
            },
            {
                cardNumber: 20,
                name: 'Thoughtseize',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B',
            },
            {
                cardNumber: 21,
                name: 'Collective Defiance',
                rarity: 'R',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R',
            },
            {
                cardNumber: 22,
                name: 'Crackle with Power',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R',
            },
            {
                cardNumber: 23,
                name: 'Electrodominance',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'R',
            },
            {
                cardNumber: 24,
                name: 'Fling',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'R',
            },
            {
                cardNumber: 25,
                name: 'Indomitable Creativity',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R',
            },
            {
                cardNumber: 26,
                name: 'Skewer the Critics',
                rarity: 'U',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R',
            },
            {
                cardNumber: 27,
                name: 'Skullcrack',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'R',
            },
            {
                cardNumber: 28,
                name: 'Clear Shot',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'G',
            },
            {
                cardNumber: 29,
                name: 'Force of Vigor',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'G',
            },
            {
                cardNumber: 30,
                name: 'Pest Infestation',
                rarity: 'R',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'G',
            },
            {
                cardNumber: 31,
                name: 'Primal Command',
                rarity: 'R',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'G',
            },
            {
                cardNumber: 32,
                name: 'Primal Might',
                rarity: 'R',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'G',
            },
            {
                cardNumber: 33,
                name: 'Thornado',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'G',
            },
            {
                cardNumber: 34,
                name: 'Abrupt Decay',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'B,G',
            },
            {
                cardNumber: 35,
                name: 'Anguished Unmaking',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'B,W',
            },
            {
                cardNumber: 36,
                name: 'Back for More',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'B,G',
            },
            {
                cardNumber: 37,
                name: 'Bedevil',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'B,R',
            },
            {
                cardNumber: 38,
                name: 'Buried in the Garden',
                rarity: 'U',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G,W',
            },
            {
                cardNumber: 39,
                name: 'Crime // Punishment',
                rarity: 'M',
                layout: 'split',
                types: 'Sorcery',
                colors: 'W,B',
            },
            {
                cardNumber: 40,
                name: 'Cruel Ultimatum',
                rarity: 'R',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B,R,U',
            },
            {
                cardNumber: 41,
                name: 'Decimate',
                rarity: 'R',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'G,R',
            },
            {
                cardNumber: 42,
                name: 'Decisive Denial',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'G,U',
            },
            {
                cardNumber: 43,
                name: 'Detention Sphere',
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'U,W',
            },
            {
                cardNumber: 44,
                name: 'Endless Detour',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'G,U,W',
            },
            {
                cardNumber: 45,
                name: 'Fractured Identity',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'U,W',
            },
            {
                cardNumber: 46,
                name: 'Hindering Light',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'U,W',
            },
            {
                cardNumber: 47,
                name: 'Humiliate',
                rarity: 'U',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B,W',
            },
            {
                cardNumber: 48,
                name: 'Hypothesizzle',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'R,U',
            },
            {
                cardNumber: 49,
                name: 'Ionize',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'R,U',
            },
            {
                cardNumber: 50,
                name: 'Oko, Thief of Crowns',
                rarity: 'M',
                layout: 'normal',
                types: 'Planeswalker',
                colors: 'G,U',
            },
            {
                cardNumber: 51,
                name: "Outlaws' Merriment",
                rarity: 'R',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R,W',
            },
            {
                cardNumber: 52,
                name: 'Ride Down',
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'R,W',
            },
            {
                cardNumber: 53,
                name: 'Savage Smash',
                rarity: 'U',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'G,R',
            },
            {
                cardNumber: 54,
                name: 'Siphon Insight',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'B,U',
            },
            {
                cardNumber: 55,
                name: 'Terminal Agony',
                rarity: 'U',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B,R',
            },
            {
                cardNumber: 56,
                name: "Tyrant's Scorn",
                rarity: 'U',
                layout: 'normal',
                types: 'Instant',
                colors: 'B,U',
            },
            {
                cardNumber: 57,
                name: 'Vanishing Verse',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'B,W',
            },
            {
                cardNumber: 58,
                name: 'Villainous Wealth',
                rarity: 'R',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B,G,U',
            },
            {
                cardNumber: 59,
                name: 'Void Rend',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'B,U,W',
            },
            {
                cardNumber: 60,
                name: 'Voidslime',
                rarity: 'R',
                layout: 'normal',
                types: 'Instant',
                colors: 'G,U',
            },
            {
                cardNumber: 61,
                name: 'Contagion Engine',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 62,
                name: 'Grindstone',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 63,
                name: 'Mindslaver',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 64,
                name: 'Unlicensed Hearse',
                rarity: 'R',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 65,
                name: 'Dust Bowl',
                rarity: 'R',
                layout: 'normal',
                types: 'Land',
                colors: '',
            },
            {
                cardNumber: 66,
                name: 'Leyline Binding',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 67,
                name: 'Mana Drain',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 68,
                name: 'Mindbreak Trap',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 69,
                name: 'Overwhelming Forces',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B',
            },
            {
                cardNumber: 70,
                name: 'Thoughtseize',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B',
            },
            {
                cardNumber: 71,
                name: 'Crackle with Power',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R',
            },
            {
                cardNumber: 72,
                name: 'Indomitable Creativity',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R',
            },
            {
                cardNumber: 73,
                name: 'Force of Vigor',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'G',
            },
            {
                cardNumber: 74,
                name: 'Anguished Unmaking',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'B,W',
            },
            {
                cardNumber: 75,
                name: 'Crime // Punishment',
                rarity: 'M',
                layout: 'split',
                types: 'Sorcery',
                colors: 'W,B',
            },
            {
                cardNumber: 76,
                name: 'Fractured Identity',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'U,W',
            },
            {
                cardNumber: 77,
                name: 'Oko, Thief of Crowns',
                rarity: 'M',
                layout: 'normal',
                types: 'Planeswalker',
                colors: 'G,U',
            },
            {
                cardNumber: 78,
                name: 'Contagion Engine',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 79,
                name: 'Grindstone',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 80,
                name: 'Mindslaver',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
        ];

        await MigrationHelper.cardSetUp(queryRunner, 'Breaking News', this.shortName, cardValues, [
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
