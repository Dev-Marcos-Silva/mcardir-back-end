import { connection } from "../database/knex/index.js"
import jwt from "jsonwebtoken"
import authConfig from "../config/auth.js"
import bcrypt from "bcryptjs";

const { compare } = bcrypt
const { sign } = jwt
const knex = connection

export class SessionControllers{

    async create(request, response){
        const { email, password } = request.body;

        const checkUser = await knex("users").where({email}).first()

        if(!checkUser){
            try{
                throw new Error("E-mail e/ou Senha incorreto!")
            }catch(err){
                return response.status(400).json({
                    status: "error",
                    messagen: err.message
                })
            }
        }

        const checkPasswordMetched = await compare(password, checkUser.password )

        if(!checkPasswordMetched){
            try{
                throw new Error("E-mail e/ou Senha incorreto!")
            }catch(err){
                return response.status(400).json({
                    status: "error",
                    messagen: err.message
                })
            }
        }

        const user = checkUser

        const { secret, expiresIn } = authConfig.jwt
        
      

        const token = sign({},secret,{subject: String(user.id), expiresIn});

        response.json( {
            user,
            token
        })
       
    }
}