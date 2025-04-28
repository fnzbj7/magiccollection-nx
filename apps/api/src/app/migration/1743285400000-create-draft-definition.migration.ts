import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDraftDefinition1743285400000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`draft_definition\` (
            \`id\` int(11) NOT NULL AUTO_INCREMENT,
            \`name\` varchar(255) NOT NULL,
            \`draftDate\` timestamp NOT NULL,
            \`setCode\` varchar(255) NOT NULL,
            \`cardsPerPack\` int(11) NOT NULL,
            \`playerPicks\` json DEFAULT NULL,
            PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`draft_definition\``);
    }
}
