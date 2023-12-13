import { MigrationInterface, QueryRunner } from 'typeorm';

export class Token1702462911853 implements MigrationInterface {
  name = 'Token1702462911853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" text`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_03585d421deb10bbc326fffe4c1" UNIQUE ("refreshToken")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_03585d421deb10bbc326fffe4c1"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
