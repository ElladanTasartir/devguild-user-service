import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNullConstraintInEmail1631384582549
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users ALTER COLUMN email DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users ALTER COLUMN email SET NOT NULL',
    );
  }
}
