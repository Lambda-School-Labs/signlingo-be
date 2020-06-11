exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("okta_uid").unique().notNullable().index();
    })
    .createTable("levels", (tbl) => {
      tbl.increments();
      tbl.string("name").index();
    })
    .createTable("flashcards", (tbl) => {
      tbl.increments();
      tbl.string("sign").unique();
      tbl.string("visual").unique();
      tbl
        .integer("level_id")
        .references("id")
        .inTable("levels")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("user_levels", (tbl) => {
      tbl.increments();
      tbl
        .string("okta_uid")
        .references("okta_uid")
        .inTable("users")
        .notNullable()
        .unsigned()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("level_id")
        .references("id")
        .inTable("levels")
        .notNullable()
        .unsigned()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.timestamp("completed_flashcards").defaultTo(null);
      tbl.timestamp("completed_exercises").defaultTo(null);
      tbl.timestamp("completed_quiz").defaultTo(null);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("exercises")
    .dropTableIfExists("flashcards")
    .dropTableIfExists("user_levels")
    .dropTableIfExists("levels")
    .dropTableIfExists("users");
};
