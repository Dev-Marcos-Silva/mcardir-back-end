import { UsersAvatarControllers } from "../controllers/usersAvatarControllers.js";
import { UsersControllers } from "../controllers/usersControllers.js";
import { middlewaresAuth } from "../middlewares/middlewaresAuth.js";
import { upload } from "../config/uploadUser.js";
import { Router } from "express";

const usersRoutes = Router()
const usersControllers = new UsersControllers()
const usersAvatarControllers = new UsersAvatarControllers()


usersRoutes.post("/", usersControllers.create)

usersRoutes.put("/", middlewaresAuth, usersControllers.updade)

usersRoutes.patch("/user", middlewaresAuth, upload.single("avatar"), usersAvatarControllers.updade)


export { usersRoutes }