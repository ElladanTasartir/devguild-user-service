import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGithubId1631377903363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users ADD COLUMN github_id int');

    await queryRunner.query(
      'CREATE INDEX idx_users_github_id ON users(github_id)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX idx_users_github_id');

    await queryRunner.query('ALTER TABLE users DROP COLUMN github_id');
  }
}
