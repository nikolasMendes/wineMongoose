import * as dotenv from "dotenv";
import express from "express";
import { connectToDB } from "./config/db.config.js";
import { wineRouter } from "./routes/wine.routes.js";
import { bodegaRouter } from "./routes/bodega.routes.js";

dotenv.config();
connectToDB();

const app = express();
app.use(express.json());
app.use("/wine", wineRouter);
app.use("/bodega", bodegaRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
