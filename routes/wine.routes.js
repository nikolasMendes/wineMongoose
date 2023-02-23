import express from "express";
import { WineModel } from "../models/wine.model.js";

const wineRouter = express.Router();

//POSTO - CREATE
wineRouter.post("/", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json("Não autorizado.");
    }

    const newWine = await WineModel.create({ ...req.body });

    return res.status(201).json(newWine);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
}); //erro enviado para dev front e não para o cliente.
//erro precisa ser mais especifico, para o dev front saber o que aconteceu e arrumar o erro especificado.

//GET ALL
wineRouter.get("/", async (req, res) => {
  try {
    const wine = await WineModel.find();
    return res.status(200).json(wine);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
});

//DETAILS
wineRouter.get("/:wineId", async (req, res) => {
  try {
    const { wineId } = req.params;
    const wine = await WineModel.findOne({ _id: wineId });
    return res.status(200).json(wine);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
});

//EDIT - PUT
wineRouter.put("/:wineId", async (req, res) => {
  try {
    const { wineId } = req.params;
    const updateWine = await WineModel.findOneAndUpdate(
      { _id: wineId }, //1 parametro - referente a busca que vai fazer
      { ...req.body }, // 2 parametro - o que quero editar
      { new: true, runValidators: true } //3º parâmetro é um objeto de configuração
    );
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
});

//DELETE
wineRouter.put("/:wineId", async (req, res) => {
  try {
    const { wineId } = req.params;
    const deleted = await WineModel.deleteOne({ _id: wineId });
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
});

export { wineRouter };

//try vai ter todas as outras requesiçoes
// catch vai ser a questao dos erros das promises
