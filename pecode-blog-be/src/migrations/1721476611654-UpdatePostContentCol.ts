import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostContentCol1721476611654 implements MigrationInterface {
    name = 'UpdatePostContentCol1721476611654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`content\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`content\` varchar(255) NOT NULL`);
    }

}
