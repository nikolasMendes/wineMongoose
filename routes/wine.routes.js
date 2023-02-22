import express from "express";
import { WineModel } from "../models/wine.model.js";

const wineRouter = express.Router();

wineRouter.post("/", async (req, res) => {
  try {
    const newWine = await WineModel.create({ ...req.body });

    return res.status(201).json(newWine);
  } catch (err) {
    console.log(err);
  }
});

export { wineRouter };
