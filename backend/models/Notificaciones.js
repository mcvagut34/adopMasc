//COLAS
import mongoose from "mongoose";

const NotificacionSchema = new mongoose.Schema({
  usuarioDestino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  leida: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  prioridad: {
    type: Number, 
    default: 0,   
  },
  origen: {
    type: String, 
  },
});

export default mongoose.model("Notificacion", NotificacionSchema);
