import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateDraftPicksToStructuredFormat1765385939000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Get all draft definitions
        const drafts = await queryRunner.query(`SELECT * FROM \`draft_definition\``);

        for (const draft of drafts) {
            if (!draft.playerPicks) {
                continue;
            }

            try {
                const playerPicks = JSON.parse(draft.playerPicks);
                let hasChanges = false;

                // Process each player's picks
                for (const playerPick of playerPicks) {
                    if (!playerPick.rounds) {
                        continue;
                    }

                    // Process each round
                    for (const round of playerPick.rounds) {
                        // Check if already in new format
                        if (round.picks && Array.isArray(round.picks)) {
                            continue; // Already migrated
                        }

                        // Convert old format (cards string) to new format (picks array)
                        if (round.cards && typeof round.cards === 'string') {
                            const cardsString = round.cards.trim();
                            if (cardsString === '') {
                                // Empty round - create empty picks array
                                round.picks = [];
                                delete round.cards;
                                hasChanges = true;
                                continue;
                            }

                            // Determine separator (space or newline)
                            const separator = cardsString.includes('\n') ? '\n' : ' ';
                            const cardNumbers = cardsString
                                .split(separator)
                                .map(c => c.trim())
                                .filter(c => c !== '');

                            // Convert to new format
                            round.picks = cardNumbers.map(cardNumber => ({
                                cardNumber: cardNumber,
                                setCode: draft.setCode, // Use draft's primary setCode
                            }));

                            // Remove old cards property
                            delete round.cards;
                            hasChanges = true;
                        }
                    }
                }

                // Update the draft if changes were made
                if (hasChanges) {
                    await queryRunner.query(
                        `UPDATE \`draft_definition\` SET \`playerPicks\` = ? WHERE \`id\` = ?`,
                        [JSON.stringify(playerPicks), draft.id],
                    );
                }
            } catch (error) {
                console.error(`Error migrating draft ${draft.id}:`, error);
                // Continue with next draft even if one fails
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Get all draft definitions
        const drafts = await queryRunner.query(`SELECT * FROM \`draft_definition\``);

        for (const draft of drafts) {
            if (!draft.playerPicks) {
                continue;
            }

            try {
                const playerPicks = JSON.parse(draft.playerPicks);
                let hasChanges = false;

                // Process each player's picks
                for (const playerPick of playerPicks) {
                    if (!playerPick.rounds) {
                        continue;
                    }

                    // Process each round
                    for (const round of playerPick.rounds) {
                        // Check if in new format
                        if (round.picks && Array.isArray(round.picks)) {
                            // Convert back to old format
                            const cardNumbers = round.picks
                                .map((pick: any) => pick.cardNumber)
                                .filter((num: string) => num && num.trim() !== '');
                            round.cards = cardNumbers.join(' ');
                            delete round.picks;
                            hasChanges = true;
                        }
                    }
                }

                // Update the draft if changes were made
                if (hasChanges) {
                    await queryRunner.query(
                        `UPDATE \`draft_definition\` SET \`playerPicks\` = ? WHERE \`id\` = ?`,
                        [JSON.stringify(playerPicks), draft.id],
                    );
                }
            } catch (error) {
                console.error(`Error reverting draft ${draft.id}:`, error);
                // Continue with next draft even if one fails
            }
        }
    }
}
