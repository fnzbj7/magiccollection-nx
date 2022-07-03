import { CardSet } from "../card/entity/card-set.entity";
import { InsertResult, MigrationInterface, QueryRunner } from "typeorm";

export class addingSoi1620387315622 implements MigrationInterface {
    name = 'addingSoi1620387315622';

    public async up(queryRunner: QueryRunner): Promise<void> {

        const insertResult: InsertResult = await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('card_set')
            .values({ name: 'Shadows over Innistrad', shortName: 'SOI' })
            .execute();
        const cardSetId: number = insertResult.identifiers[0].id;

        await queryRunner.manager.createQueryBuilder().insert().into('card', [`cardNumber`, `name`, `rarity`, `layout`, `cardSet`]).values([
            { cardNumber: 1, cardSet: cardSetId, name: 'Always Watching', rarity: 'R', layout: 'normal' },
            { cardNumber: 2, cardSet: cardSetId, name: 'Angel of Deliverance', rarity: 'R', layout: 'normal' },
            { cardNumber: 3, cardSet: cardSetId, name: 'Angelic Purge', rarity: 'C', layout: 'normal' },
            { cardNumber: 4, cardSet: cardSetId, name: 'Apothecary Geist', rarity: 'C', layout: 'normal' },
            { cardNumber: 5, cardSet: cardSetId, name: 'Archangel Avacyn', rarity: 'M', layout: 'transform' },
            { cardNumber: 6, cardSet: cardSetId, name: 'Avacynian Missionaries', rarity: 'U', layout: 'transform' },
            { cardNumber: 7, cardSet: cardSetId, name: 'Bound by Moonsilver', rarity: 'U', layout: 'normal' },
            { cardNumber: 8, cardSet: cardSetId, name: 'Bygone Bishop', rarity: 'R', layout: 'normal' },
            { cardNumber: 9, cardSet: cardSetId, name: 'Cathar\'s Companion', rarity: 'C', layout: 'normal' },
            { cardNumber: 10, cardSet: cardSetId, name: 'Chaplain\'s Blessing', rarity: 'C', layout: 'normal' },
            { cardNumber: 11, cardSet: cardSetId, name: 'Dauntless Cathar', rarity: 'C', layout: 'normal' },
            { cardNumber: 12, cardSet: cardSetId, name: 'Declaration in Stone', rarity: 'R', layout: 'normal' },
            { cardNumber: 13, cardSet: cardSetId, name: 'Descend upon the Sinful', rarity: 'M', layout: 'normal' },
            { cardNumber: 14, cardSet: cardSetId, name: 'Devilthorn Fox', rarity: 'C', layout: 'normal' },
            { cardNumber: 15, cardSet: cardSetId, name: 'Drogskol Cavalry', rarity: 'R', layout: 'normal' },
            { cardNumber: 16, cardSet: cardSetId, name: 'Eerie Interlude', rarity: 'R', layout: 'normal' },
            { cardNumber: 17, cardSet: cardSetId, name: 'Emissary of the Sleepless', rarity: 'C', layout: 'normal' },
            { cardNumber: 18, cardSet: cardSetId, name: 'Ethereal Guidance', rarity: 'C', layout: 'normal' },
            { cardNumber: 19, cardSet: cardSetId, name: 'Expose Evil', rarity: 'C', layout: 'normal' },
            { cardNumber: 20, cardSet: cardSetId, name: 'Gryff\'s Boon', rarity: 'U', layout: 'normal' },
            { cardNumber: 21, cardSet: cardSetId, name: 'Hanweir Militia Captain', rarity: 'R', layout: 'transform' },
            { cardNumber: 22, cardSet: cardSetId, name: 'Hope Against Hope', rarity: 'U', layout: 'normal' },
            { cardNumber: 23, cardSet: cardSetId, name: 'Humble the Brute', rarity: 'U', layout: 'normal' },
            { cardNumber: 24, cardSet: cardSetId, name: 'Inquisitor\'s Ox', rarity: 'C', layout: 'normal' },
            { cardNumber: 25, cardSet: cardSetId, name: 'Inspiring Captain', rarity: 'C', layout: 'normal' },
            { cardNumber: 26, cardSet: cardSetId, name: 'Militant Inquisitor', rarity: 'C', layout: 'normal' },
            { cardNumber: 27, cardSet: cardSetId, name: 'Moorland Drifter', rarity: 'C', layout: 'normal' },
            { cardNumber: 28, cardSet: cardSetId, name: 'Nahiri\'s Machinations', rarity: 'U', layout: 'normal' },
            { cardNumber: 29, cardSet: cardSetId, name: 'Nearheath Chaplain', rarity: 'U', layout: 'normal' },
            { cardNumber: 30, cardSet: cardSetId, name: 'Not Forgotten', rarity: 'U', layout: 'normal' },
            { cardNumber: 31, cardSet: cardSetId, name: 'Odric, Lunarch Marshal', rarity: 'R', layout: 'normal' },
            { cardNumber: 32, cardSet: cardSetId, name: 'Open the Armory', rarity: 'U', layout: 'normal' },
            { cardNumber: 33, cardSet: cardSetId, name: 'Paranoid Parish-Blade', rarity: 'U', layout: 'normal' },
            { cardNumber: 34, cardSet: cardSetId, name: 'Pious Evangel', rarity: 'U', layout: 'transform' },
            { cardNumber: 35, cardSet: cardSetId, name: 'Puncturing Light', rarity: 'C', layout: 'normal' },
            { cardNumber: 36, cardSet: cardSetId, name: 'Reaper of Flight Moonsilver', rarity: 'U', layout: 'normal' },
            { cardNumber: 37, cardSet: cardSetId, name: 'Silverstrike', rarity: 'U', layout: 'normal' },
            { cardNumber: 38, cardSet: cardSetId, name: 'Spectral Shepherd', rarity: 'U', layout: 'normal' },
            { cardNumber: 39, cardSet: cardSetId, name: 'Stern Constable', rarity: 'C', layout: 'normal' },
            { cardNumber: 40, cardSet: cardSetId, name: 'Strength of Arms', rarity: 'C', layout: 'normal' },
            { cardNumber: 41, cardSet: cardSetId, name: 'Survive the Night', rarity: 'C', layout: 'normal' },
            { cardNumber: 42, cardSet: cardSetId, name: 'Tenacity', rarity: 'U', layout: 'normal' },
            { cardNumber: 43, cardSet: cardSetId, name: 'Thalia\'s Lieutenant', rarity: 'R', layout: 'normal' },
            { cardNumber: 44, cardSet: cardSetId, name: 'Thraben Inspector', rarity: 'C', layout: 'normal' },
            { cardNumber: 45, cardSet: cardSetId, name: 'Topplegeist', rarity: 'U', layout: 'normal' },
            { cardNumber: 46, cardSet: cardSetId, name: 'Town Gossipmonger', rarity: 'U', layout: 'transform' },
            { cardNumber: 47, cardSet: cardSetId, name: 'Unruly Mob', rarity: 'C', layout: 'normal' },
            { cardNumber: 48, cardSet: cardSetId, name: 'Vessel of Ephemera', rarity: 'C', layout: 'normal' },
            { cardNumber: 49, cardSet: cardSetId, name: 'Aberrant Researcher', rarity: 'U', layout: 'transform' },
            { cardNumber: 50, cardSet: cardSetId, name: 'Broken Concentration', rarity: 'U', layout: 'normal' },
            { cardNumber: 51, cardSet: cardSetId, name: 'Catalog', rarity: 'C', layout: 'normal' },
            { cardNumber: 52, cardSet: cardSetId, name: 'Compelling Deterrence', rarity: 'U', layout: 'normal' },
            { cardNumber: 53, cardSet: cardSetId, name: 'Confirm Suspicions', rarity: 'R', layout: 'normal' },
            { cardNumber: 54, cardSet: cardSetId, name: 'Daring Sleuth', rarity: 'U', layout: 'transform' },
            { cardNumber: 55, cardSet: cardSetId, name: 'Deny Existence', rarity: 'C', layout: 'normal' },
            { cardNumber: 56, cardSet: cardSetId, name: 'Drownyard Explorers', rarity: 'C', layout: 'normal' },
            { cardNumber: 57, cardSet: cardSetId, name: 'Drunau Corpse Trawler', rarity: 'U', layout: 'normal' },
            { cardNumber: 58, cardSet: cardSetId, name: 'Engulf the Shore', rarity: 'R', layout: 'normal' },
            { cardNumber: 59, cardSet: cardSetId, name: 'Epiphany at the Drownyard', rarity: 'R', layout: 'normal' },
            { cardNumber: 60, cardSet: cardSetId, name: 'Erdwal Illuminator', rarity: 'U', layout: 'normal' },
            { cardNumber: 61, cardSet: cardSetId, name: 'Essence Flux', rarity: 'U', layout: 'normal' },
            { cardNumber: 62, cardSet: cardSetId, name: 'Fleeting Memories', rarity: 'U', layout: 'normal' },
            { cardNumber: 63, cardSet: cardSetId, name: 'Forgotten Creation', rarity: 'R', layout: 'normal' },
            { cardNumber: 64, cardSet: cardSetId, name: 'Furtive Homunculus', rarity: 'C', layout: 'normal' },
            { cardNumber: 65, cardSet: cardSetId, name: 'Geralf\'s Masterpiece', rarity: 'M', layout: 'normal' },
            { cardNumber: 66, cardSet: cardSetId, name: 'Ghostly Wings', rarity: 'C', layout: 'normal' },
            { cardNumber: 67, cardSet: cardSetId, name: 'Gone Missing', rarity: 'C', layout: 'normal' },
            { cardNumber: 68, cardSet: cardSetId, name: 'Invasive Surgery', rarity: 'U', layout: 'normal' },
            { cardNumber: 69, cardSet: cardSetId, name: 'Jace, Unraveler of Secrets', rarity: 'M', layout: 'normal' },
            { cardNumber: 70, cardSet: cardSetId, name: 'Jace\'s Scrutiny', rarity: 'C', layout: 'normal' },
            { cardNumber: 71, cardSet: cardSetId, name: 'Just the Wind', rarity: 'C', layout: 'normal' },
            { cardNumber: 72, cardSet: cardSetId, name: 'Lamplighter of Selhoff', rarity: 'C', layout: 'normal' },
            { cardNumber: 73, cardSet: cardSetId, name: 'Manic Scribe', rarity: 'U', layout: 'normal' },
            { cardNumber: 74, cardSet: cardSetId, name: 'Nagging Thoughts', rarity: 'C', layout: 'normal' },
            { cardNumber: 75, cardSet: cardSetId, name: 'Nephalia Moondrakes', rarity: 'R', layout: 'normal' },
            { cardNumber: 76, cardSet: cardSetId, name: 'Niblis of Dusk', rarity: 'C', layout: 'normal' },
            { cardNumber: 77, cardSet: cardSetId, name: 'Ongoing Investigation', rarity: 'U', layout: 'normal' },
            { cardNumber: 78, cardSet: cardSetId, name: 'Pieces of the Puzzle', rarity: 'C', layout: 'normal' },
            { cardNumber: 79, cardSet: cardSetId, name: 'Pore Over the Pages', rarity: 'U', layout: 'normal' },
            { cardNumber: 80, cardSet: cardSetId, name: 'Press for Answers', rarity: 'C', layout: 'normal' },
            { cardNumber: 81, cardSet: cardSetId, name: 'Rattlechains', rarity: 'R', layout: 'normal' },
            { cardNumber: 82, cardSet: cardSetId, name: 'Reckless Scholar', rarity: 'U', layout: 'normal' },
            { cardNumber: 83, cardSet: cardSetId, name: 'Rise from the Tides', rarity: 'U', layout: 'normal' },
            { cardNumber: 84, cardSet: cardSetId, name: 'Seagraf Skaab', rarity: 'C', layout: 'normal' },
            { cardNumber: 85, cardSet: cardSetId, name: 'Silburlind Snapper', rarity: 'C', layout: 'normal' },
            { cardNumber: 86, cardSet: cardSetId, name: 'Silent Observer', rarity: 'C', layout: 'normal' },
            { cardNumber: 87, cardSet: cardSetId, name: 'Sleep Paralysis', rarity: 'C', layout: 'normal' },
            { cardNumber: 88, cardSet: cardSetId, name: 'Startled Awake', rarity: 'M', layout: 'transform' },
            { cardNumber: 89, cardSet: cardSetId, name: 'Stitched Mangler', rarity: 'C', layout: 'normal' },
            { cardNumber: 90, cardSet: cardSetId, name: 'Stitchwing Skaab', rarity: 'U', layout: 'normal' },
            { cardNumber: 91, cardSet: cardSetId, name: 'Stormrider Spirit', rarity: 'C', layout: 'normal' },
            { cardNumber: 92, cardSet: cardSetId, name: 'Thing in the Ice', rarity: 'R', layout: 'transform' },
            { cardNumber: 93, cardSet: cardSetId, name: 'Trail of Evidence', rarity: 'U', layout: 'normal' },
            { cardNumber: 94, cardSet: cardSetId, name: 'Uninvited Geist', rarity: 'U', layout: 'transform' },
            { cardNumber: 95, cardSet: cardSetId, name: 'Vessel of Paramnesia', rarity: 'C', layout: 'normal' },
            { cardNumber: 96, cardSet: cardSetId, name: 'Welcome to the Fold', rarity: 'R', layout: 'normal' },
            { cardNumber: 97, cardSet: cardSetId, name: 'Accursed Witch', rarity: 'U', layout: 'transform' },
            { cardNumber: 98, cardSet: cardSetId, name: 'Alms of the Vein', rarity: 'C', layout: 'normal' },
            { cardNumber: 99, cardSet: cardSetId, name: 'Asylum Visitor', rarity: 'R', layout: 'normal' },
            { cardNumber: 100, cardSet: cardSetId, name: 'Behind the Scenes', rarity: 'U', layout: 'normal' },
            { cardNumber: 101, cardSet: cardSetId, name: 'Behold the Beyond', rarity: 'M', layout: 'normal' },
            { cardNumber: 102, cardSet: cardSetId, name: 'Biting Rain', rarity: 'U', layout: 'normal' },
            { cardNumber: 103, cardSet: cardSetId, name: 'Call the Bloodline', rarity: 'U', layout: 'normal' },
            { cardNumber: 104, cardSet: cardSetId, name: 'Creeping Dread', rarity: 'U', layout: 'normal' },
            { cardNumber: 105, cardSet: cardSetId, name: 'Crow of Dark Tidings', rarity: 'C', layout: 'normal' },
            { cardNumber: 106, cardSet: cardSetId, name: 'Dead Weight', rarity: 'C', layout: 'normal' },
            { cardNumber: 107, cardSet: cardSetId, name: 'Diregraf Colossus', rarity: 'R', layout: 'normal' },
            { cardNumber: 108, cardSet: cardSetId, name: 'Elusive Tormentor', rarity: 'R', layout: 'transform' },
            { cardNumber: 109, cardSet: cardSetId, name: 'Ever After', rarity: 'R', layout: 'normal' },
            { cardNumber: 110, cardSet: cardSetId, name: 'Farbog Revenant', rarity: 'C', layout: 'normal' },
            { cardNumber: 111, cardSet: cardSetId, name: 'From Under the Floorboards', rarity: 'R', layout: 'normal' },
            { cardNumber: 112, cardSet: cardSetId, name: 'Ghoulcaller\'s Accomplice', rarity: 'C', layout: 'normal' },
            { cardNumber: 113, cardSet: cardSetId, name: 'Ghoulsteed', rarity: 'U', layout: 'normal' },
            { cardNumber: 114, cardSet: cardSetId, name: 'Gisa\'s Bidding', rarity: 'U', layout: 'normal' },
            { cardNumber: 115, cardSet: cardSetId, name: 'Grotesque Mutation', rarity: 'C', layout: 'normal' },
            { cardNumber: 116, cardSet: cardSetId, name: 'Heir of Falkenrath', rarity: 'U', layout: 'transform' },
            { cardNumber: 117, cardSet: cardSetId, name: 'Hound of the Farbogs', rarity: 'C', layout: 'normal' },
            { cardNumber: 118, cardSet: cardSetId, name: 'Indulgent Aristocrat', rarity: 'U', layout: 'normal' },
            { cardNumber: 119, cardSet: cardSetId, name: 'Kindly Stranger', rarity: 'U', layout: 'transform' },
            { cardNumber: 120, cardSet: cardSetId, name: 'Liliana\'s Indignation', rarity: 'U', layout: 'normal' },
            { cardNumber: 121, cardSet: cardSetId, name: 'Macabre Waltz', rarity: 'C', layout: 'normal' },
            { cardNumber: 122, cardSet: cardSetId, name: 'Markov Dreadknight', rarity: 'R', layout: 'normal' },
            { cardNumber: 123, cardSet: cardSetId, name: 'Merciless Resolve', rarity: 'C', layout: 'normal' },
            { cardNumber: 124, cardSet: cardSetId, name: 'Mindwrack Demon', rarity: 'M', layout: 'normal' },
            { cardNumber: 125, cardSet: cardSetId, name: 'Morkrut Necropod', rarity: 'U', layout: 'normal' },
            { cardNumber: 126, cardSet: cardSetId, name: 'Murderous Compulsion', rarity: 'C', layout: 'normal' },
            { cardNumber: 127, cardSet: cardSetId, name: 'Olivia\'s Bloodsworn', rarity: 'U', layout: 'normal' },
            { cardNumber: 128, cardSet: cardSetId, name: 'Pale Rider of Trostad', rarity: 'U', layout: 'normal' },
            { cardNumber: 129, cardSet: cardSetId, name: 'Pick the Brain', rarity: 'U', layout: 'normal' },
            { cardNumber: 130, cardSet: cardSetId, name: 'Rancid Rats', rarity: 'C', layout: 'normal' },
            { cardNumber: 131, cardSet: cardSetId, name: 'Relentless Dead', rarity: 'M', layout: 'normal' },
            { cardNumber: 132, cardSet: cardSetId, name: 'Rottenheart Ghoul', rarity: 'C', layout: 'normal' },
            { cardNumber: 133, cardSet: cardSetId, name: 'Sanitarium Skeleton', rarity: 'C', layout: 'normal' },
            { cardNumber: 134, cardSet: cardSetId, name: 'Shamble Back', rarity: 'C', layout: 'normal' },
            { cardNumber: 135, cardSet: cardSetId, name: 'Sinister Concoction', rarity: 'U', layout: 'normal' },
            { cardNumber: 136, cardSet: cardSetId, name: 'Stallion of Ashmouth', rarity: 'C', layout: 'normal' },
            { cardNumber: 137, cardSet: cardSetId, name: 'Stromkirk Mentor', rarity: 'C', layout: 'normal' },
            { cardNumber: 138, cardSet: cardSetId, name: 'Throttle', rarity: 'C', layout: 'normal' },
            { cardNumber: 139, cardSet: cardSetId, name: 'To the Slaughter', rarity: 'R', layout: 'normal' },
            { cardNumber: 140, cardSet: cardSetId, name: 'Tooth Collector', rarity: 'U', layout: 'normal' },
            { cardNumber: 141, cardSet: cardSetId, name: 'Triskaidekaphobia', rarity: 'R', layout: 'normal' },
            { cardNumber: 142, cardSet: cardSetId, name: 'Twins of Maurer Estate', rarity: 'C', layout: 'normal' },
            { cardNumber: 143, cardSet: cardSetId, name: 'Vampire Noble', rarity: 'C', layout: 'normal' },
            { cardNumber: 144, cardSet: cardSetId, name: 'Vessel of Malignity', rarity: 'C', layout: 'normal' },
            { cardNumber: 145, cardSet: cardSetId, name: 'Avacyn\'s Judgment', rarity: 'R', layout: 'normal' },
            { cardNumber: 146, cardSet: cardSetId, name: 'Bloodmad Vampire', rarity: 'C', layout: 'normal' },
            { cardNumber: 147, cardSet: cardSetId, name: 'Breakneck Rider', rarity: 'U', layout: 'transform' },
            { cardNumber: 148, cardSet: cardSetId, name: 'Burn from Within', rarity: 'R', layout: 'normal' },
            { cardNumber: 149, cardSet: cardSetId, name: 'Convicted Killer', rarity: 'C', layout: 'transform' },
            { cardNumber: 150, cardSet: cardSetId, name: 'Dance with Devils', rarity: 'U', layout: 'normal' },
            { cardNumber: 151, cardSet: cardSetId, name: 'Devils\' Playground', rarity: 'R', layout: 'normal' },
            { cardNumber: 152, cardSet: cardSetId, name: 'Dissension in the Ranks', rarity: 'U', layout: 'normal' },
            { cardNumber: 153, cardSet: cardSetId, name: 'Dual Shot', rarity: 'C', layout: 'normal' },
            { cardNumber: 154, cardSet: cardSetId, name: 'Ember-Eye Wolf', rarity: 'C', layout: 'normal' },
            { cardNumber: 155, cardSet: cardSetId, name: 'Falkenrath Gorger', rarity: 'R', layout: 'normal' },
            { cardNumber: 156, cardSet: cardSetId, name: 'Fiery Temper', rarity: 'C', layout: 'normal' },
            { cardNumber: 157, cardSet: cardSetId, name: 'Flameblade Angel', rarity: 'R', layout: 'normal' },
            { cardNumber: 158, cardSet: cardSetId, name: 'Gatstaf Arsonists', rarity: 'C', layout: 'transform' },
            { cardNumber: 159, cardSet: cardSetId, name: 'Geier Reach Bandit', rarity: 'R', layout: 'transform' },
            { cardNumber: 160, cardSet: cardSetId, name: 'Geistblast', rarity: 'U', layout: 'normal' },
            { cardNumber: 161, cardSet: cardSetId, name: 'Gibbering Fiend', rarity: 'U', layout: 'normal' },
            { cardNumber: 162, cardSet: cardSetId, name: 'Goldnight Castigator', rarity: 'M', layout: 'normal' },
            { cardNumber: 163, cardSet: cardSetId, name: 'Harness the Storm', rarity: 'R', layout: 'normal' },
            { cardNumber: 164, cardSet: cardSetId, name: 'Howlpack Wolf', rarity: 'C', layout: 'normal' },
            { cardNumber: 165, cardSet: cardSetId, name: 'Hulking Devil', rarity: 'C', layout: 'normal' },
            { cardNumber: 166, cardSet: cardSetId, name: 'Incorrigible Youths', rarity: 'U', layout: 'normal' },
            { cardNumber: 167, cardSet: cardSetId, name: 'Inner Struggle', rarity: 'U', layout: 'normal' },
            { cardNumber: 168, cardSet: cardSetId, name: 'Insolent Neonate', rarity: 'C', layout: 'normal' },
            { cardNumber: 169, cardSet: cardSetId, name: 'Kessig Forgemaster', rarity: 'U', layout: 'transform' },
            { cardNumber: 170, cardSet: cardSetId, name: 'Lightning Axe', rarity: 'U', layout: 'normal' },
            { cardNumber: 171, cardSet: cardSetId, name: 'Mad Prophet', rarity: 'U', layout: 'normal' },
            { cardNumber: 172, cardSet: cardSetId, name: 'Magmatic Chasm', rarity: 'C', layout: 'normal' },
            { cardNumber: 173, cardSet: cardSetId, name: 'Malevolent Whispers', rarity: 'U', layout: 'normal' },
            { cardNumber: 174, cardSet: cardSetId, name: 'Pyre Hound', rarity: 'C', layout: 'normal' },
            { cardNumber: 175, cardSet: cardSetId, name: 'Ravenous Bloodseeker', rarity: 'U', layout: 'normal' },
            { cardNumber: 176, cardSet: cardSetId, name: 'Reduce to Ashes', rarity: 'C', layout: 'normal' },
            { cardNumber: 177, cardSet: cardSetId, name: 'Rush of Adrenaline', rarity: 'C', layout: 'normal' },
            { cardNumber: 178, cardSet: cardSetId, name: 'Sanguinary Mage', rarity: 'C', layout: 'normal' },
            { cardNumber: 179, cardSet: cardSetId, name: 'Scourge Wolf', rarity: 'R', layout: 'normal' },
            { cardNumber: 180, cardSet: cardSetId, name: 'Senseless Rage', rarity: 'C', layout: 'normal' },
            { cardNumber: 181, cardSet: cardSetId, name: 'Sin Prodder', rarity: 'R', layout: 'normal' },
            { cardNumber: 182, cardSet: cardSetId, name: 'Skin Invasion', rarity: 'U', layout: 'transform' },
            { cardNumber: 183, cardSet: cardSetId, name: 'Spiteful Motives', rarity: 'U', layout: 'normal' },
            { cardNumber: 184, cardSet: cardSetId, name: 'Stensia Masquerade', rarity: 'U', layout: 'normal' },
            { cardNumber: 185, cardSet: cardSetId, name: 'Structural Distortion', rarity: 'C', layout: 'normal' },
            { cardNumber: 186, cardSet: cardSetId, name: 'Tormenting Voice', rarity: 'C', layout: 'normal' },
            { cardNumber: 187, cardSet: cardSetId, name: 'Ulrich\'s Kindred', rarity: 'U', layout: 'normal' },
            { cardNumber: 188, cardSet: cardSetId, name: 'Uncaged Fury', rarity: 'C', layout: 'normal' },
            { cardNumber: 189, cardSet: cardSetId, name: 'Vessel of Volatility', rarity: 'C', layout: 'normal' },
            { cardNumber: 190, cardSet: cardSetId, name: 'Village Messenger', rarity: 'U', layout: 'transform' },
            { cardNumber: 191, cardSet: cardSetId, name: 'Voldaren Duelist', rarity: 'C', layout: 'normal' },
            { cardNumber: 192, cardSet: cardSetId, name: 'Wolf of Devil\'s Breach', rarity: 'M', layout: 'normal' },
            { cardNumber: 193, cardSet: cardSetId, name: 'Aim High', rarity: 'C', layout: 'normal' },
            { cardNumber: 194, cardSet: cardSetId, name: 'Autumnal Gloom', rarity: 'U', layout: 'transform' },
            { cardNumber: 195, cardSet: cardSetId, name: 'Briarbridge Patrol', rarity: 'U', layout: 'normal' },
            { cardNumber: 196, cardSet: cardSetId, name: 'Byway Courier', rarity: 'C', layout: 'normal' },
            { cardNumber: 197, cardSet: cardSetId, name: 'Clip Wings', rarity: 'C', layout: 'normal' },
            { cardNumber: 198, cardSet: cardSetId, name: 'Confront the Unknown', rarity: 'C', layout: 'normal' },
            { cardNumber: 199, cardSet: cardSetId, name: 'Crawling Sensation', rarity: 'U', layout: 'normal' },
            { cardNumber: 200, cardSet: cardSetId, name: 'Cryptolith Rite', rarity: 'R', layout: 'normal' },
            { cardNumber: 201, cardSet: cardSetId, name: 'Cult of the Waxing Moon', rarity: 'U', layout: 'normal' },
            { cardNumber: 202, cardSet: cardSetId, name: 'Deathcap Cultivator', rarity: 'R', layout: 'normal' },
            { cardNumber: 203, cardSet: cardSetId, name: 'Duskwatch Recruiter', rarity: 'U', layout: 'transform' },
            { cardNumber: 204, cardSet: cardSetId, name: 'Equestrian Skill', rarity: 'C', layout: 'normal' },
            { cardNumber: 205, cardSet: cardSetId, name: 'Fork in the Road', rarity: 'C', layout: 'normal' },
            { cardNumber: 206, cardSet: cardSetId, name: 'Gloomwidow', rarity: 'U', layout: 'normal' },
            { cardNumber: 207, cardSet: cardSetId, name: 'Graf Mole', rarity: 'U', layout: 'normal' },
            { cardNumber: 208, cardSet: cardSetId, name: 'Groundskeeper', rarity: 'U', layout: 'normal' },
            { cardNumber: 209, cardSet: cardSetId, name: 'Hermit of the Natterknolls', rarity: 'U', layout: 'transform' },
            { cardNumber: 210, cardSet: cardSetId, name: 'Hinterland Logger', rarity: 'C', layout: 'transform' },
            { cardNumber: 211, cardSet: cardSetId, name: 'Howlpack Resurgence', rarity: 'U', layout: 'normal' },
            { cardNumber: 212, cardSet: cardSetId, name: 'Inexorable Blob', rarity: 'R', layout: 'normal' },
            { cardNumber: 213, cardSet: cardSetId, name: 'Intrepid Provisioner', rarity: 'C', layout: 'normal' },
            { cardNumber: 214, cardSet: cardSetId, name: 'Kessig Dire Swine', rarity: 'C', layout: 'normal' },
            { cardNumber: 215, cardSet: cardSetId, name: 'Lambholt Pacifist', rarity: 'U', layout: 'transform' },
            { cardNumber: 216, cardSet: cardSetId, name: 'Loam Dryad', rarity: 'C', layout: 'normal' },
            { cardNumber: 217, cardSet: cardSetId, name: 'Might Beyond Reason', rarity: 'C', layout: 'normal' },
            { cardNumber: 218, cardSet: cardSetId, name: 'Moldgraf Scavenger', rarity: 'C', layout: 'normal' },
            { cardNumber: 219, cardSet: cardSetId, name: 'Moonlight Hunt', rarity: 'U', layout: 'normal' },
            { cardNumber: 220, cardSet: cardSetId, name: 'Obsessive Skinner', rarity: 'U', layout: 'normal' },
            { cardNumber: 221, cardSet: cardSetId, name: 'Pack Guardian', rarity: 'U', layout: 'normal' },
            { cardNumber: 222, cardSet: cardSetId, name: 'Quilled Wolf', rarity: 'C', layout: 'normal' },
            { cardNumber: 223, cardSet: cardSetId, name: 'Rabid Bite', rarity: 'C', layout: 'normal' },
            { cardNumber: 224, cardSet: cardSetId, name: 'Root Out', rarity: 'C', layout: 'normal' },
            { cardNumber: 225, cardSet: cardSetId, name: 'Sage of Ancient Lore', rarity: 'R', layout: 'transform' },
            { cardNumber: 226, cardSet: cardSetId, name: 'Seasons Past', rarity: 'M', layout: 'normal' },
            { cardNumber: 227, cardSet: cardSetId, name: 'Second Harvest', rarity: 'R', layout: 'normal' },
            { cardNumber: 228, cardSet: cardSetId, name: 'Silverfur Partisan', rarity: 'R', layout: 'normal' },
            { cardNumber: 229, cardSet: cardSetId, name: 'Solitary Hunter', rarity: 'C', layout: 'transform' },
            { cardNumber: 230, cardSet: cardSetId, name: 'Soul Swallower', rarity: 'R', layout: 'normal' },
            { cardNumber: 231, cardSet: cardSetId, name: 'Stoic Builder', rarity: 'C', layout: 'normal' },
            { cardNumber: 232, cardSet: cardSetId, name: 'Thornhide Wolves', rarity: 'C', layout: 'normal' },
            { cardNumber: 233, cardSet: cardSetId, name: 'Tireless Tracker', rarity: 'R', layout: 'normal' },
            { cardNumber: 234, cardSet: cardSetId, name: 'Traverse the Ulvenwald', rarity: 'R', layout: 'normal' },
            { cardNumber: 235, cardSet: cardSetId, name: 'Ulvenwald Hydra', rarity: 'M', layout: 'normal' },
            { cardNumber: 236, cardSet: cardSetId, name: 'Ulvenwald Mysteries', rarity: 'U', layout: 'normal' },
            { cardNumber: 237, cardSet: cardSetId, name: 'Vessel of Nascency', rarity: 'C', layout: 'normal' },
            { cardNumber: 238, cardSet: cardSetId, name: 'Veteran Cathar', rarity: 'U', layout: 'normal' },
            { cardNumber: 239, cardSet: cardSetId, name: 'Watcher in the Web', rarity: 'C', layout: 'normal' },
            { cardNumber: 240, cardSet: cardSetId, name: 'Weirding Wood', rarity: 'U', layout: 'normal' },
            { cardNumber: 241, cardSet: cardSetId, name: 'Altered Ego', rarity: 'R', layout: 'normal' },
            { cardNumber: 242, cardSet: cardSetId, name: 'Anguished Unmaking', rarity: 'R', layout: 'normal' },
            { cardNumber: 243, cardSet: cardSetId, name: 'Arlinn Kord', rarity: 'M', layout: 'transform' },
            { cardNumber: 244, cardSet: cardSetId, name: 'Fevered Visions', rarity: 'R', layout: 'normal' },
            { cardNumber: 245, cardSet: cardSetId, name: 'The Gitrog Monster', rarity: 'M', layout: 'normal' },
            { cardNumber: 246, cardSet: cardSetId, name: 'Invocation of Saint Traft', rarity: 'R', layout: 'normal' },
            { cardNumber: 247, cardSet: cardSetId, name: 'Nahiri, the Harbinger', rarity: 'M', layout: 'normal' },
            { cardNumber: 248, cardSet: cardSetId, name: 'Olivia, Mobilized for War', rarity: 'M', layout: 'normal' },
            { cardNumber: 249, cardSet: cardSetId, name: 'Prized Amalgam', rarity: 'R', layout: 'normal' },
            { cardNumber: 250, cardSet: cardSetId, name: 'Sigarda, Heron\'s Grace', rarity: 'M', layout: 'normal' },
            { cardNumber: 251, cardSet: cardSetId, name: 'Sorin, Grim Nemesis', rarity: 'M', layout: 'normal' },
            { cardNumber: 252, cardSet: cardSetId, name: 'Brain in a Jar', rarity: 'R', layout: 'normal' },
            { cardNumber: 253, cardSet: cardSetId, name: 'Corrupted Grafstone', rarity: 'R', layout: 'normal' },
            { cardNumber: 254, cardSet: cardSetId, name: 'Epitaph Golem', rarity: 'U', layout: 'normal' },
            { cardNumber: 255, cardSet: cardSetId, name: 'Explosive Apparatus', rarity: 'C', layout: 'normal' },
            { cardNumber: 256, cardSet: cardSetId, name: 'Harvest Hand', rarity: 'U', layout: 'transform' },
            { cardNumber: 257, cardSet: cardSetId, name: 'Haunted Cloak', rarity: 'U', layout: 'normal' },
            { cardNumber: 258, cardSet: cardSetId, name: 'Magnifying Glass', rarity: 'U', layout: 'normal' },
            { cardNumber: 259, cardSet: cardSetId, name: 'Murderer\'s Axe', rarity: 'U', layout: 'normal' },
            { cardNumber: 260, cardSet: cardSetId, name: 'Neglected Heirloom', rarity: 'U', layout: 'transform' },
            { cardNumber: 261, cardSet: cardSetId, name: 'Runaway Carriage', rarity: 'U', layout: 'normal' },
            { cardNumber: 262, cardSet: cardSetId, name: 'Shard of Broken Glass', rarity: 'C', layout: 'normal' },
            { cardNumber: 263, cardSet: cardSetId, name: 'Skeleton Key', rarity: 'U', layout: 'normal' },
            { cardNumber: 264, cardSet: cardSetId, name: 'Slayer\'s Plate', rarity: 'R', layout: 'normal' },
            { cardNumber: 265, cardSet: cardSetId, name: 'Tamiyo\'s Journal', rarity: 'R', layout: 'normal' },
            { cardNumber: 266, cardSet: cardSetId, name: 'Thraben Gargoyle', rarity: 'U', layout: 'transform' },
            { cardNumber: 267, cardSet: cardSetId, name: 'True-Faith Censer', rarity: 'C', layout: 'normal' },
            { cardNumber: 268, cardSet: cardSetId, name: 'Wicker Witch', rarity: 'C', layout: 'normal' },
            { cardNumber: 269, cardSet: cardSetId, name: 'Wild-Field Scarecrow', rarity: 'U', layout: 'normal' },
            { cardNumber: 270, cardSet: cardSetId, name: 'Choked Estuary', rarity: 'R', layout: 'normal' },
            { cardNumber: 271, cardSet: cardSetId, name: 'Drownyard Temple', rarity: 'R', layout: 'normal' },
            { cardNumber: 272, cardSet: cardSetId, name: 'Foreboding Ruins', rarity: 'R', layout: 'normal' },
            { cardNumber: 273, cardSet: cardSetId, name: 'Forsaken Sanctuary', rarity: 'U', layout: 'normal' },
            { cardNumber: 274, cardSet: cardSetId, name: 'Fortified Village', rarity: 'R', layout: 'normal' },
            { cardNumber: 275, cardSet: cardSetId, name: 'Foul Orchard', rarity: 'U', layout: 'normal' },
            { cardNumber: 276, cardSet: cardSetId, name: 'Game Trail', rarity: 'R', layout: 'normal' },
            { cardNumber: 277, cardSet: cardSetId, name: 'Highland Lake', rarity: 'U', layout: 'normal' },
            { cardNumber: 278, cardSet: cardSetId, name: 'Port Town', rarity: 'R', layout: 'normal' },
            { cardNumber: 279, cardSet: cardSetId, name: 'Stone Quarry', rarity: 'U', layout: 'normal' },
            { cardNumber: 280, cardSet: cardSetId, name: 'Warped Landscape', rarity: 'C', layout: 'normal' },
            { cardNumber: 281, cardSet: cardSetId, name: 'Westvale Abbey', rarity: 'R', layout: 'transform' },
            { cardNumber: 282, cardSet: cardSetId, name: 'Woodland Stream', rarity: 'U', layout: 'normal' },
            { cardNumber: 283, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 284, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 285, cardSet: cardSetId, name: 'Plains', rarity: 'C', layout: 'normal' },
            { cardNumber: 286, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 287, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 288, cardSet: cardSetId, name: 'Island', rarity: 'C', layout: 'normal' },
            { cardNumber: 289, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 290, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 291, cardSet: cardSetId, name: 'Swamp', rarity: 'C', layout: 'normal' },
            { cardNumber: 292, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 293, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 294, cardSet: cardSetId, name: 'Mountain', rarity: 'C', layout: 'normal' },
            { cardNumber: 295, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 296, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
            { cardNumber: 297, cardSet: cardSetId, name: 'Forest', rarity: 'C', layout: 'normal' },
        ]).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Get the card set id
        const shortname = 'SOI';
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
