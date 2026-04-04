import mongoose from "mongoose";

/** Total de tasses enregistré pour un jour calendaire (YYYY-MM-DD). */
const dailyCupsSchema = new mongoose.Schema({
  dayKey: { type: String, required: true, unique: true, index: true },
  cups: { type: Number, default: 0, min: 0 },
});

export default mongoose.model("DailyCups", dailyCupsSchema);
