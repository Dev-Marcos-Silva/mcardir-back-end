import { connection } from "../database/knex/index.js"
import bcrypt from "bcryptjs"

const { hash }  = bcrypt
const { compare } = bcrypt
const knex = connection

export class UsersControllers{

    async create(request, response){
        const {name, email, password} = request.body

        const userExists = await knex("users").where({email}).first()
    
        if(userExists){
            try{
                throw new Error("E-mail enviado já está em uso!")
            }catch(err){
                return response.status(400).json({
                    status: "error",
                    messagen: err.message
                })
            }
        }

        const newPasswordHash = await hash(password, 8)

        await knex.select("name", "email", "possword").from("users").insert({name, email, password: newPasswordHash})

        response.status(200).json({     
            message: "Cadastro feito com sucesso!"
        })

    }

    async updade(request, response){
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id

        const user = await knex("users").where({id: user_id}).first()

        if(!user){
            try{
                throw new Error("Usuário não encontrado!")
            }catch(err){
                return response.status(404).json({
                    status: "error",
                    messagen: err.message
                })
            }
        }

        const checkEmailexist = await knex("users").where({email}).first()

        if(checkEmailexist && checkEmailexist.id !== user.id){
            try{
                throw new Error("Este e-mail já está em uso.")
            }catch(err){
                return response.status(404).json({
                    status: "error",
                    messegen: err.message
                })
            }
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;


        if(!password && !old_password){
            try{
                throw new Error("Você precisa informar a senha atual para atualizar")
            }catch(err){
                return response.status(404).json({
                    status: "error",
                    messagen: err.message
                })
            }
        }
        
        if(password && !old_password ){
            try{
                throw new Error("Você precisa informar a senha atual para definir a nova senha")
            }catch(err){
                return response.status(404).json({
                    status: "error",
                    messagen: err.message
                })
            }
        }

        if(password && old_password){

            const checkPasswordMetched = await compare(old_password, user.password)

            if(!checkPasswordMetched){
                try{
                    throw new Error("A senha atual não confere.")
                }catch(err){
                    return response.status(404).json({
                        status: "error",
                        messagen: err.message
                    })
                }
            }  

            user.password = await hash(password, 8)

            await knex("users").update({name: user.name, email: user.email, password: user.password}).where({id: user_id})

        }

        if(!password && old_password){

            const checkPasswordMetched = await compare(old_password, user.password)

            if(!checkPasswordMetched){
                try{
                    throw new Error("A senha atual não confere.")
                }catch(err){
                    return response.status(404).json({
                        status: "error",
                        messagen: err.message
                    })
                }
            }   

            await knex("users").update({name: user.name, email: user.email}).where({id: user_id})
        }

        response.json({
            user
        })

    }
}