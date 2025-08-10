import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCheckpointsImageTable1754784000006
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng checkpoints_image
    await queryRunner.query(`
      CREATE TABLE "checkpoints_image" (
        "id" SERIAL PRIMARY KEY,
        "checkpoint_id" INT NOT NULL,
        "link_image" VARCHAR(255) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_checkpoints_image_checkpoint_id" FOREIGN KEY ("checkpoint_id") REFERENCES "checkpoints" ("id") ON DELETE CASCADE
      )
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "checkpoints_image"`);
  }
}
