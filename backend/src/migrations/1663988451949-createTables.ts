import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1663988451949 implements MigrationInterface {
    name = 'createTables1663988451949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
