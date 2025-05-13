export async function up(knex) {

    const exists = await knex.schema.hasTable("posts");

    if(!exists){
        return knex.schema.createTable("posts", table =>{
            table.increments("id").primary();
            table.string("title");
            table.string("price");
            table.string("imagem").nullable();
            table.string("category");
            table.string("description", 300);
            table.string("email");

            table.string("phone");
            table.string("DDD");

            table.timestamp("create_at").defaultTo(knex.fn.now())

            table.integer("id_user").unsigned().notNullable();
            table.foreign("id_user").references("id").inTable("users").onDelete("CASCADE")
        })      
    }    
}

export async function down(knex) {
    return knex.schema.dropTable("posts")
}