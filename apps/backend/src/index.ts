import express from "express"
require("dotenv").config();

const app = express();
app.use(express.json());


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running at port : ${port}`)
} )