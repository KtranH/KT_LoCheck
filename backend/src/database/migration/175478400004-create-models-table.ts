import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelsTable1754784000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng models
    await queryRunner.query(`
      CREATE TABLE "models" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT NULL,
        "status" VARCHAR(10) NOT NULL DEFAULT 'active',
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "models"`);
  }
}
