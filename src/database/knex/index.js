import knex from "knex"
import development from "../../../knexfile.js"

const config = development

export const connection = knex(config.development)



