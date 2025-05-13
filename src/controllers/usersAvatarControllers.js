import { connection } from "../database/knex/index.js";
import { DiskStorage } from "../providers/DiskStorage.js";

const knex = connection
const diskStorage = new DiskStorage()

export class UsersAvatarControllers{

    async updade(request, response){
        const filename = request.file.filename
        const user_id = request.user.id

        const user = await knex("users").where({id: user_id}).first()

        if(!user){
            try{
                throw new Error("Somente usuários autenticados podem mudar o avatar")
            }catch(err){
                return response.status(401).json({
                    status: "error",
                    messagen: err.message
                })
            }
        }

        if(user.avatar){
            await diskStorage.deleteFileProfile(user.avatar)
        }

        await diskStorage.saveFile(filename)

        user.avatar = filename

        await knex("users").update({avatar: user.avatar}).where({id: user_id})


        response.json({
           user
        })

    }
}