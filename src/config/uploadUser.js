import multer from "multer";
import crypto from "crypto";
import path from "path";

const TMP_FOLDER = path.resolve("tmp")

const storage = multer.diskStorage({
    destination: TMP_FOLDER,
    filename: ( request, file, callback ) => {
        const fileHash = crypto.randomBytes(10).toString("hex")
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
    }
})

export const upload = multer({storage})