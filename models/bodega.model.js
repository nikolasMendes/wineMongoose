import { Schema, model } from "mongoose";

const bodegaSchema = new Schema({
  bodega: { type: String, required: true },
  country: { type: String, required: true },
  district: { type: String, required: true },
  wines: [{ type: Schema.Types.ObjectId, ref: "wine" }],
});

export const BodegaModel = model("bodega", bodegaSchema);
