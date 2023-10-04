//GRAFOS
import mongoose from "mongoose";

const MensajeSchema = new mongoose.Schema({
  remitente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  destinatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fechaEnvio: {
    type: Date,
    default: Date.now,
  },
  leido: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Mensaje", MensajeSchema);
