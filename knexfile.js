import path from "path"

export default {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve("./src/database/database.db")
        },
        
        useNullAsDefault: true,

        pool:{
            afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
        },
        
        migrations: {
            directory: path.resolve("./src/database/knex/migrations")
        }
    }
}