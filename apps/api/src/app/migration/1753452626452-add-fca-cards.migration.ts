import { MigrationInterface, QueryRunner } from "typeorm";
import { CardSet } from "../card/entity/card-set.entity";
import { CardVariantType } from "../card/entity/card-variant-type.enum";
import { Card } from "../card/entity/card.entity";
import { PossibleCardVariation } from "../card/entity/possible-card-variation.entity";
import { MigrationHelper } from "./helper/migration-helper";

export class addFca1753452626452 implements MigrationInterface {
  shortName = "FCA";
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cardValues = [
      {
        cardNumber: 1,
        name: "Adeline, Resplendent Cathar",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "W",
      },
      {
        cardNumber: 2,
        name: "Ranger-Captain of Eos",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "W",
      },
      {
        cardNumber: 3,
        name: "Sram, Senior Edificer",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "W",
      },
      {
        cardNumber: 4,
        name: "Counterspell",
        rarity: "U",
        layout: "normal",
        types: "Instant",
        colors: "U",
      },
      {
        cardNumber: 5,
        name: "Urza, Lord High Artificer",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "U",
      },
      {
        cardNumber: 6,
        name: "Venser, Shaper Savant",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "U",
      },
      {
        cardNumber: 7,
        name: "Bolas's Citadel",
        rarity: "R",
        layout: "normal",
        types: "Artifact",
        colors: "B",
      },
      {
        cardNumber: 8,
        name: "Dark Ritual",
        rarity: "R",
        layout: "normal",
        types: "Instant",
        colors: "B",
      },
      {
        cardNumber: 9,
        name: "Fatal Push",
        rarity: "U",
        layout: "normal",
        types: "Instant",
        colors: "B",
      },
      {
        cardNumber: 10,
        name: "Syr Konrad, the Grim",
        rarity: "U",
        layout: "normal",
        types: "Creature",
        colors: "B",
      },
      {
        cardNumber: 11,
        name: "Yawgmoth, Thran Physician",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "B",
      },
      {
        cardNumber: 12,
        name: "Ancient Copper Dragon",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "R",
      },
      {
        cardNumber: 13,
        name: "Godo, Bandit Warlord",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "R",
      },
      {
        cardNumber: 14,
        name: "Purphoros, God of the Forge",
        rarity: "M",
        layout: "normal",
        types: "Enchantment,Creature",
        colors: "R",
      },
      {
        cardNumber: 15,
        name: "Azusa, Lost but Seeking",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "G",
      },
      {
        cardNumber: 16,
        name: "Nyxbloom Ancient",
        rarity: "M",
        layout: "normal",
        types: "Enchantment,Creature",
        colors: "G",
      },
      {
        cardNumber: 17,
        name: "Jodah, the Unifier",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "B,G,R,U,W",
      },
      {
        cardNumber: 18,
        name: "Tymna the Weaver",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "B,W",
      },
      {
        cardNumber: 19,
        name: "Winota, Joiner of Forces",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "R,W",
      },
      {
        cardNumber: 20,
        name: "Traxos, Scourge of Kroog",
        rarity: "R",
        layout: "normal",
        types: "Artifact,Creature",
        colors: "",
      },
      {
        cardNumber: 21,
        name: "Akroma's Will",
        rarity: "M",
        layout: "normal",
        types: "Instant",
        colors: "W",
      },
      {
        cardNumber: 22,
        name: "Danitha Capashen, Paragon",
        rarity: "U",
        layout: "normal",
        types: "Creature",
        colors: "W",
      },
      {
        cardNumber: 23,
        name: "Kenrith, the Returned King",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "W",
      },
      {
        cardNumber: 24,
        name: "Loran of the Third Path",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "W",
      },
      {
        cardNumber: 25,
        name: "Mangara, the Diplomat",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "W",
      },
      {
        cardNumber: 26,
        name: "Stroke of Midnight",
        rarity: "U",
        layout: "normal",
        types: "Instant",
        colors: "W",
      },
      {
        cardNumber: 27,
        name: "Wall of Omens",
        rarity: "U",
        layout: "normal",
        types: "Creature",
        colors: "W",
      },
      {
        cardNumber: 28,
        name: "Brainstorm",
        rarity: "U",
        layout: "normal",
        types: "Instant",
        colors: "U",
      },
      {
        cardNumber: 29,
        name: "Cryptic Command",
        rarity: "R",
        layout: "normal",
        types: "Instant",
        colors: "U",
      },
      {
        cardNumber: 30,
        name: "Laboratory Maniac",
        rarity: "U",
        layout: "normal",
        types: "Creature",
        colors: "U",
      },
      {
        cardNumber: 31,
        name: "Rhystic Study",
        rarity: "M",
        layout: "normal",
        types: "Enchantment",
        colors: "U",
      },
      {
        cardNumber: 32,
        name: "Teferi, Mage of Zhalfir",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "U",
      },
      {
        cardNumber: 33,
        name: "Deadly Dispute",
        rarity: "U",
        layout: "normal",
        types: "Instant",
        colors: "B",
      },
      {
        cardNumber: 34,
        name: "Diabolic Intent",
        rarity: "R",
        layout: "normal",
        types: "Sorcery",
        colors: "B",
      },
      {
        cardNumber: 35,
        name: "Gix, Yawgmoth Praetor",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "B",
      },
      {
        cardNumber: 36,
        name: "K'rrik, Son of Yawgmoth",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "B",
      },
      {
        cardNumber: 37,
        name: "Varragoth, Bloodsky Sire",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "B",
      },
      {
        cardNumber: 38,
        name: "Captain Lannery Storm",
        rarity: "U",
        layout: "normal",
        types: "Creature",
        colors: "R",
      },
      {
        cardNumber: 39,
        name: "Light Up the Stage",
        rarity: "U",
        layout: "normal",
        types: "Sorcery",
        colors: "R",
      },
      {
        cardNumber: 40,
        name: "Lightning Bolt",
        rarity: "U",
        layout: "normal",
        types: "Instant",
        colors: "R",
      },
      {
        cardNumber: 41,
        name: "Mizzix's Mastery",
        rarity: "R",
        layout: "normal",
        types: "Sorcery",
        colors: "R",
      },
      {
        cardNumber: 42,
        name: "Najeela, the Blade-Blossom",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "R",
      },
      {
        cardNumber: 43,
        name: "Ragavan, Nimble Pilferer",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "R",
      },
      {
        cardNumber: 44,
        name: "Carpet of Flowers",
        rarity: "R",
        layout: "normal",
        types: "Enchantment",
        colors: "G",
      },
      {
        cardNumber: 45,
        name: "Farseek",
        rarity: "U",
        layout: "normal",
        types: "Sorcery",
        colors: "G",
      },
      {
        cardNumber: 46,
        name: "Fynn, the Fangbearer",
        rarity: "U",
        layout: "normal",
        types: "Creature",
        colors: "G",
      },
      {
        cardNumber: 47,
        name: "Nature's Claim",
        rarity: "U",
        layout: "normal",
        types: "Instant",
        colors: "G",
      },
      {
        cardNumber: 48,
        name: "Primeval Titan",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "G",
      },
      {
        cardNumber: 49,
        name: "Atraxa, Grand Unifier",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "B,G,U,W",
      },
      {
        cardNumber: 50,
        name: "Bruse Tarl, Boorish Herder",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "R,W",
      },
      {
        cardNumber: 51,
        name: "Dovin's Veto",
        rarity: "U",
        layout: "normal",
        types: "Instant",
        colors: "U,W",
      },
      {
        cardNumber: 52,
        name: "Inalla, Archmage Ritualist",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "B,R,U",
      },
      {
        cardNumber: 53,
        name: "Ishai, Ojutai Dragonspeaker",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "U,W",
      },
      {
        cardNumber: 54,
        name: "Isshin, Two Heavens as One",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "B,R,W",
      },
      {
        cardNumber: 55,
        name: "Kinnan, Bonder Prodigy",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "G,U",
      },
      {
        cardNumber: 56,
        name: "Kraum, Ludevic's Opus",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "R,U",
      },
      {
        cardNumber: 57,
        name: "Muldrotha, the Gravetide",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "B,G,U",
      },
      {
        cardNumber: 58,
        name: "Thrasios, Triton Hero",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "G,U",
      },
      {
        cardNumber: 59,
        name: "Vial Smasher the Fierce",
        rarity: "M",
        layout: "normal",
        types: "Creature",
        colors: "B,R",
      },
      {
        cardNumber: 60,
        name: "Yuriko, the Tiger's Shadow",
        rarity: "R",
        layout: "normal",
        types: "Creature",
        colors: "B,U",
      },
      {
        cardNumber: 61,
        name: "Chromatic Lantern",
        rarity: "R",
        layout: "normal",
        types: "Artifact",
        colors: "",
      },
      {
        cardNumber: 62,
        name: "Smuggler's Copter",
        rarity: "R",
        layout: "normal",
        types: "Artifact",
        colors: "",
      },
      {
        cardNumber: 63,
        name: "Strixhaven Stadium",
        rarity: "U",
        layout: "normal",
        types: "Artifact",
        colors: "",
      },
      {
        cardNumber: 64,
        name: "Command Beacon",
        rarity: "R",
        layout: "normal",
        types: "Land",
        colors: "",
      },
    ];

    await MigrationHelper.cardSetUp(
      queryRunner,
      "Final Fantasy: Through the Ages",
      this.shortName,
      cardValues,
      [
        `id`,
        `cardNumber`,
        `name`,
        `rarity`,
        `layout`,
        `cardSet`,
        `colors`,
        `types`,
      ]
    );

    const cards = await queryRunner.manager
      .createQueryBuilder<Card>("Card", "c")
      .select("c.id")
      .leftJoin(CardSet, "cs", "c.card_set_1 = cs.id")
      .where("cs.short_name = :shortName", { shortName: this.shortName })
      .getMany();

    const insertDefaultPossibleCards: PossibleCardVariation[] = [];
    cards.forEach((card) => {
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
      .createQueryBuilder<PossibleCardVariation>(PossibleCardVariation, "pcv")
      .select(["pcv.id"])
      .innerJoin(Card, "c", "pcv.card_1 = c.id")
      .innerJoin(CardSet, "cs", "cs.id = c.card_set_1")
      .where(`cs.short_name = '${this.shortName}'`)
      .getMany();

    if (deletablePossibleCardVariations.length > 0) {
      await queryRunner.manager.delete<PossibleCardVariation>(
        PossibleCardVariation,
        deletablePossibleCardVariations
      );
    }

    await MigrationHelper.cardSetDown(queryRunner, this.shortName);
  }
}
