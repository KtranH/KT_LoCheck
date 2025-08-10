import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCheckpointsTable1754784000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng checkpoints
    await queryRunner.query(`
      CREATE TABLE "checkpoints" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT NULL,
        "size" DECIMAL(10,2) NOT NULL,
        "link" VARCHAR(255) NOT NULL,
        "path" TEXT NOT NULL,
        "tag_id" INT NULL,
        "model_id" INT NOT NULL,
        "user_id" INT NOT NULL,
        "status" VARCHAR(10) NOT NULL DEFAULT 'active',
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_checkpoints_tag_id" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_checkpoints_model_id" FOREIGN KEY ("model_id") REFERENCES "models" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_checkpoints_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "checkpoints"`);
  }
}
