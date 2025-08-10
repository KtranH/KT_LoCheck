import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkflowImagesTable1754846564193
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng workflow_images
    await queryRunner.query(`
      CREATE TABLE "workflow_images" (
        "id" SERIAL PRIMARY KEY,
        "workflow_id" INT NOT NULL,
        "link_image" VARCHAR(255) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_workflow_images_workflow_id" FOREIGN KEY ("workflow_id") REFERENCES "workflows" ("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "workflow_images"`);
  }
}
