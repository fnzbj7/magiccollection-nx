import { CardSet } from "../card/entity/card-set.entity";
import { InsertResult, MigrationInterface, QueryRunner } from "typeorm";

export class addingM191620390697337 implements MigrationInterface {
    name = 'addingM191620390697337';

    public async up(queryRunner: QueryRunner): Promise<void> {

        const insertResult: InsertResult = await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('card_set')
            .values({ name: 'Core Set 2019', shortName: 'M19' })
            .execute();
        const cardSetId: number = insertResult.identifiers[0].id;

        await queryRunner.manager.createQueryBuilder().insert().into('card', [`cardNumber`, `name`, `rarity`, `layout`, `cardSet`]).values([
            { cardNumber: 1, cardSet: cardSetId, name: 'Aegis of the Heavens', rarity: 'U', layout: 'normal' },
            { cardNumber: 2, cardSet: cardSetId, name: 'Aethershield Artificer', rarity: 'U', layout: 'normal' },
            { cardNumber: 3, cardSet: cardSetId, name: 'Ajani, Adversary of Tyrants', rarity: 'M', layout: 'normal' },
            { cardNumber: 4, cardSet: cardSetId, name: 'Ajani\'s Last Stand', rarity: 'R', layout: 'normal' },
            { cardNumber: 5, cardSet: cardSetId, name: 'Ajani\'s Pridemate', rarity: 'U', layout: 'normal' },
            { cardNumber: 6, cardSet: cardSetId, name: 'Ajani\'s Welcome', rarity: 'U', layout: 'normal' },
            { cardNumber: 7, cardSet: cardSetId, name: 'Angel of the Dawn', rarity: 'C', layout: 'normal' },
            { cardNumber: 8, cardSet: cardSetId, name: 'Cavalry Drillmaster', rarity: 'C', layout: 'normal' },
            { cardNumber: 9, cardSet: cardSetId, name: 'Cleansing Nova', rarity: 'R', layout: 'normal' },
            { cardNumber: 10, cardSet: cardSetId, name: 'Daybreak Chaplain', rarity: 'C', layout: 'normal' },
            { cardNumber: 11, cardSet: cardSetId, name: 'Dwarven Priest', rarity: 'C', layout: 'normal' },
            { cardNumber: 12, cardSet: cardSetId, name: 'Gallant Cavalry', rarity: 'C', layout: 'normal' },
            { cardNumber: 13, cardSet: cardSetId, name: 'Herald of Faith', rarity: 'U', layout: 'normal' },
            { cardNumber: 14, cardSet: cardSetId, name: 'Hieromancer\'s Cage', rarity: 'U', layout: 'normal' },
            { cardNumber: 15, cardSet: cardSetId, name: 'Inspired Charge', rarity: 'C', layout: 'normal' },
            { cardNumber: 16, cardSet: cardSetId, name: 'Invoke the Divine', rarity: 'C', layout: 'normal' },
            { cardNumber: 17, cardSet: cardSetId, name: 'Isolate', rarity: 'R', layout: 'normal' },
            { cardNumber: 18, cardSet: cardSetId, name: 'Knight of the Tusk', rarity: 'C', layout: 'normal' },
            { cardNumber: 19, cardSet: cardSetId, name: 'Knight\'s Pledge', rarity: 'C', layout: 'normal' },
            { cardNumber: 20, cardSet: cardSetId, name: 'Knightly Valor', rarity: 'U', layout: 'normal' },
            { cardNumber: 21, cardSet: cardSetId, name: 'Lena, Selfless Champion', rarity: 'R', layout: 'normal' },
            { cardNumber: 22, cardSet: cardSetId, name: 'Leonin Vanguard', rarity: 'U', layout: 'normal' },
            { cardNumber: 23, cardSet: cardSetId, name: 'Leonin Warleader', rarity: 'R', layout: 'normal' },
            { cardNumber: 24, cardSet: cardSetId, name: 'Loxodon Line Breaker', rarity: 'C', layout: 'normal' },
            { cardNumber: 25, cardSet: cardSetId, name: 'Luminous Bonds', rarity: 'C', layout: 'normal' },
            { cardNumber: 26, cardSet: cardSetId, name: 'Make a Stand', rarity: 'U', layout: 'normal' },
            { cardNumber: 27, cardSet: cardSetId, name: 'Mentor of the Meek', rarity: 'R', layout: 'normal' },
            { cardNumber: 28, cardSet: cardSetId, name: 'Mighty Leap', rarity: 'C', layout: 'normal' },
            { cardNumber: 29, cardSet: cardSetId, name: 'Militia Bugler', rarity: 'U', layout: 'normal' },
            { cardNumber: 30, cardSet: cardSetId, name: 'Novice Knight', rarity: 'U', layout: 'normal' },
            { cardNumber: 31, cardSet: cardSetId, name: 'Oreskos Swiftclaw', rarity: 'C', layout: 'normal' },
            { cardNumber: 32, cardSet: cardSetId, name: 'Pegasus Courser', rarity: 'C', layout: 'normal' },
            { cardNumber: 33, cardSet: cardSetId, name: 'Remorseful Cleric', rarity: 'R', layout: 'normal' },
            { cardNumber: 34, cardSet: cardSetId, name: 'Resplendent Angel', rarity: 'M', layout: 'normal' },
            { cardNumber: 35, cardSet: cardSetId, name: 'Revitalize', rarity: 'C', layout: 'normal' },
            { cardNumber: 36, cardSet: cardSetId, name: 'Rustwing Falcon', rarity: 'C', layout: 'normal' },
            { cardNumber: 37, cardSet: cardSetId, name: 'Shield Mare', rarity: 'U', layout: 'normal' },
            { cardNumber: 38, cardSet: cardSetId, name: 'Star-Crowned Stag', rarity: 'C', layout: 'normal' },
            { cardNumber: 39, cardSet: cardSetId, name: 'Suncleanser', rarity: 'R', layout: 'normal' },
            { cardNumber: 40, cardSet: cardSetId, name: 'Take Vengeance', rarity: 'C', layout: 'normal' },
            { cardNumber: 41, cardSet: cardSetId, name: 'Trusty Packbeast', rarity: 'C', layout: 'normal' },
            { cardNumber: 42, cardSet: cardSetId, name: 'Valiant Knight', rarity: 'R', layout: 'normal' },
            { cardNumber: 43, cardSet: cardSetId, name: 'Aether Tunnel', rarity: 'U', layout: 'normal' },
            { cardNumber: 44, cardSet: cardSetId, name: 'Anticipate', rarity: 'C', layout: 'normal' },
            { cardNumber: 45, cardSet: cardSetId, name: 'Aven Wind Mage', rarity: 'C', layout: 'normal' },
            { cardNumber: 46, cardSet: cardSetId, name: 'Aviation Pioneer', rarity: 'C', layout: 'normal' },
            { cardNumber: 47, cardSet: cardSetId, name: 'Bone to Ash', rarity: 'U', layout: 'normal' },
            { cardNumber: 48, cardSet: cardSetId, name: 'Cancel', rarity: 'C', layout: 'normal' },
            { cardNumber: 49, cardSet: cardSetId, name: 'Departed Deckhand', rarity: 'U', layout: 'normal' },
            { cardNumber: 50, cardSet: cardSetId, name: 'Disperse', rarity: 'C', layout: 'normal' },
            { cardNumber: 51, cardSet: cardSetId, name: 'Divination', rarity: 'C', layout: 'normal' },
            { cardNumber: 52, cardSet: cardSetId, name: 'Djinn of Wishes', rarity: 'R', layout: 'normal' },
            { cardNumber: 53, cardSet: cardSetId, name: 'Dwindle', rarity: 'C', layout: 'normal' },
            { cardNumber: 54, cardSet: cardSetId, name: 'Essence Scatter', rarity: 'C', layout: 'normal' },
            { cardNumber: 55, cardSet: cardSetId, name: 'Exclusion Mage', rarity: 'U', layout: 'normal' },
            { cardNumber: 56, cardSet: cardSetId, name: 'Frilled Sea Serpent', rarity: 'C', layout: 'normal' },
            { cardNumber: 57, cardSet: cardSetId, name: 'Gearsmith Prodigy', rarity: 'C', layout: 'normal' },
            { cardNumber: 58, cardSet: cardSetId, name: 'Ghostform', rarity: 'C', layout: 'normal' },
            { cardNumber: 59, cardSet: cardSetId, name: 'Horizon Scholar', rarity: 'U', layout: 'normal' },
            { cardNumber: 60, cardSet: cardSetId, name: 'Metamorphic Alteration', rarity: 'R', layout: 'normal' },
            { cardNumber: 61, cardSet: cardSetId, name: 'Mirror Image', rarity: 'U', layout: 'normal' },
            { cardNumber: 62, cardSet: cardSetId, name: 'Mistcaller', rarity: 'R', layout: 'normal' },
            { cardNumber: 63, cardSet: cardSetId, name: 'Mystic Archaeologist', rarity: 'R', layout: 'normal' },
            { cardNumber: 64, cardSet: cardSetId, name: 'Omenspeaker', rarity: 'C', layout: 'normal' },
            { cardNumber: 65, cardSet: cardSetId, name: 'Omniscience', rarity: 'M', layout: 'normal' },
            { cardNumber: 66, cardSet: cardSetId, name: 'One with the Machine', rarity: 'R', layout: 'normal' },
            { cardNumber: 67, cardSet: cardSetId, name: 'Patient Rebuilding', rarity: 'R', layout: 'normal' },
            { cardNumber: 68, cardSet: cardSetId, name: 'Psychic Corrosion', rarity: 'U', layout: 'normal' },
            { cardNumber: 69, cardSet: cardSetId, name: 'Sai, Master Thopterist', rarity: 'R', layout: 'normal' },
            { cardNumber: 70, cardSet: cardSetId, name: 'Salvager of Secrets', rarity: 'C', layout: 'normal' },
            { cardNumber: 71, cardSet: cardSetId, name: 'Scholar of Stars', rarity: 'C', layout: 'normal' },
            { cardNumber: 72, cardSet: cardSetId, name: 'Sift', rarity: 'U', layout: 'normal' },
            { cardNumber: 73, cardSet: cardSetId, name: 'Skilled Animator', rarity: 'U', layout: 'normal' },
            { cardNumber: 74, cardSet: cardSetId, name: 'Sleep', rarity: 'U', layout: 'normal' },
            { cardNumber: 75, cardSet: cardSetId, name: 'Snapping Drake', rarity: 'C', layout: 'normal' },
            { cardNumber: 76, cardSet: cardSetId, name: 'Supreme Phantom', rarity: 'R', layout: 'normal' },
            { cardNumber: 77, cardSet: cardSetId, name: 'Surge Mare', rarity: 'U', layout: 'normal' },
            { cardNumber: 78, cardSet: cardSetId, name: 'Switcheroo', rarity: 'U', layout: 'normal' },
            { cardNumber: 79, cardSet: cardSetId, name: 'Tezzeret, Artifice Master', rarity: 'M', layout: 'normal' },
            { cardNumber: 80, cardSet: cardSetId, name: 'Tolarian Scholar', rarity: 'C', layout: 'normal' },
            { cardNumber: 81, cardSet: cardSetId, name: 'Totally Lost', rarity: 'C', layout: 'normal' },
            { cardNumber: 82, cardSet: cardSetId, name: 'Uncomfortable Chill', rarity: 'C', layout: 'normal' },
            { cardNumber: 83, cardSet: cardSetId, name: 'Wall of Mist', rarity: 'C', layout: 'normal' },
            { cardNumber: 84, cardSet: cardSetId, name: 'Windreader Sphinx', rarity: 'R', layout: 'normal' },
            { cardNumber: 85, cardSet: cardSetId, name: 'Abnormal Endurance', rarity: 'C', layout: 'normal' },
            { cardNumber: 86, cardSet: cardSetId, name: 'Blood Divination', rarity: 'U', layout: 'normal' },
            { cardNumber: 87, cardSet: cardSetId, name: 'Bogstomper', rarity: 'C', layout: 'normal' },
            { cardNumber: 88, cardSet: cardSetId, name: 'Bone Dragon', rarity: 'M', layout: 'normal' },
            { cardNumber: 89, cardSet: cardSetId, name: 'Child of Night', rarity: 'C', layout: 'normal' },
            { cardNumber: 90, cardSet: cardSetId, name: 'Death Baron', rarity: 'R', layout: 'normal' },
            { cardNumber: 91, cardSet: cardSetId, name: 'Demon of Catastrophes', rarity: 'R', layout: 'normal' },
            { cardNumber: 92, cardSet: cardSetId, name: 'Diregraf Ghoul', rarity: 'U', layout: 'normal' },
            { cardNumber: 93, cardSet: cardSetId, name: 'Doomed Dissenter', rarity: 'C', layout: 'normal' },
            { cardNumber: 94, cardSet: cardSetId, name: 'Duress', rarity: 'C', layout: 'normal' },
            { cardNumber: 95, cardSet: cardSetId, name: 'Epicure of Blood', rarity: 'C', layout: 'normal' },
            { cardNumber: 96, cardSet: cardSetId, name: 'Fell Specter', rarity: 'U', layout: 'normal' },
            { cardNumber: 97, cardSet: cardSetId, name: 'Fraying Omnipotence', rarity: 'R', layout: 'normal' },
            { cardNumber: 98, cardSet: cardSetId, name: 'Gravedigger', rarity: 'U', layout: 'normal' },
            { cardNumber: 99, cardSet: cardSetId, name: 'Graveyard Marshal', rarity: 'R', layout: 'normal' },
            { cardNumber: 100, cardSet: cardSetId, name: 'Hired Blade', rarity: 'C', layout: 'normal' },
            { cardNumber: 101, cardSet: cardSetId, name: 'Infectious Horror', rarity: 'C', layout: 'normal' },
            { cardNumber: 102, cardSet: cardSetId, name: 'Infernal Reckoning', rarity: 'R', layout: 'normal' },
            { cardNumber: 103, cardSet: cardSetId, name: 'Infernal Scarring', rarity: 'C', layout: 'normal' },
            { cardNumber: 104, cardSet: cardSetId, name: 'Isareth the Awakener', rarity: 'R', layout: 'normal' },
            { cardNumber: 105, cardSet: cardSetId, name: 'Lich\'s Caress', rarity: 'C', layout: 'normal' },
            { cardNumber: 106, cardSet: cardSetId, name: 'Liliana, Untouched by Death', rarity: 'M', layout: 'normal' },
            { cardNumber: 107, cardSet: cardSetId, name: 'Liliana\'s Contract', rarity: 'R', layout: 'normal' },
            { cardNumber: 108, cardSet: cardSetId, name: 'Macabre Waltz', rarity: 'C', layout: 'normal' },
            { cardNumber: 109, cardSet: cardSetId, name: 'Mind Rot', rarity: 'C', layout: 'normal' },
            { cardNumber: 110, cardSet: cardSetId, name: 'Murder', rarity: 'U', layout: 'normal' },
            { cardNumber: 111, cardSet: cardSetId, name: 'Nightmare\'s Thirst', rarity: 'U', layout: 'normal' },
            { cardNumber: 112, cardSet: cardSetId, name: 'Open the Graves', rarity: 'R', layout: 'normal' },
            { cardNumber: 113, cardSet: cardSetId, name: 'Phylactery Lich', rarity: 'R', layout: 'normal' },
            { cardNumber: 114, cardSet: cardSetId, name: 'Plague Mare', rarity: 'U', layout: 'normal' },
            { cardNumber: 115, cardSet: cardSetId, name: 'Ravenous Harpy', rarity: 'U', layout: 'normal' },
            { cardNumber: 116, cardSet: cardSetId, name: 'Reassembling Skeleton', rarity: 'U', layout: 'normal' },
            { cardNumber: 117, cardSet: cardSetId, name: 'Rise from the Grave', rarity: 'U', layout: 'normal' },
            { cardNumber: 118, cardSet: cardSetId, name: 'Skeleton Archer', rarity: 'C', layout: 'normal' },
            { cardNumber: 119, cardSet: cardSetId, name: 'Skymarch Bloodletter', rarity: 'C', layout: 'normal' },
            { cardNumber: 120, cardSet: cardSetId, name: 'Sovereign\'s Bite', rarity: 'C', layout: 'normal' },
            { cardNumber: 121, cardSet: cardSetId, name: 'Stitcher\'s Supplier', rarity: 'U', layout: 'normal' },
            { cardNumber: 122, cardSet: cardSetId, name: 'Strangling Spores', rarity: 'C', layout: 'normal' },
            { cardNumber: 123, cardSet: cardSetId, name: 'Two-Headed Zombie', rarity: 'C', layout: 'normal' },
            { cardNumber: 124, cardSet: cardSetId, name: 'Vampire Neonate', rarity: 'C', layout: 'normal' },
            { cardNumber: 125, cardSet: cardSetId, name: 'Vampire Sovereign', rarity: 'U', layout: 'normal' },
            { cardNumber: 126, cardSet: cardSetId, name: 'Walking Corpse', rarity: 'C', layout: 'normal' },
            { cardNumber: 127, cardSet: cardSetId, name: 'Act of Treason', rarity: 'C', layout: 'normal' },
            { cardNumber: 128, cardSet: cardSetId, name: 'Alpine Moon', rarity: 'R', layout: 'normal' },
            { cardNumber: 129, cardSet: cardSetId, name: 'Apex of Power', rarity: 'M', layout: 'normal' },
            { cardNumber: 130, cardSet: cardSetId, name: 'Banefire', rarity: 'R', layout: 'normal' },
            { cardNumber: 131, cardSet: cardSetId, name: 'Boggart Brute', rarity: 'C', layout: 'normal' },
            { cardNumber: 132, cardSet: cardSetId, name: 'Catalyst Elemental', rarity: 'C', layout: 'normal' },
            { cardNumber: 133, cardSet: cardSetId, name: 'Crash Through', rarity: 'C', layout: 'normal' },
            { cardNumber: 134, cardSet: cardSetId, name: 'Dark-Dweller Oracle', rarity: 'R', layout: 'normal' },
            { cardNumber: 135, cardSet: cardSetId, name: 'Demanding Dragon', rarity: 'R', layout: 'normal' },
            { cardNumber: 136, cardSet: cardSetId, name: 'Dismissive Pyromancer', rarity: 'R', layout: 'normal' },
            { cardNumber: 137, cardSet: cardSetId, name: 'Doublecast', rarity: 'U', layout: 'normal' },
            { cardNumber: 138, cardSet: cardSetId, name: 'Dragon Egg', rarity: 'U', layout: 'normal' },
            { cardNumber: 139, cardSet: cardSetId, name: 'Electrify', rarity: 'C', layout: 'normal' },
            { cardNumber: 140, cardSet: cardSetId, name: 'Fiery Finish', rarity: 'U', layout: 'normal' },
            { cardNumber: 141, cardSet: cardSetId, name: 'Fire Elemental', rarity: 'C', layout: 'normal' },
            { cardNumber: 142, cardSet: cardSetId, name: 'Goblin Instigator', rarity: 'C', layout: 'normal' },
            { cardNumber: 143, cardSet: cardSetId, name: 'Goblin Motivator', rarity: 'C', layout: 'normal' },
            { cardNumber: 144, cardSet: cardSetId, name: 'Goblin Trashmaster', rarity: 'R', layout: 'normal' },
            { cardNumber: 145, cardSet: cardSetId, name: 'Guttersnipe', rarity: 'U', layout: 'normal' },
            { cardNumber: 146, cardSet: cardSetId, name: 'Havoc Devils', rarity: 'C', layout: 'normal' },
            { cardNumber: 147, cardSet: cardSetId, name: 'Hostile Minotaur', rarity: 'C', layout: 'normal' },
            { cardNumber: 148, cardSet: cardSetId, name: 'Inferno Hellion', rarity: 'U', layout: 'normal' },
            { cardNumber: 149, cardSet: cardSetId, name: 'Lathliss, Dragon Queen', rarity: 'R', layout: 'normal' },
            { cardNumber: 150, cardSet: cardSetId, name: 'Lava Axe', rarity: 'C', layout: 'normal' },
            { cardNumber: 151, cardSet: cardSetId, name: 'Lightning Mare', rarity: 'U', layout: 'normal' },
            { cardNumber: 152, cardSet: cardSetId, name: 'Lightning Strike', rarity: 'U', layout: 'normal' },
            { cardNumber: 153, cardSet: cardSetId, name: 'Onakke Ogre', rarity: 'C', layout: 'normal' },
            { cardNumber: 154, cardSet: cardSetId, name: 'Sarkhan, Fireblood', rarity: 'M', layout: 'normal' },
            { cardNumber: 155, cardSet: cardSetId, name: 'Sarkhan\'s Unsealing', rarity: 'R', layout: 'normal' },
            { cardNumber: 156, cardSet: cardSetId, name: 'Shock', rarity: 'C', layout: 'normal' },
            { cardNumber: 157, cardSet: cardSetId, name: 'Siegebreaker Giant', rarity: 'U', layout: 'normal' },
            { cardNumber: 158, cardSet: cardSetId, name: 'Smelt', rarity: 'C', layout: 'normal' },
            { cardNumber: 159, cardSet: cardSetId, name: 'Sparktongue Dragon', rarity: 'C', layout: 'normal' },
            { cardNumber: 160, cardSet: cardSetId, name: 'Spit Flame', rarity: 'R', layout: 'normal' },
            { cardNumber: 161, cardSet: cardSetId, name: 'Sure Strike', rarity: 'C', layout: 'normal' },
            { cardNumber: 162, cardSet: cardSetId, name: 'Tectonic Rift', rarity: 'U', layout: 'normal' },
            { cardNumber: 163, cardSet: cardSetId, name: 'Thud', rarity: 'U', layout: 'normal' },
            { cardNumber: 164, cardSet: cardSetId, name: 'Tormenting Voice', rarity: 'C', layout: 'normal' },
            { cardNumber: 165, cardSet: cardSetId, name: 'Trumpet Blast', rarity: 'C', layout: 'normal' },
            { cardNumber: 166, cardSet: cardSetId, name: 'Viashino Pyromancer', rarity: 'C', layout: 'normal' },
            { cardNumber: 167, cardSet: cardSetId, name: 'Volcanic Dragon', rarity: 'U', layout: 'normal' },
            { cardNumber: 168, cardSet: cardSetId, name: 'Volley Veteran', rarity: 'U', layout: 'normal' },
            { cardNumber: 169, cardSet: cardSetId, name: 'Blanchwood Armor', rarity: 'U', layout: 'normal' },
            { cardNumber: 170, cardSet: cardSetId, name: 'Bristling Boar', rarity: 'C', layout: 'normal' },
            { cardNumber: 171, cardSet: cardSetId, name: 'Centaur Courser', rarity: 'C', layout: 'normal' },
            { cardNumber: 172, cardSet: cardSetId, name: 'Colossal Dreadmaw', rarity: 'C', layout: 'normal' },
            { cardNumber: 173, cardSet: cardSetId, name: 'Colossal Majesty', rarity: 'U', layout: 'normal' },
            { cardNumber: 174, cardSet: cardSetId, name: 'Daggerback Basilisk', rarity: 'C', layout: 'normal' },
            { cardNumber: 175, cardSet: cardSetId, name: 'Declare Dominance', rarity: 'U', layout: 'normal' },
            { cardNumber: 176, cardSet: cardSetId, name: 'Druid of Horns', rarity: 'U', layout: 'normal' },
            { cardNumber: 177, cardSet: cardSetId, name: 'Druid of the Cowl', rarity: 'C', layout: 'normal' },
            { cardNumber: 178, cardSet: cardSetId, name: 'Dryad Greenseeker', rarity: 'U', layout: 'normal' },
            { cardNumber: 179, cardSet: cardSetId, name: 'Elvish Clancaller', rarity: 'R', layout: 'normal' },
            { cardNumber: 180, cardSet: cardSetId, name: 'Elvish Rejuvenator', rarity: 'C', layout: 'normal' },
            { cardNumber: 181, cardSet: cardSetId, name: 'Ghastbark Twins', rarity: 'U', layout: 'normal' },
            { cardNumber: 182, cardSet: cardSetId, name: 'Ghirapur Guide', rarity: 'U', layout: 'normal' },
            { cardNumber: 183, cardSet: cardSetId, name: 'Giant Spider', rarity: 'C', layout: 'normal' },
            { cardNumber: 184, cardSet: cardSetId, name: 'Gift of Paradise', rarity: 'U', layout: 'normal' },
            { cardNumber: 185, cardSet: cardSetId, name: 'Gigantosaurus', rarity: 'R', layout: 'normal' },
            { cardNumber: 186, cardSet: cardSetId, name: 'Goreclaw, Terror of Qal Sisma', rarity: 'R', layout: 'normal' },
            { cardNumber: 187, cardSet: cardSetId, name: 'Greenwood Sentinel', rarity: 'C', layout: 'normal' },
            { cardNumber: 188, cardSet: cardSetId, name: 'Highland Game', rarity: 'C', layout: 'normal' },
            { cardNumber: 189, cardSet: cardSetId, name: 'Hungering Hydra', rarity: 'R', layout: 'normal' },
            { cardNumber: 190, cardSet: cardSetId, name: 'Naturalize', rarity: 'C', layout: 'normal' },
            { cardNumber: 191, cardSet: cardSetId, name: 'Oakenform', rarity: 'C', layout: 'normal' },
            { cardNumber: 192, cardSet: cardSetId, name: 'Pelakka Wurm', rarity: 'R', layout: 'normal' },
            { cardNumber: 193, cardSet: cardSetId, name: 'Plummet', rarity: 'C', layout: 'normal' },
            { cardNumber: 194, cardSet: cardSetId, name: 'Prodigious Growth', rarity: 'R', layout: 'normal' },
            { cardNumber: 195, cardSet: cardSetId, name: 'Rabid Bite', rarity: 'C', layout: 'normal' },
            { cardNumber: 196, cardSet: cardSetId, name: 'Reclamation Sage', rarity: 'U', layout: 'normal' },
            { cardNumber: 197, cardSet: cardSetId, name: 'Recollect', rarity: 'U', layout: 'normal' },
            { cardNumber: 198, cardSet: cardSetId, name: 'Rhox Oracle', rarity: 'C', layout: 'normal' },
            { cardNumber: 199, cardSet: cardSetId, name: 'Root Snare', rarity: 'C', layout: 'normal' },
            { cardNumber: 200, cardSet: cardSetId, name: 'Runic Armasaur', rarity: 'R', layout: 'normal' },
            { cardNumber: 201, cardSet: cardSetId, name: 'Scapeshift', rarity: 'M', layout: 'normal' },
            { cardNumber: 202, cardSet: cardSetId, name: 'Talons of Wildwood', rarity: 'C', layout: 'normal' },
            { cardNumber: 203, cardSet: cardSetId, name: 'Thorn Lieutenant', rarity: 'R', layout: 'normal' },
            { cardNumber: 204, cardSet: cardSetId, name: 'Thornhide Wolves', rarity: 'C', layout: 'normal' },
            { cardNumber: 205, cardSet: cardSetId, name: 'Titanic Growth', rarity: 'C', layout: 'normal' },
            { cardNumber: 206, cardSet: cardSetId, name: 'Vigilant Baloth', rarity: 'U', layout: 'normal' },
            { cardNumber: 207, cardSet: cardSetId, name: 'Vine Mare', rarity: 'U', layout: 'normal' },
            { cardNumber: 208, cardSet: cardSetId, name: 'Vivien Reid', rarity: 'M', layout: 'normal' },
            { cardNumber: 209, cardSet: cardSetId, name: 'Vivien\'s Invocation', rarity: 'R', layout: 'normal' },
            { cardNumber: 210, cardSet: cardSetId, name: 'Wall of Vines', rarity: 'C', layout: 'normal' },
            { cardNumber: 211, cardSet: cardSetId, name: 'Aerial Engineer', rarity: 'U', layout: 'normal' },
            { cardNumber: 212, cardSet: cardSetId, name: 'Arcades, the Strategist', rarity: 'M', layout: 'normal' },
            { cardNumber: 213, cardSet: cardSetId, name: 'Brawl-Bash Ogre', rarity: 'U', layout: 'normal' },
            { cardNumber: 214, cardSet: cardSetId, name: 'Chromium, the Mutable', rarity: 'M', layout: 'normal' },
            { cardNumber: 215, cardSet: cardSetId, name: 'Draconic Disciple', rarity: 'U', layout: 'normal' },
            { cardNumber: 216, cardSet: cardSetId, name: 'Enigma Drake', rarity: 'U', layout: 'normal' },
            { cardNumber: 217, cardSet: cardSetId, name: 'Heroic Reinforcements', rarity: 'U', layout: 'normal' },
            { cardNumber: 218, cardSet: cardSetId, name: 'Nicol Bolas, the Ravager', rarity: 'M', layout: 'transform' },
            { cardNumber: 219, cardSet: cardSetId, name: 'Palladia-Mors, the Ruiner', rarity: 'M', layout: 'normal' },
            { cardNumber: 220, cardSet: cardSetId, name: 'Poison-Tip Archer', rarity: 'U', layout: 'normal' },
            { cardNumber: 221, cardSet: cardSetId, name: 'Psychic Symbiont', rarity: 'U', layout: 'normal' },
            { cardNumber: 222, cardSet: cardSetId, name: 'Regal Bloodlord', rarity: 'U', layout: 'normal' },
            { cardNumber: 223, cardSet: cardSetId, name: 'Satyr Enchanter', rarity: 'U', layout: 'normal' },
            { cardNumber: 224, cardSet: cardSetId, name: 'Skyrider Patrol', rarity: 'U', layout: 'normal' },
            { cardNumber: 225, cardSet: cardSetId, name: 'Vaevictis Asmadi, the Dire', rarity: 'M', layout: 'normal' },
            { cardNumber: 226, cardSet: cardSetId, name: 'Amulet of Safekeeping', rarity: 'R', layout: 'normal' },
            { cardNumber: 227, cardSet: cardSetId, name: 'Arcane Encyclopedia', rarity: 'U', layout: 'normal' },
            { cardNumber: 228, cardSet: cardSetId, name: 'Chaos Wand', rarity: 'R', layout: 'normal' },
            { cardNumber: 229, cardSet: cardSetId, name: 'Crucible of Worlds', rarity: 'M', layout: 'normal' },
            { cardNumber: 230, cardSet: cardSetId, name: 'Desecrated Tomb', rarity: 'R', layout: 'normal' },
            { cardNumber: 231, cardSet: cardSetId, name: 'Diamond Mare', rarity: 'U', layout: 'normal' },
            { cardNumber: 232, cardSet: cardSetId, name: 'Dragon\'s Hoard', rarity: 'R', layout: 'normal' },
            { cardNumber: 233, cardSet: cardSetId, name: 'Explosive Apparatus', rarity: 'C', layout: 'normal' },
            { cardNumber: 234, cardSet: cardSetId, name: 'Field Creeper', rarity: 'C', layout: 'normal' },
            { cardNumber: 235, cardSet: cardSetId, name: 'Fountain of Renewal', rarity: 'U', layout: 'normal' },
            { cardNumber: 236, cardSet: cardSetId, name: 'Gargoyle Sentinel', rarity: 'U', layout: 'normal' },
            { cardNumber: 237, cardSet: cardSetId, name: 'Gearsmith Guardian', rarity: 'C', layout: 'normal' },
            { cardNumber: 238, cardSet: cardSetId, name: 'Magistrate\'s Scepter', rarity: 'R', layout: 'normal' },
            { cardNumber: 239, cardSet: cardSetId, name: 'Manalith', rarity: 'C', layout: 'normal' },
            { cardNumber: 240, cardSet: cardSetId, name: 'Marauder\'s Axe', rarity: 'C', layout: 'normal' },
            { cardNumber: 241, cardSet: cardSetId, name: 'Meteor Golem', rarity: 'U', layout: 'normal' },
            { cardNumber: 242, cardSet: cardSetId, name: 'Millstone', rarity: 'U', layout: 'normal' },
            { cardNumber: 243, cardSet: cardSetId, name: 'Rogue\'s Gloves', rarity: 'U', layout: 'normal' },
            { cardNumber: 244, cardSet: cardSetId, name: 'Sigiled Sword of Valeron', rarity: 'R', layout: 'normal' },
            { cardNumber: 245, cardSet: cardSetId, name: 'Skyscanner', rarity: 'C', layout: 'normal' },
            { cardNumber: 246, cardSet: cardSetId, name: 'Suspicious Bookcase', rarity: 'U', layout: 'normal' },
            { cardNumber: 247, cardSet: cardSetId, name: 'Transmogrifying Wand', rarity: 'R', layout: 'normal' },
            { cardNumber: 248, cardSet: cardSetId, name: 'Cinder Barrens', rarity: 'C', layout: 'normal' },
            { cardNumber: 249, cardSet: cardSetId, name: 'Detection Tower', rarity: 'R', layout: 'normal' },
            { cardNumber: 250, cardSet: cardSetId, name: 'Forsaken Sanctuary', rarity: 'C', layout: 'normal' },
            { cardNumber: 251, cardSet: cardSetId, name: 'Foul Orchard', rarity: 'C', layout: 'normal' },
            { cardNumber: 252, cardSet: cardSetId, name: 'Highland Lake', rarity: 'C', layout: 'normal' },
            { cardNumber: 253, cardSet: cardSetId, name: 'Meandering River', rarity: 'C', layout: 'normal' },
            { cardNumber: 254, cardSet: cardSetId, name: 'Reliquary Tower', rarity: 'U', layout: 'normal' },
            { cardNumber: 255, cardSet: cardSetId, name: 'Rupture Spire', rarity: 'U', layout: 'normal' },
            { cardNumber: 256, cardSet: cardSetId, name: 'Stone Quarry', rarity: 'C', layout: 'normal' },
            { cardNumber: 257, cardSet: cardSetId, name: 'Submerged Boneyard', rarity: 'C', layout: 'normal' },
            { cardNumber: 258, cardSet: cardSetId, name: 'Timber Gorge', rarity: 'C', layout: 'normal' },
            { cardNumber: 259, cardSet: cardSetId, name: 'Tranquil Expanse', rarity: 'C', layout: 'normal' },
            { cardNumber: 260, cardSet: cardSetId, name: 'Woodland Stream', rarity: 'C', layout: 'normal' },
            { cardNumber: 261, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 262, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 263, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 264, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 265, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 266, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 267, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 268, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 269, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 270, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 271, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 272, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 273, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 274, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 275, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 276, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 277, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 278, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 279, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 280, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 281, cardSet: cardSetId, name: 'Ajani, Wise Counselor', rarity: 'M', layout: 'normal' },
            { cardNumber: 282, cardSet: cardSetId, name: 'Ajani\'s Influence', rarity: 'R', layout: 'normal' },
            { cardNumber: 283, cardSet: cardSetId, name: 'Court Cleric', rarity: 'U', layout: 'normal' },
            { cardNumber: 284, cardSet: cardSetId, name: 'Serra\'s Guardian', rarity: 'R', layout: 'normal' },
            { cardNumber: 285, cardSet: cardSetId, name: 'Silverbeak Griffin', rarity: 'C', layout: 'normal' },
            { cardNumber: 286, cardSet: cardSetId, name: 'Tezzeret, Cruel Machinist', rarity: 'M', layout: 'normal' },
            { cardNumber: 287, cardSet: cardSetId, name: 'Riddlemaster Sphinx', rarity: 'R', layout: 'normal' },
            { cardNumber: 288, cardSet: cardSetId, name: 'Pendulum of Patterns', rarity: 'C', layout: 'normal' },
            { cardNumber: 289, cardSet: cardSetId, name: 'Tezzeret\'s Gatebreaker', rarity: 'R', layout: 'normal' },
            { cardNumber: 290, cardSet: cardSetId, name: 'Tezzeret\'s Strider', rarity: 'U', layout: 'normal' },
            { cardNumber: 291, cardSet: cardSetId, name: 'Liliana, the Necromancer', rarity: 'M', layout: 'normal' },
            { cardNumber: 292, cardSet: cardSetId, name: 'Arisen Gorgon', rarity: 'U', layout: 'normal' },
            { cardNumber: 293, cardSet: cardSetId, name: 'Gravewaker', rarity: 'R', layout: 'normal' },
            { cardNumber: 294, cardSet: cardSetId, name: 'Liliana\'s Spoils', rarity: 'R', layout: 'normal' },
            { cardNumber: 295, cardSet: cardSetId, name: 'Tattered Mummy', rarity: 'C', layout: 'normal' },
            { cardNumber: 296, cardSet: cardSetId, name: 'Sarkhan, Dragonsoul', rarity: 'M', layout: 'normal' },
            { cardNumber: 297, cardSet: cardSetId, name: 'Kargan Dragonrider', rarity: 'C', layout: 'normal' },
            { cardNumber: 298, cardSet: cardSetId, name: 'Sarkhan\'s Dragonfire', rarity: 'R', layout: 'normal' },
            { cardNumber: 299, cardSet: cardSetId, name: 'Sarkhan\'s Whelp', rarity: 'U', layout: 'normal' },
            { cardNumber: 300, cardSet: cardSetId, name: 'Shivan Dragon', rarity: 'R', layout: 'normal' },
            { cardNumber: 301, cardSet: cardSetId, name: 'Vivien of the Arkbow', rarity: 'M', layout: 'normal' },
            { cardNumber: 302, cardSet: cardSetId, name: 'Aggressive Mammoth', rarity: 'R', layout: 'normal' },
            { cardNumber: 303, cardSet: cardSetId, name: 'Skalla Wolf', rarity: 'R', layout: 'normal' },
            { cardNumber: 304, cardSet: cardSetId, name: 'Ursine Champion', rarity: 'C', layout: 'normal' },
            { cardNumber: 305, cardSet: cardSetId, name: 'Vivien\'s Jaguar', rarity: 'U', layout: 'normal' },
            { cardNumber: 306, cardSet: cardSetId, name: 'Nexus of Fate', rarity: 'M', layout: 'normal' },
            { cardNumber: 307, cardSet: cardSetId, name: 'Sun Sentinel', rarity: 'C', layout: 'normal' },
            { cardNumber: 308, cardSet: cardSetId, name: 'Air Elemental', rarity: 'U', layout: 'normal' },
            { cardNumber: 309, cardSet: cardSetId, name: 'Befuddle', rarity: 'C', layout: 'normal' },
            { cardNumber: 310, cardSet: cardSetId, name: 'Mist-Cloaked Herald', rarity: 'C', layout: 'normal' },
            { cardNumber: 311, cardSet: cardSetId, name: 'Waterknot', rarity: 'C', layout: 'normal' },
            { cardNumber: 312, cardSet: cardSetId, name: 'Grasping Scoundrel', rarity: 'C', layout: 'normal' },
            { cardNumber: 313, cardSet: cardSetId, name: 'Radiating Lightning', rarity: 'C', layout: 'normal' },
            { cardNumber: 314, cardSet: cardSetId, name: 'Llanowar Elves', rarity: 'C', layout: 'normal' },
        ]).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Get the card set id
        const shortname = 'M19';
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
