import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1721331291257 implements MigrationInterface {
    name = 'CreatePostTable1721331291257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`post\``);
    }

}
