import { SessionControllers } from "../controllers/sessionControllers.js";
import { Router } from "express";

const sessionRoutes = Router()
const sessionControllers = new SessionControllers()

sessionRoutes.post("/", sessionControllers.create)

export { sessionRoutes };