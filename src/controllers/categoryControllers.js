import { connection } from "../database/knex/index.js"
const knex = connection

export class CategoryControllers{

    async index(request, response){
        const { category } = request.params

        const allCategorys = await knex("posts").where({category})

        if(allCategorys.length <= 0){
            try{
                throw new Error("Categoria não encontrada!")
            }catch(err){ 
                return response.status(404).json({
                    status: "error",
                    messagen: err.message
                })
            }
        }

        const newAllCategory = allCategorys.map(option => {
            return{
                id: option.id,
                title: option.title,
                date: option.create_at,
                price: option.price,
                imagem: option.imagem,
            }
        })


        response.json(
            newAllCategory
        )

    }

    async show(request, response){
        const {category, id } = request.params
        const user_id = request.user.id
        
        const car = await knex("posts").select("title","price","imagem","description","email","phone","ddd","create_at","id_user").where({id}).andWhere({category}).first()
        const tags = await knex("tags").select("id","title").where({post_id: id})

        if(!car){
            try{
                throw new Error("Opção não encontrada!")
            }catch(err){ 
                return response.status(404).json({
                    status: "error",
                    messagen: err.message
                })

            }
        }

        const { id_user } = car

        const users = await knex("users").select("name", "avatar").where({id: id_user}).first()

        response.json({
            users,
            tags,
            car
        })
    }
}