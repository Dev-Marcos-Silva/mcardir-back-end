export async function up(knex) {

    const exists = await knex.schema.hasTable("tags");

    if(!exists){
        return knex.schema.createTable("tags", table =>{
            table.increments("id").primary();
            table.string("title");

            table.integer("post_id").unsigned().notNullable();
            table.integer("id_user").unsigned().notNullable();

            table.foreign("post_id").references("id").inTable("posts").onDelete("CASCADE")
            table.foreign("id_user").references("id").inTable("users").onDelete("CASCADE")
        })
    }  
}

export async function down(knex) {
    return knex.schema.dropTable("tags")
}