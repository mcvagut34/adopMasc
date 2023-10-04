import mongoose from "mongoose";

const ComentarioSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  mascotaRelacionada: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mascota",
    required: true,
  },
});

export default mongoose.model("Comentario", ComentarioSchema);
