import * as dotenv from "dotenv";
import express from "express";
import { connectToDB } from "./config/db.config.js";
import { wineRouter } from "./routes/wine.routes.js";

dotenv.config();
connectToDB();

const app = express();
app.use("/wine", wineRouter);

app.use(express.json());

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
