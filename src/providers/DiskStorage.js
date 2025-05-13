import fs from "fs"
import path from "path"

const POST_FOLDER = path.resolve("post")
const TMP_FOLDER = path.resolve("tmp")
const UPLOADS_FOLDER = path.resolve("tmp/upload")

export class DiskStorage{

    async saveFile(file){
        await fs.promises.rename(
            path.resolve(TMP_FOLDER, file),
            path.resolve(UPLOADS_FOLDER, file)
        )

    }
    async deleteFileProfile(file){
        const filePath = path.resolve(UPLOADS_FOLDER, file)

        try{
            await fs.promises.stat(filePath)
        }catch{
            return
        }
        await fs.promises.unlink(filePath)
    }

    async deleteFilePost(file){
        const filePath = path.resolve(POST_FOLDER, file)

        try{
            await fs.promises.stat(filePath)
        }catch{
            return
        }
        await fs.promises.unlink(filePath)
    }
}