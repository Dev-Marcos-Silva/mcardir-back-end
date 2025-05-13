import { PostControllers } from "../controllers/postControllers.js";
import { middlewaresAuth } from "../middlewares/middlewaresAuth.js";
import { Router } from "express";
import { upload } from "../config/uploadPost.js";


const postRoutes = Router()
const postControllers = new PostControllers()
 
postRoutes.post("/", middlewaresAuth, upload.single("imagem"), postControllers.create)

postRoutes.get("/index", middlewaresAuth, postControllers.index)

postRoutes.delete("/:id", middlewaresAuth, postControllers.delete)

export { postRoutes }