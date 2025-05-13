import { CategoryControllers } from "../controllers/categoryControllers.js";
import { middlewaresAuth } from "../middlewares/middlewaresAuth.js";
import { Router } from "express";


const categoryRoutes = Router()
const categoryControllers = new CategoryControllers()

categoryRoutes.get("/:category", categoryControllers.index)

categoryRoutes.get("/:category/:id", middlewaresAuth, categoryControllers.show)


export { categoryRoutes }