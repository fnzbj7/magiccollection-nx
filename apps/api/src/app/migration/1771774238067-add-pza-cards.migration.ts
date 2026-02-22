import { MigrationInterface, QueryRunner } from 'typeorm';
import { CardSet } from '../card/entity/card-set.entity';
import { CardVariantType } from '../card/entity/card-variant-type.enum';
import { Card } from '../card/entity/card.entity';
import { PossibleCardVariation } from '../card/entity/possible-card-variation.entity';
import { MigrationHelper } from './helper/migration-helper';

export class addPza1771774238067 implements MigrationInterface {
    shortName = 'PZA';
    public async up(queryRunner: QueryRunner): Promise<void> {
        const cardValues = [
            {
                cardNumber: 1,
                name: 'Path to Exile',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'W',
            },
            {
                cardNumber: 2,
                name: 'Teleportation Circle',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 3,
                name: 'Trouble in Pairs',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'W',
            },
            {
                cardNumber: 4,
                name: 'Brainstorm',
                rarity: 'M',
                layout: 'normal',
                types: 'Instant',
                colors: 'U',
            },
            {
                cardNumber: 5,
                name: 'Cytoplast Manipulator',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'U',
            },
            {
                cardNumber: 6,
                name: 'Ashcoat of the Shadow Swarm',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'B',
            },
            {
                cardNumber: 7,
                name: 'Plague of Vermin',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'B',
            },
            {
                cardNumber: 8,
                name: 'All Will Be One',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 9,
                name: 'Silverclad Ferocidons',
                rarity: 'M',
                layout: 'normal',
                types: 'Creature',
                colors: 'R',
            },
            {
                cardNumber: 10,
                name: 'Underworld Breach',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'R',
            },
            {
                cardNumber: 11,
                name: 'Doubling Season',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G',
            },
            {
                cardNumber: 12,
                name: 'Rhythm of the Wild',
                rarity: 'M',
                layout: 'normal',
                types: 'Enchantment',
                colors: 'G,R',
            },
            {
                cardNumber: 13,
                name: 'Waves of Aggression',
                rarity: 'M',
                layout: 'normal',
                types: 'Sorcery',
                colors: 'R,W',
            },
            {
                cardNumber: 14,
                name: 'Arcbound Ravager',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact,Creature',
                colors: '',
            },
            {
                cardNumber: 15,
                name: "Conqueror's Flail",
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 16,
                name: 'Metallic Mimic',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact,Creature',
                colors: '',
            },
            {
                cardNumber: 17,
                name: 'Shadowspear',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 18,
                name: 'Sword of Sinew and Steel',
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 19,
                name: "Umezawa's Jitte",
                rarity: 'M',
                layout: 'normal',
                types: 'Artifact',
                colors: '',
            },
            {
                cardNumber: 20,
                name: 'Undercity Sewers',
                rarity: 'M',
                layout: 'normal',
                types: 'Land',
                colors: '',
            },
        ];

        await MigrationHelper.cardSetUp(
            queryRunner,
            'Teenage Mutant Ninja Turtles Source Material',
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
