import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMoreGithubInfoToUser1633487738698
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users ADD COLUMN bio text, ADD COLUMN location varchar, ADD COLUMN followers int, ADD COLUMN following int, ADD COLUMN login varchar',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users DROP COLUMN bio, DROP COLUMN location, DROP COLUMN followers, DROP COLUMN following, DROP COLUMN login',
    );
  }
}
