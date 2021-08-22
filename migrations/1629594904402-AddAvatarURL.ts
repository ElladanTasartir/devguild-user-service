import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvatarURL1629594904402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users ADD COLUMN avatar_url varchar');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users DROP COLUMN avatar_url');
  }
}
