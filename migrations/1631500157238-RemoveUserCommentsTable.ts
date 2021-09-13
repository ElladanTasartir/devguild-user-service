import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserCommentsTable1631500157238
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE user_comments');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE user_comments (id varchar(36) PRIMARY KEY NOT NULL, user_id varchar(36), project_id varchar(36) NOT NULL, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL)',
    );

    await queryRunner.query(
      'ALTER TABLE user_comments ADD CONSTRAINT FK_user_comments_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }
}
