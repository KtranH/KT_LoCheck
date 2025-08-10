import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePowerRoleTable1754846597449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng power_role
    await queryRunner.query(`
      CREATE TABLE "power_role" (
        "power_id" INT NOT NULL,
        "role_id" INT NOT NULL,
        PRIMARY KEY ("power_id", "role_id"),
        CONSTRAINT "FK_power_role_power_id" FOREIGN KEY ("power_id") REFERENCES "powers" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_power_role_role_id" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "power_role"`);
  }
}
