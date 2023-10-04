import mongoose from "mongoose";

const AdopcionSchema = new mongoose.Schema({
  mascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mascota",
  },
  fechaAdopcion: {
    type: Date,
    default: Date.now,
  },
  usuarioAdoptante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  estadoAdopcion: {
    type: String,
    enum: ["pendiente", "aprobada", "rechazada"],
    default: "pendiente",
  },  
});
export default mongoose.model("Adopcion", AdopcionSchema);