import express from "express";
import { routes } from "./routes/index.js";
import cors from "cors"

const app = express();
app.use(express.json())

app.use(cors())

app.use(routes)

const port = 3333;
app.listen(port, () => {
    console.log("Server is running...")
})

