import { CardSet } from "../card/entity/card-set.entity";
import { InsertResult, MigrationInterface, QueryRunner } from "typeorm";

export class addingDom1620390570432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const insertResult: InsertResult = await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('card_set')
            .values({ name: 'Dominaria', shortName: 'DOM' })
            .execute();
        const cardSetId: number = insertResult.identifiers[0].id;

        await queryRunner.manager.createQueryBuilder().insert().into('card', [`cardNumber`, `name`, `rarity`, `layout`, `cardSet`]).values([
            { cardNumber: 1, cardSet: cardSetId, name: 'Karn, Scion of Urza', rarity: 'M', layout: 'normal' },
            { cardNumber: 2, cardSet: cardSetId, name: 'Adamant Will', rarity: 'C', layout: 'normal' },
            { cardNumber: 3, cardSet: cardSetId, name: 'Aven Sentry', rarity: 'C', layout: 'normal' },
            { cardNumber: 4, cardSet: cardSetId, name: 'Baird, Steward of Argive', rarity: 'U', layout: 'normal' },
            { cardNumber: 5, cardSet: cardSetId, name: 'Benalish Honor Guard', rarity: 'C', layout: 'normal' },
            { cardNumber: 6, cardSet: cardSetId, name: 'Benalish Marshal', rarity: 'R', layout: 'normal' },
            { cardNumber: 7, cardSet: cardSetId, name: 'Blessed Light', rarity: 'C', layout: 'normal' },
            { cardNumber: 8, cardSet: cardSetId, name: 'Board the Weatherlight', rarity: 'U', layout: 'normal' },
            { cardNumber: 9, cardSet: cardSetId, name: 'Call the Cavalry', rarity: 'C', layout: 'normal' },
            { cardNumber: 10, cardSet: cardSetId, name: 'Charge', rarity: 'C', layout: 'normal' },
            { cardNumber: 11, cardSet: cardSetId, name: 'D\'Avenant Trapper', rarity: 'C', layout: 'normal' },
            { cardNumber: 12, cardSet: cardSetId, name: 'Danitha Capashen, Paragon', rarity: 'U', layout: 'normal' },
            { cardNumber: 13, cardSet: cardSetId, name: 'Daring Archaeologist', rarity: 'R', layout: 'normal' },
            { cardNumber: 14, cardSet: cardSetId, name: 'Dauntless Bodyguard', rarity: 'U', layout: 'normal' },
            { cardNumber: 15, cardSet: cardSetId, name: 'Dub', rarity: 'C', layout: 'normal' },
            { cardNumber: 16, cardSet: cardSetId, name: 'Evra, Halcyon Witness', rarity: 'R', layout: 'normal' },
            { cardNumber: 17, cardSet: cardSetId, name: 'Excavation Elephant', rarity: 'C', layout: 'normal' },
            { cardNumber: 18, cardSet: cardSetId, name: 'Fall of the Thran', rarity: 'R', layout: 'saga' },
            { cardNumber: 19, cardSet: cardSetId, name: 'Gideon\'s Reproach', rarity: 'C', layout: 'normal' },
            { cardNumber: 20, cardSet: cardSetId, name: 'Healing Grace', rarity: 'C', layout: 'normal' },
            { cardNumber: 21, cardSet: cardSetId, name: 'History of Benalia', rarity: 'M', layout: 'saga' },
            { cardNumber: 22, cardSet: cardSetId, name: 'Invoke the Divine', rarity: 'C', layout: 'normal' },
            { cardNumber: 23, cardSet: cardSetId, name: 'Knight of Grace', rarity: 'U', layout: 'normal' },
            { cardNumber: 24, cardSet: cardSetId, name: 'Knight of New Benalia', rarity: 'C', layout: 'normal' },
            { cardNumber: 25, cardSet: cardSetId, name: 'Kwende, Pride of Femeref', rarity: 'U', layout: 'normal' },
            { cardNumber: 26, cardSet: cardSetId, name: 'Lyra Dawnbringer', rarity: 'M', layout: 'normal' },
            { cardNumber: 27, cardSet: cardSetId, name: 'Mesa Unicorn', rarity: 'C', layout: 'normal' },
            { cardNumber: 28, cardSet: cardSetId, name: 'On Serra\'s Wings', rarity: 'U', layout: 'normal' },
            { cardNumber: 29, cardSet: cardSetId, name: 'Pegasus Courser', rarity: 'C', layout: 'normal' },
            { cardNumber: 30, cardSet: cardSetId, name: 'Sanctum Spirit', rarity: 'U', layout: 'normal' },
            { cardNumber: 31, cardSet: cardSetId, name: 'Seal Away', rarity: 'U', layout: 'normal' },
            { cardNumber: 32, cardSet: cardSetId, name: 'Sergeant-at-Arms', rarity: 'C', layout: 'normal' },
            { cardNumber: 33, cardSet: cardSetId, name: 'Serra Angel', rarity: 'U', layout: 'normal' },
            { cardNumber: 34, cardSet: cardSetId, name: 'Serra Disciple', rarity: 'C', layout: 'normal' },
            { cardNumber: 35, cardSet: cardSetId, name: 'Shalai, Voice of Plenty', rarity: 'R', layout: 'normal' },
            { cardNumber: 36, cardSet: cardSetId, name: 'Teshar, Ancestor\'s Apostle', rarity: 'R', layout: 'normal' },
            { cardNumber: 37, cardSet: cardSetId, name: 'Tragic Poet', rarity: 'C', layout: 'normal' },
            { cardNumber: 38, cardSet: cardSetId, name: 'Triumph of Gerrard', rarity: 'U', layout: 'saga' },
            { cardNumber: 39, cardSet: cardSetId, name: 'Urza\'s Ruinous Blast', rarity: 'R', layout: 'normal' },
            { cardNumber: 40, cardSet: cardSetId, name: 'Academy Drake', rarity: 'C', layout: 'normal' },
            { cardNumber: 41, cardSet: cardSetId, name: 'Academy Journeymage', rarity: 'C', layout: 'normal' },
            { cardNumber: 42, cardSet: cardSetId, name: 'The Antiquities War', rarity: 'R', layout: 'saga' },
            { cardNumber: 43, cardSet: cardSetId, name: 'Arcane Flight', rarity: 'C', layout: 'normal' },
            { cardNumber: 44, cardSet: cardSetId, name: 'Artificer\'s Assistant', rarity: 'C', layout: 'normal' },
            { cardNumber: 45, cardSet: cardSetId, name: 'Befuddle', rarity: 'C', layout: 'normal' },
            { cardNumber: 46, cardSet: cardSetId, name: 'Blink of an Eye', rarity: 'C', layout: 'normal' },
            { cardNumber: 47, cardSet: cardSetId, name: 'Cloudreader Sphinx', rarity: 'C', layout: 'normal' },
            { cardNumber: 48, cardSet: cardSetId, name: 'Cold-Water Snapper', rarity: 'C', layout: 'normal' },
            { cardNumber: 49, cardSet: cardSetId, name: 'Curator\'s Ward', rarity: 'U', layout: 'normal' },
            { cardNumber: 50, cardSet: cardSetId, name: 'Deep Freeze', rarity: 'C', layout: 'normal' },
            { cardNumber: 51, cardSet: cardSetId, name: 'Diligent Excavator', rarity: 'U', layout: 'normal' },
            { cardNumber: 52, cardSet: cardSetId, name: 'Divination', rarity: 'C', layout: 'normal' },
            { cardNumber: 53, cardSet: cardSetId, name: 'Homarid Explorer', rarity: 'C', layout: 'normal' },
            { cardNumber: 54, cardSet: cardSetId, name: 'In Bolas\'s Clutches', rarity: 'U', layout: 'normal' },
            { cardNumber: 55, cardSet: cardSetId, name: 'Karn\'s Temporal Sundering', rarity: 'R', layout: 'normal' },
            { cardNumber: 56, cardSet: cardSetId, name: 'Merfolk Trickster', rarity: 'U', layout: 'normal' },
            { cardNumber: 57, cardSet: cardSetId, name: 'The Mirari Conjecture', rarity: 'R', layout: 'saga' },
            { cardNumber: 58, cardSet: cardSetId, name: 'Naban, Dean of Iteration', rarity: 'R', layout: 'normal' },
            { cardNumber: 59, cardSet: cardSetId, name: 'Naru Meha, Master Wizard', rarity: 'M', layout: 'normal' },
            { cardNumber: 60, cardSet: cardSetId, name: 'Opt', rarity: 'C', layout: 'normal' },
            { cardNumber: 61, cardSet: cardSetId, name: 'Precognition Field', rarity: 'R', layout: 'normal' },
            { cardNumber: 62, cardSet: cardSetId, name: 'Relic Runner', rarity: 'C', layout: 'normal' },
            { cardNumber: 63, cardSet: cardSetId, name: 'Rescue', rarity: 'C', layout: 'normal' },
            { cardNumber: 64, cardSet: cardSetId, name: 'Sage of Lat-Nam', rarity: 'U', layout: 'normal' },
            { cardNumber: 65, cardSet: cardSetId, name: 'Sentinel of the Pearl Trident', rarity: 'U', layout: 'normal' },
            { cardNumber: 66, cardSet: cardSetId, name: 'Slinn Voda, the Rising Deep', rarity: 'U', layout: 'normal' },
            { cardNumber: 67, cardSet: cardSetId, name: 'Syncopate', rarity: 'C', layout: 'normal' },
            { cardNumber: 68, cardSet: cardSetId, name: 'Tempest Djinn', rarity: 'R', layout: 'normal' },
            { cardNumber: 69, cardSet: cardSetId, name: 'Tetsuko Umezawa, Fugitive', rarity: 'U', layout: 'normal' },
            { cardNumber: 70, cardSet: cardSetId, name: 'Time of Ice', rarity: 'U', layout: 'saga' },
            { cardNumber: 71, cardSet: cardSetId, name: 'Tolarian Scholar', rarity: 'C', layout: 'normal' },
            { cardNumber: 72, cardSet: cardSetId, name: 'Unwind', rarity: 'C', layout: 'normal' },
            { cardNumber: 73, cardSet: cardSetId, name: 'Vodalian Arcanist', rarity: 'C', layout: 'normal' },
            { cardNumber: 74, cardSet: cardSetId, name: 'Weight of Memory', rarity: 'U', layout: 'normal' },
            { cardNumber: 75, cardSet: cardSetId, name: 'Wizard\'s Retort', rarity: 'U', layout: 'normal' },
            { cardNumber: 76, cardSet: cardSetId, name: 'Zahid, Djinn of the Lamp', rarity: 'R', layout: 'normal' },
            { cardNumber: 77, cardSet: cardSetId, name: 'Blessing of Belzenlok', rarity: 'C', layout: 'normal' },
            { cardNumber: 78, cardSet: cardSetId, name: 'Cabal Evangel', rarity: 'C', layout: 'normal' },
            { cardNumber: 79, cardSet: cardSetId, name: 'Cabal Paladin', rarity: 'C', layout: 'normal' },
            { cardNumber: 80, cardSet: cardSetId, name: 'Caligo Skin-Witch', rarity: 'C', layout: 'normal' },
            { cardNumber: 81, cardSet: cardSetId, name: 'Cast Down', rarity: 'U', layout: 'normal' },
            { cardNumber: 82, cardSet: cardSetId, name: 'Chainer\'s Torment', rarity: 'U', layout: 'saga' },
            { cardNumber: 83, cardSet: cardSetId, name: 'Dark Bargain', rarity: 'C', layout: 'normal' },
            { cardNumber: 84, cardSet: cardSetId, name: 'Deathbloom Thallid', rarity: 'C', layout: 'normal' },
            { cardNumber: 85, cardSet: cardSetId, name: 'Demonic Vigor', rarity: 'C', layout: 'normal' },
            { cardNumber: 86, cardSet: cardSetId, name: 'Demonlord Belzenlok', rarity: 'M', layout: 'normal' },
            { cardNumber: 87, cardSet: cardSetId, name: 'Divest', rarity: 'C', layout: 'normal' },
            { cardNumber: 88, cardSet: cardSetId, name: 'Dread Shade', rarity: 'R', layout: 'normal' },
            { cardNumber: 89, cardSet: cardSetId, name: 'Drudge Sentinel', rarity: 'C', layout: 'normal' },
            { cardNumber: 90, cardSet: cardSetId, name: 'The Eldest Reborn', rarity: 'U', layout: 'saga' },
            { cardNumber: 91, cardSet: cardSetId, name: 'Eviscerate', rarity: 'C', layout: 'normal' },
            { cardNumber: 92, cardSet: cardSetId, name: 'Feral Abomination', rarity: 'C', layout: 'normal' },
            { cardNumber: 93, cardSet: cardSetId, name: 'Final Parting', rarity: 'U', layout: 'normal' },
            { cardNumber: 94, cardSet: cardSetId, name: 'Fungal Infection', rarity: 'C', layout: 'normal' },
            { cardNumber: 95, cardSet: cardSetId, name: 'Josu Vess, Lich Knight', rarity: 'R', layout: 'normal' },
            { cardNumber: 96, cardSet: cardSetId, name: 'Kazarov, Sengir Pureblood', rarity: 'R', layout: 'normal' },
            { cardNumber: 97, cardSet: cardSetId, name: 'Knight of Malice', rarity: 'U', layout: 'normal' },
            { cardNumber: 98, cardSet: cardSetId, name: 'Lich\'s Mastery', rarity: 'R', layout: 'normal' },
            { cardNumber: 99, cardSet: cardSetId, name: 'Lingering Phantom', rarity: 'U', layout: 'normal' },
            { cardNumber: 100, cardSet: cardSetId, name: 'Phyrexian Scriptures', rarity: 'M', layout: 'saga' },
            { cardNumber: 101, cardSet: cardSetId, name: 'Rat Colony', rarity: 'C', layout: 'normal' },
            { cardNumber: 102, cardSet: cardSetId, name: 'Rite of Belzenlok', rarity: 'R', layout: 'saga' },
            { cardNumber: 103, cardSet: cardSetId, name: 'Settle the Score', rarity: 'U', layout: 'normal' },
            { cardNumber: 104, cardSet: cardSetId, name: 'Soul Salvage', rarity: 'C', layout: 'normal' },
            { cardNumber: 105, cardSet: cardSetId, name: 'Stronghold Confessor', rarity: 'C', layout: 'normal' },
            { cardNumber: 106, cardSet: cardSetId, name: 'Thallid Omnivore', rarity: 'C', layout: 'normal' },
            { cardNumber: 107, cardSet: cardSetId, name: 'Thallid Soothsayer', rarity: 'U', layout: 'normal' },
            { cardNumber: 108, cardSet: cardSetId, name: 'Torgaar, Famine Incarnate', rarity: 'R', layout: 'normal' },
            { cardNumber: 109, cardSet: cardSetId, name: 'Urgoros, the Empty One', rarity: 'U', layout: 'normal' },
            { cardNumber: 110, cardSet: cardSetId, name: 'Vicious Offering', rarity: 'C', layout: 'normal' },
            { cardNumber: 111, cardSet: cardSetId, name: 'Whisper, Blood Liturgist', rarity: 'U', layout: 'normal' },
            { cardNumber: 112, cardSet: cardSetId, name: 'Windgrace Acolyte', rarity: 'C', layout: 'normal' },
            { cardNumber: 113, cardSet: cardSetId, name: 'Yargle, Glutton of Urborg', rarity: 'U', layout: 'normal' },
            { cardNumber: 114, cardSet: cardSetId, name: 'Yawgmoth\'s Vile Offering', rarity: 'R', layout: 'normal' },
            { cardNumber: 115, cardSet: cardSetId, name: 'Bloodstone Goblin', rarity: 'C', layout: 'normal' },
            { cardNumber: 116, cardSet: cardSetId, name: 'Champion of the Flame', rarity: 'U', layout: 'normal' },
            { cardNumber: 117, cardSet: cardSetId, name: 'Fervent Strike', rarity: 'C', layout: 'normal' },
            { cardNumber: 118, cardSet: cardSetId, name: 'Fiery Intervention', rarity: 'C', layout: 'normal' },
            { cardNumber: 119, cardSet: cardSetId, name: 'Fight with Fire', rarity: 'U', layout: 'normal' },
            { cardNumber: 120, cardSet: cardSetId, name: 'Fire Elemental', rarity: 'C', layout: 'normal' },
            { cardNumber: 121, cardSet: cardSetId, name: 'Firefist Adept', rarity: 'U', layout: 'normal' },
            { cardNumber: 122, cardSet: cardSetId, name: 'The First Eruption', rarity: 'R', layout: 'saga' },
            { cardNumber: 123, cardSet: cardSetId, name: 'The Flame of Keld', rarity: 'U', layout: 'saga' },
            { cardNumber: 124, cardSet: cardSetId, name: 'Frenzied Rage', rarity: 'C', layout: 'normal' },
            { cardNumber: 125, cardSet: cardSetId, name: 'Ghitu Chronicler', rarity: 'C', layout: 'normal' },
            { cardNumber: 126, cardSet: cardSetId, name: 'Ghitu Journeymage', rarity: 'C', layout: 'normal' },
            { cardNumber: 127, cardSet: cardSetId, name: 'Ghitu Lavarunner', rarity: 'C', layout: 'normal' },
            { cardNumber: 128, cardSet: cardSetId, name: 'Goblin Barrage', rarity: 'U', layout: 'normal' },
            { cardNumber: 129, cardSet: cardSetId, name: 'Goblin Chainwhirler', rarity: 'R', layout: 'normal' },
            { cardNumber: 130, cardSet: cardSetId, name: 'Goblin Warchief', rarity: 'U', layout: 'normal' },
            { cardNumber: 131, cardSet: cardSetId, name: 'Haphazard Bombardment', rarity: 'R', layout: 'normal' },
            { cardNumber: 132, cardSet: cardSetId, name: 'Jaya Ballard', rarity: 'M', layout: 'normal' },
            { cardNumber: 133, cardSet: cardSetId, name: 'Jaya\'s Immolating Inferno', rarity: 'R', layout: 'normal' },
            { cardNumber: 134, cardSet: cardSetId, name: 'Keldon Overseer', rarity: 'C', layout: 'normal' },
            { cardNumber: 135, cardSet: cardSetId, name: 'Keldon Raider', rarity: 'C', layout: 'normal' },
            { cardNumber: 136, cardSet: cardSetId, name: 'Keldon Warcaller', rarity: 'C', layout: 'normal' },
            { cardNumber: 137, cardSet: cardSetId, name: 'Orcish Vandal', rarity: 'U', layout: 'normal' },
            { cardNumber: 138, cardSet: cardSetId, name: 'Radiating Lightning', rarity: 'C', layout: 'normal' },
            { cardNumber: 139, cardSet: cardSetId, name: 'Rampaging Cyclops', rarity: 'C', layout: 'normal' },
            { cardNumber: 140, cardSet: cardSetId, name: 'Run Amok', rarity: 'C', layout: 'normal' },
            { cardNumber: 141, cardSet: cardSetId, name: 'Seismic Shift', rarity: 'C', layout: 'normal' },
            { cardNumber: 142, cardSet: cardSetId, name: 'Shivan Fire', rarity: 'C', layout: 'normal' },
            { cardNumber: 143, cardSet: cardSetId, name: 'Siege-Gang Commander', rarity: 'R', layout: 'normal' },
            { cardNumber: 144, cardSet: cardSetId, name: 'Skirk Prospector', rarity: 'C', layout: 'normal' },
            { cardNumber: 145, cardSet: cardSetId, name: 'Skizzik', rarity: 'U', layout: 'normal' },
            { cardNumber: 146, cardSet: cardSetId, name: 'Squee, the Immortal', rarity: 'R', layout: 'normal' },
            { cardNumber: 147, cardSet: cardSetId, name: 'Two-Headed Giant', rarity: 'R', layout: 'normal' },
            { cardNumber: 148, cardSet: cardSetId, name: 'Valduk, Keeper of the Flame', rarity: 'U', layout: 'normal' },
            { cardNumber: 149, cardSet: cardSetId, name: 'Verix Bladewing', rarity: 'M', layout: 'normal' },
            { cardNumber: 150, cardSet: cardSetId, name: 'Warcry Phoenix', rarity: 'U', layout: 'normal' },
            { cardNumber: 151, cardSet: cardSetId, name: 'Warlord\'s Fury', rarity: 'C', layout: 'normal' },
            { cardNumber: 152, cardSet: cardSetId, name: 'Wizard\'s Lightning', rarity: 'U', layout: 'normal' },
            { cardNumber: 153, cardSet: cardSetId, name: 'Adventurous Impulse', rarity: 'C', layout: 'normal' },
            { cardNumber: 154, cardSet: cardSetId, name: 'Ancient Animus', rarity: 'C', layout: 'normal' },
            { cardNumber: 155, cardSet: cardSetId, name: 'Arbor Armament', rarity: 'C', layout: 'normal' },
            { cardNumber: 156, cardSet: cardSetId, name: 'Baloth Gorger', rarity: 'C', layout: 'normal' },
            { cardNumber: 157, cardSet: cardSetId, name: 'Broken Bond', rarity: 'C', layout: 'normal' },
            { cardNumber: 158, cardSet: cardSetId, name: 'Corrosive Ooze', rarity: 'C', layout: 'normal' },
            { cardNumber: 159, cardSet: cardSetId, name: 'Elfhame Druid', rarity: 'U', layout: 'normal' },
            { cardNumber: 160, cardSet: cardSetId, name: 'Fungal Plots', rarity: 'U', layout: 'normal' },
            { cardNumber: 161, cardSet: cardSetId, name: 'Gaea\'s Blessing', rarity: 'U', layout: 'normal' },
            { cardNumber: 162, cardSet: cardSetId, name: 'Gaea\'s Protector', rarity: 'C', layout: 'normal' },
            { cardNumber: 163, cardSet: cardSetId, name: 'Gift of Growth', rarity: 'C', layout: 'normal' },
            { cardNumber: 164, cardSet: cardSetId, name: 'Grow from the Ashes', rarity: 'C', layout: 'normal' },
            { cardNumber: 165, cardSet: cardSetId, name: 'Grunn, the Lonely King', rarity: 'U', layout: 'normal' },
            { cardNumber: 166, cardSet: cardSetId, name: 'Kamahl\'s Druidic Vow', rarity: 'R', layout: 'normal' },
            { cardNumber: 167, cardSet: cardSetId, name: 'Krosan Druid', rarity: 'C', layout: 'normal' },
            { cardNumber: 168, cardSet: cardSetId, name: 'Llanowar Elves', rarity: 'C', layout: 'normal' },
            { cardNumber: 169, cardSet: cardSetId, name: 'Llanowar Envoy', rarity: 'C', layout: 'normal' },
            { cardNumber: 170, cardSet: cardSetId, name: 'Llanowar Scout', rarity: 'C', layout: 'normal' },
            { cardNumber: 171, cardSet: cardSetId, name: 'Mammoth Spider', rarity: 'C', layout: 'normal' },
            { cardNumber: 172, cardSet: cardSetId, name: 'Marwyn, the Nurturer', rarity: 'R', layout: 'normal' },
            { cardNumber: 173, cardSet: cardSetId, name: 'The Mending of Dominaria', rarity: 'R', layout: 'saga' },
            { cardNumber: 174, cardSet: cardSetId, name: 'Multani, Yavimaya\'s Avatar', rarity: 'M', layout: 'normal' },
            { cardNumber: 175, cardSet: cardSetId, name: 'Nature\'s Spiral', rarity: 'U', layout: 'normal' },
            { cardNumber: 176, cardSet: cardSetId, name: 'Pierce the Sky', rarity: 'C', layout: 'normal' },
            { cardNumber: 177, cardSet: cardSetId, name: 'Primordial Wurm', rarity: 'C', layout: 'normal' },
            { cardNumber: 178, cardSet: cardSetId, name: 'Saproling Migration', rarity: 'C', layout: 'normal' },
            { cardNumber: 179, cardSet: cardSetId, name: 'Song of Freyalise', rarity: 'U', layout: 'saga' },
            { cardNumber: 180, cardSet: cardSetId, name: 'Spore Swarm', rarity: 'U', layout: 'normal' },
            { cardNumber: 181, cardSet: cardSetId, name: 'Sporecrown Thallid', rarity: 'U', layout: 'normal' },
            { cardNumber: 182, cardSet: cardSetId, name: 'Steel Leaf Champion', rarity: 'R', layout: 'normal' },
            { cardNumber: 183, cardSet: cardSetId, name: 'Sylvan Awakening', rarity: 'R', layout: 'normal' },
            { cardNumber: 184, cardSet: cardSetId, name: 'Territorial Allosaurus', rarity: 'R', layout: 'normal' },
            { cardNumber: 185, cardSet: cardSetId, name: 'Thorn Elemental', rarity: 'U', layout: 'normal' },
            { cardNumber: 186, cardSet: cardSetId, name: 'Untamed Kavu', rarity: 'U', layout: 'normal' },
            { cardNumber: 187, cardSet: cardSetId, name: 'Verdant Force', rarity: 'R', layout: 'normal' },
            { cardNumber: 188, cardSet: cardSetId, name: 'Wild Onslaught', rarity: 'U', layout: 'normal' },
            { cardNumber: 189, cardSet: cardSetId, name: 'Yavimaya Sapherd', rarity: 'C', layout: 'normal' },
            { cardNumber: 190, cardSet: cardSetId, name: 'Adeliz, the Cinder Wind', rarity: 'U', layout: 'normal' },
            { cardNumber: 191, cardSet: cardSetId, name: 'Arvad the Cursed', rarity: 'U', layout: 'normal' },
            { cardNumber: 192, cardSet: cardSetId, name: 'Aryel, Knight of Windgrace', rarity: 'R', layout: 'normal' },
            { cardNumber: 193, cardSet: cardSetId, name: 'Darigaaz Reincarnated', rarity: 'M', layout: 'normal' },
            { cardNumber: 194, cardSet: cardSetId, name: 'Garna, the Bloodflame', rarity: 'U', layout: 'normal' },
            { cardNumber: 195, cardSet: cardSetId, name: 'Grand Warlord Radha', rarity: 'R', layout: 'normal' },
            { cardNumber: 196, cardSet: cardSetId, name: 'Hallar, the Firefletcher', rarity: 'U', layout: 'normal' },
            { cardNumber: 197, cardSet: cardSetId, name: 'Jhoira, Weatherlight Captain', rarity: 'M', layout: 'normal' },
            { cardNumber: 198, cardSet: cardSetId, name: 'Jodah, Archmage Eternal', rarity: 'R', layout: 'normal' },
            { cardNumber: 199, cardSet: cardSetId, name: 'Muldrotha, the Gravetide', rarity: 'M', layout: 'normal' },
            { cardNumber: 200, cardSet: cardSetId, name: 'Oath of Teferi', rarity: 'R', layout: 'normal' },
            { cardNumber: 201, cardSet: cardSetId, name: 'Primevals\' Glorious Rebirth', rarity: 'R', layout: 'normal' },
            { cardNumber: 202, cardSet: cardSetId, name: 'Raff Capashen, Ship\'s Mage', rarity: 'U', layout: 'normal' },
            { cardNumber: 203, cardSet: cardSetId, name: 'Rona, Disciple of Gix', rarity: 'U', layout: 'normal' },
            { cardNumber: 204, cardSet: cardSetId, name: 'Shanna, Sisay\'s Legacy', rarity: 'U', layout: 'normal' },
            { cardNumber: 205, cardSet: cardSetId, name: 'Slimefoot, the Stowaway', rarity: 'U', layout: 'normal' },
            { cardNumber: 206, cardSet: cardSetId, name: 'Tatyova, Benthic Druid', rarity: 'U', layout: 'normal' },
            { cardNumber: 207, cardSet: cardSetId, name: 'Teferi, Hero of Dominaria', rarity: 'M', layout: 'normal' },
            { cardNumber: 208, cardSet: cardSetId, name: 'Tiana, Ship\'s Caretaker', rarity: 'U', layout: 'normal' },
            { cardNumber: 209, cardSet: cardSetId, name: 'Aesthir Glider', rarity: 'C', layout: 'normal' },
            { cardNumber: 210, cardSet: cardSetId, name: 'Amaranthine Wall', rarity: 'U', layout: 'normal' },
            { cardNumber: 211, cardSet: cardSetId, name: 'Blackblade Reforged', rarity: 'R', layout: 'normal' },
            { cardNumber: 212, cardSet: cardSetId, name: 'Bloodtallow Candle', rarity: 'C', layout: 'normal' },
            { cardNumber: 213, cardSet: cardSetId, name: 'Damping Sphere', rarity: 'U', layout: 'normal' },
            { cardNumber: 214, cardSet: cardSetId, name: 'Forebear\'s Blade', rarity: 'R', layout: 'normal' },
            { cardNumber: 215, cardSet: cardSetId, name: 'Gilded Lotus', rarity: 'R', layout: 'normal' },
            { cardNumber: 216, cardSet: cardSetId, name: 'Guardians of Koilos', rarity: 'C', layout: 'normal' },
            { cardNumber: 217, cardSet: cardSetId, name: 'Helm of the Host', rarity: 'R', layout: 'normal' },
            { cardNumber: 218, cardSet: cardSetId, name: 'Howling Golem', rarity: 'U', layout: 'normal' },
            { cardNumber: 219, cardSet: cardSetId, name: 'Icy Manipulator', rarity: 'U', layout: 'normal' },
            { cardNumber: 220, cardSet: cardSetId, name: 'Jhoira\'s Familiar', rarity: 'U', layout: 'normal' },
            { cardNumber: 221, cardSet: cardSetId, name: 'Jousting Lance', rarity: 'C', layout: 'normal' },
            { cardNumber: 222, cardSet: cardSetId, name: 'Juggernaut', rarity: 'U', layout: 'normal' },
            { cardNumber: 223, cardSet: cardSetId, name: 'Mishra\'s Self-Replicator', rarity: 'R', layout: 'normal' },
            { cardNumber: 224, cardSet: cardSetId, name: 'Mox Amber', rarity: 'M', layout: 'normal' },
            { cardNumber: 225, cardSet: cardSetId, name: 'Navigator\'s Compass', rarity: 'C', layout: 'normal' },
            { cardNumber: 226, cardSet: cardSetId, name: 'Pardic Wanderer', rarity: 'C', layout: 'normal' },
            { cardNumber: 227, cardSet: cardSetId, name: 'Powerstone Shard', rarity: 'C', layout: 'normal' },
            { cardNumber: 228, cardSet: cardSetId, name: 'Shield of the Realm', rarity: 'U', layout: 'normal' },
            { cardNumber: 229, cardSet: cardSetId, name: 'Short Sword', rarity: 'C', layout: 'normal' },
            { cardNumber: 230, cardSet: cardSetId, name: 'Skittering Surveyor', rarity: 'C', layout: 'normal' },
            { cardNumber: 231, cardSet: cardSetId, name: 'Sorcerer\'s Wand', rarity: 'U', layout: 'normal' },
            { cardNumber: 232, cardSet: cardSetId, name: 'Sparring Construct', rarity: 'C', layout: 'normal' },
            { cardNumber: 233, cardSet: cardSetId, name: 'Thran Temporal Gateway', rarity: 'R', layout: 'normal' },
            { cardNumber: 234, cardSet: cardSetId, name: 'Traxos, Scourge of Kroog', rarity: 'R', layout: 'normal' },
            { cardNumber: 235, cardSet: cardSetId, name: 'Urza\'s Tome', rarity: 'U', layout: 'normal' },
            { cardNumber: 236, cardSet: cardSetId, name: 'Voltaic Servant', rarity: 'C', layout: 'normal' },
            { cardNumber: 237, cardSet: cardSetId, name: 'Weatherlight', rarity: 'M', layout: 'normal' },
            { cardNumber: 238, cardSet: cardSetId, name: 'Cabal Stronghold', rarity: 'R', layout: 'normal' },
            { cardNumber: 239, cardSet: cardSetId, name: 'Clifftop Retreat', rarity: 'R', layout: 'normal' },
            { cardNumber: 240, cardSet: cardSetId, name: 'Hinterland Harbor', rarity: 'R', layout: 'normal' },
            { cardNumber: 241, cardSet: cardSetId, name: 'Isolated Chapel', rarity: 'R', layout: 'normal' },
            { cardNumber: 242, cardSet: cardSetId, name: 'Memorial to Folly', rarity: 'U', layout: 'normal' },
            { cardNumber: 243, cardSet: cardSetId, name: 'Memorial to Genius', rarity: 'U', layout: 'normal' },
            { cardNumber: 244, cardSet: cardSetId, name: 'Memorial to Glory', rarity: 'U', layout: 'normal' },
            { cardNumber: 245, cardSet: cardSetId, name: 'Memorial to Unity', rarity: 'U', layout: 'normal' },
            { cardNumber: 246, cardSet: cardSetId, name: 'Memorial to War', rarity: 'U', layout: 'normal' },
            { cardNumber: 247, cardSet: cardSetId, name: 'Sulfur Falls', rarity: 'R', layout: 'normal' },
            { cardNumber: 248, cardSet: cardSetId, name: 'Woodland Cemetery', rarity: 'R', layout: 'normal' },
            { cardNumber: 249, cardSet: cardSetId, name: 'Zhalfirin Void', rarity: 'U', layout: 'normal' },
            { cardNumber: 250, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 251, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 252, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 253, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 254, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 255, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 256, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 257, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 258, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 259, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 260, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 261, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 262, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 263, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 264, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 265, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 266, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 267, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 268, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 269, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 270, cardSet: cardSetId, name: 'Teferi, Timebender', rarity: 'M', layout: 'normal' },
            { cardNumber: 271, cardSet: cardSetId, name: 'Temporal Machinations', rarity: 'C', layout: 'normal' },
            { cardNumber: 272, cardSet: cardSetId, name: 'Niambi, Faithful Healer', rarity: 'R', layout: 'normal' },
            { cardNumber: 273, cardSet: cardSetId, name: 'Teferi\'s Sentinel', rarity: 'U', layout: 'normal' },
            { cardNumber: 274, cardSet: cardSetId, name: 'Meandering River', rarity: 'C', layout: 'normal' },
            { cardNumber: 275, cardSet: cardSetId, name: 'Chandra, Bold Pyromancer', rarity: 'M', layout: 'normal' },
            { cardNumber: 276, cardSet: cardSetId, name: 'Chandra\'s Outburst', rarity: 'R', layout: 'normal' },
            { cardNumber: 277, cardSet: cardSetId, name: 'Karplusan Hound', rarity: 'U', layout: 'normal' },
            { cardNumber: 278, cardSet: cardSetId, name: 'Pyromantic Pilgrim', rarity: 'C', layout: 'normal' },
            { cardNumber: 279, cardSet: cardSetId, name: 'Timber Gorge', rarity: 'C', layout: 'normal' },
            { cardNumber: 280, cardSet: cardSetId, name: 'Firesong and Sunspeaker', rarity: 'R', layout: 'normal' },
        ]).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Get the card set id
        const shortname = 'DOM';
        const cardSet = await queryRunner.manager
            .getRepository(CardSet)
            .createQueryBuilder('cardset')
            .where('cardset.short_name = :shortname', { shortname })
            .getOne();

        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('card_amount')
            .where('card_set_1 = :cardsetid', { cardsetid: cardSet.id })
            .execute();

        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('card')
            .where('card_set_1 = :cardsetid', { cardsetid: cardSet.id })
            .execute();

        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('card_set')
            .where('short_name = :shortname', { shortname })
            .execute();
    }

}
