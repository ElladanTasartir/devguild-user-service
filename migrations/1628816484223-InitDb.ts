import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1628816484223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE users (id varchar(36) PRIMARY KEY NOT NULL, username varchar NOT NULL, email varchar NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())',
    );

    await queryRunner.query(
      'CREATE TABLE user_technologies (technology_id int NOT NULL, user_id varchar(36) NOT NULL)',
    );

    await queryRunner.query(
      'ALTER TABLE user_technologies ADD CONSTRAINT PK_user_technologies PRIMARY KEY (technology_id, user_id)',
    );

    await queryRunner.query(
      'CREATE TABLE project_members (user_id varchar(36) NOT NULL, project_id varchar(36) NOT NULL)',
    );

    await queryRunner.query(
      'ALTER TABLE project_members ADD CONSTRAINT PK_project_members PRIMARY KEY (user_id, project_id)',
    );

    await queryRunner.query(
      'CREATE TABLE user_comments (id varchar(36) PRIMARY KEY NOT NULL, user_id varchar(36), project_id varchar(36) NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())',
    );

    await queryRunner.query(
      'ALTER TABLE user_comments ADD CONSTRAINT FK_user_comments_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE',
    );

    await queryRunner.query(
      'ALTER TABLE project_members ADD CONSTRAINT FK_project_members_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE',
    );

    await queryRunner.query(
      'ALTER TABLE user_technologies ADD CONSTRAINT FK_user_technologies_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE user_technologies DROP CONSTRAINT FK_user_technologies_user',
    );

    await queryRunner.query(
      'ALTER TABLE project_members DROP CONSTRAINT FK_project_members_user',
    );

    await queryRunner.query(
      'ALTER TABLE user_comments DROP CONSTRAINT FK_user_comments_user',
    );

    await queryRunner.query('DROP TABLE user_comments');

    await queryRunner.query(
      'ALTER TABLE project_members DROP CONSTRAINT PK_project_members',
    );

    await queryRunner.query('DROP TABLE project_members');

    await queryRunner.query(
      'ALTER TABLE user_technologies DROP CONSTRAINT PK_user_technologies',
    );

    await queryRunner.query('DROP TABLE user_technologies');

    await queryRunner.query('DROP TABLE users');
  }
}
