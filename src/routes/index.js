import express from "express";
import { Router } from "express";

import { categoryRoutes } from "./categoryRoutes.js";
import { sessionRoutes } from "./sessionRoutes.js";
import { usersRoutes } from "./usersRoutes.js";
import { postRoutes } from "./postRoutes.js";

import path from "path";

const UPLOADS_FOLDER = path.resolve("tmp/upload")
const POST_FOLDER = path.resolve("post")

const routes = Router();

routes.use("/category", categoryRoutes);

routes.use("/session", sessionRoutes);

routes.use("/users", usersRoutes);

routes.use("/post", postRoutes);

routes.use("/files/profile", express.static(UPLOADS_FOLDER))
routes.use("/files/post", express.static(POST_FOLDER))

export { routes };