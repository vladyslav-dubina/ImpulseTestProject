import { MigrationInterface, QueryRunner } from "typeorm";

export class User1702465469845 implements MigrationInterface {
    name = 'User1702465469845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e2e02f59d9d115d5c6af3739eb5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e2e02f59d9d115d5c6af3739eb5" UNIQUE ("salt")`);
    }

}
