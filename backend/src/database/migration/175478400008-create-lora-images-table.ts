import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLoraImagesTable1754784000008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng lora_images
    await queryRunner.query(`
      CREATE TABLE "lora_images" (
        "id" SERIAL PRIMARY KEY,
        "lora_id" INT NOT NULL,
        "link_image" VARCHAR(255) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_lora_images_lora_id" FOREIGN KEY ("lora_id") REFERENCES "loras" ("id") ON DELETE CASCADE
      )
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lora_images"`);
  }
}
