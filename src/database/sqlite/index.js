import { open } from "sqlite"
import sqlite3 from "sqlite3"
import path from "path"

export async function createConnectionSQLite(){
    const database = await open({
        filename: path.resolve("./src/database/database.bd"),
        driver: sqlite3.Database
    })

    return database
}

