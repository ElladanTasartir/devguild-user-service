import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentToUsersComments1631839651899
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users_comments ADD COLUMN comment varchar',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users_comments DROP COLUMN comment');
  }
}
