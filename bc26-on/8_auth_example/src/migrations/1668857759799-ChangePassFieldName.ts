import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePassFieldName1668857759799 implements MigrationInterface {
  name = "ChangePassFieldName1668857759799";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "password" TO "passwordHash"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "passwordHash" TO "password"`
    );
  }
}
