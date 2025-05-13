export async function up(knex) { 

    const exists = await knex.schema.hasTable("users");

    if (!exists) {
        return knex.schema.createTable("users", table => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.string("email").notNullable().unique();
            table.string("password").notNullable();
        
            table.string("avatar").nullable();
            table.timestamp("create_at").defaultTo(knex.fn.now())
            table.timestamp("updade_at").defaultTo(knex.fn.now())
        }) 
    };
};

export async function down(knex) {
    return knex.schema.dropTableIfExists("users")
};