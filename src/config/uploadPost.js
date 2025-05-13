import multer from "multer";
import crypto from "crypto";
import path from "path";

const POST_FOLDER = path.resolve("post")

const storage = multer.diskStorage({
    destination: POST_FOLDER,
    filename: ( request, file, callback ) => {
        const fileHash = crypto.randomBytes(10).toString("hex")
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
    }
})

export const upload = multer({storage})

