import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1702402153576 implements MigrationInterface {
  name = 'User1702402153576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_641d432e5d2679dfc40413a9254"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phome"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "secondName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "salt" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e2e02f59d9d115d5c6af3739eb5" UNIQUE ("salt")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "hash" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e282acb94d2e3aec10f480e4f66" UNIQUE ("hash")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e282acb94d2e3aec10f480e4f66"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hash"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e2e02f59d9d115d5c6af3739eb5"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "secondName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phome" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_641d432e5d2679dfc40413a9254" UNIQUE ("phome")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying NOT NULL`,
    );
  }
}
