import { connection } from "../database/knex/index.js"
import { DiskStorage } from "../providers/DiskStorage.js";

const knex = connection
const diskStorage = new DiskStorage()


export class PostControllers{

    async create(request, response){
        const user_id = request.user.id;
        const filename = request.file.filename;
        const dados = JSON.parse(request.body.dados);

        const tags = dados.tags
       
        const id_post = await knex("posts").insert({
            title: dados.title,
            price: dados.price,
            imagem: filename,
            category: dados.category,
            description: dados.description,
            email: dados.email,
            phone: dados.phone,
            DDD: dados.ddd,
            id_user: user_id 
        })

        //traformando de array para numero
        const post_id = id_post[0]
        
        const listTags = tags.map(title => {
            return{
                title,
                post_id,
                id_user: user_id
            }
        })

        await knex.select("*").from("tags").insert(listTags)
    
          
        response.json({
            messagen:"Anúncio criado com sucesso"
        })
    }

    async index(request, response){
        const user_id = request.user.id

        const allPost = await knex.select("id", "title", "imagem", "create_at").from("posts").where({id_user: user_id})

        response.json(allPost)

    }

    async delete(request, response){
        const { id } = request.params
        const user_id = request.user.id

        const post = await knex.select("imagem").from("posts").where({id}).first()

        if(post.imagem){
            await diskStorage.deleteFilePost(post.imagem)
        }

        await knex.select("*").from("posts").where({id}).andWhere({id_user: user_id}).delete()

        response.json()
    }
}