import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLorasTable1754784000007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng loras
    await queryRunner.query(`
      CREATE TABLE "loras" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT NULL,
        "size" DECIMAL(10,2) NOT NULL,
        "path" TEXT NOT NULL,
        "link" VARCHAR(255) NOT NULL,
        "status" VARCHAR(10) NOT NULL DEFAULT 'active',
        "tag_id" INT NULL,
        "model_id" INT NOT NULL,
        "user_id" INT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_loras_model_id" FOREIGN KEY ("model_id") REFERENCES "models" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_loras_tag_id" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_loras_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
      )
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "loras"`);
  }
}
