
exports.up = function(knex) {
    return knex.schema
        .createTable("Level_1", tbl => {
            tbl.increments();
            tbl.integer('User_ID')
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users");
            tbl.boolean("Lesson")
                .notNullable();
            tbl.boolean("Practice")
                .notNullable();
            tbl.boolean("Quiz")
                .notNullable();
            tbl.boolean("Active")
                .notNullable();
            tbl.integer("AtoE_ID")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("AtoE");
      })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("Level_1")
};
