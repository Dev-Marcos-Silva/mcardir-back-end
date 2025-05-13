import authConfig from "../config/auth.js";
import jwt from "jsonwebtoken";

const { verify } = jwt

export function middlewaresAuth(request, response, next ){

    const authToken = request.headers.authorization;

    if(!authToken){
        try{
            throw new Error("JWT token não informado!")
        }catch(err){
            return response.status(400).json({
                status: "error",
                messagen: err.message
            })
        }
    }

    const [, token] = authToken.split(" ");

    try{
        const {sub: user_id} = verify(token, authConfig.jwt.secret)

        request.user = {
            id: Number(user_id)   
        }
        return next()

    }catch{
        try{
            throw new Error("JWT token inválido")
        }catch(err){
            return response.status(401).json({
                status: "error",
                messagen: err.message
            })
        }
    }
}