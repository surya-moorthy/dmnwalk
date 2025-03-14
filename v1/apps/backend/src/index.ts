import express from "express"
import { rootRoutes } from "./routes/routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/v1",rootRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running at port : ${port}`)
} ) 