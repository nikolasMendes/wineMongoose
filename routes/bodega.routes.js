import { BodegaModel } from "../models/bodega.model.js";
import express from "express";

const bodegaRouter = express.Router();

bodegaRouter.post("/", async (req, res) => {
  try {
    const bodega = await BodegaModel.create({ ...req.body });

    return res.status(200).json(bodega);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

export { bodegaRouter };

//GET ALL

bodegaRouter.get("/", async (req, res) => {
  try {
    const bodega = await BodegaModel.find({});

    return res.status(200).json(bodega);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
//GET ONE
bodegaRouter.get("/:bodegaId", async (req, res) => {
  try {
    const { bodegaId } = req.params;

    const bodega = await BodegaModel.findOne({ _id: bodegaId }).populate(
      "wine"
    );

    return res.status(200).json(bodega);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//put

bodegaRouter.put("/:bodegaId", async (req, res) => {
  try {
    const { bodegaId } = req.params;
    const updateBodega = await BodegaModel.findOneAndUpdate(
      { _id: bodegaId }, //1 parametro - referente a busca que vai fazer
      { ...req.body }, // 2 parametro - o que quero editar
      { new: true, runValidators: true } //3º parâmetro é um objeto de configuração
    );
    return res.status(200).json(updateBodega);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

//delete

bodegaRouter.delete("/:bodegaId", async (req, res) => {
  try {
    const { bodegaId } = req.params;

    const deletedBodega = await BodegaModel.deleteOne({ _id: bodegaId });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});
