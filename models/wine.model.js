import { Schema, model } from "mongoose";

const wineSchema = new Schema({
  bodega: [{ type: Schema.Types.ObjectId, ref: "bodega" }],
  name: { type: String, required: true },
  since: { type: Number, required: true },
  grape: [{ type: String, minlength: 1, maxlength: 20 }],
});

export const WineModel = model("wine", wineSchema);
