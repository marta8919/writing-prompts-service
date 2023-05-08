const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1683136706815 {
    name = 'initialSchema1683136706815'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "prompts_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "prompt" varchar NOT NULL, "category" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_prompts_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "prompt" varchar NOT NULL, "category" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_d7a244cd4c6204ee4388020b7bb" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_prompts_entity"("id", "prompt", "category", "userId") SELECT "id", "prompt", "category", "userId" FROM "prompts_entity"`);
        await queryRunner.query(`DROP TABLE "prompts_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_prompts_entity" RENAME TO "prompts_entity"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "prompts_entity" RENAME TO "temporary_prompts_entity"`);
        await queryRunner.query(`CREATE TABLE "prompts_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "prompt" varchar NOT NULL, "category" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "prompts_entity"("id", "prompt", "category", "userId") SELECT "id", "prompt", "category", "userId" FROM "temporary_prompts_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_prompts_entity"`);
        await queryRunner.query(`DROP TABLE "prompts_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }
}
