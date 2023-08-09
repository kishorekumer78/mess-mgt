import { model, models, Schema } from "mongoose";

const offrSchema = new Schema({
  rank: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bd: {
    type: Number,
    required: true,
    unique: true,
  },
  unit: {
    type: String,
  },
  email: { type: String, required: true, unique: true },
  mobile: String,
  outStation: { type: Boolean, default: false },
  messIn: { type: Boolean, default: false },
});

const Offr = models.Offr || model("Offr", offrSchema);
export default Offr;
