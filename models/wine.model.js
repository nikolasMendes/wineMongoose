import { Schema, model } from "mongoose";

const wineSchema = new Schema({
  name: { type: String, required: true },
  since: { type: String, required: true },
  country: { type: String, required: true },
  grape: [{ type: String, minlength: 1, maxlength: 20 }],
});

export const WineModel = model("wine", wineSchema);
