import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotesTable1754784000010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng notes
    await queryRunner.query(`
      CREATE TABLE "notes" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "content" TEXT NOT NULL,
        "lora_id" INT NULL,
        "workflow_id" INT NULL,
        "checkpoint_id" INT NULL,
        "user_id" INT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_notes_lora_id" FOREIGN KEY ("lora_id") REFERENCES "loras" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_notes_workflow_id" FOREIGN KEY ("workflow_id") REFERENCES "workflows" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_notes_checkpoint_id" FOREIGN KEY ("checkpoint_id") REFERENCES "checkpoints" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_notes_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notes"`);
  }
}
