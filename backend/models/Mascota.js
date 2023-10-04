import mongoose from "mongoose";

const MascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  sexo: {
    type: String,
    enum: ["Macho", "Hembra"],
    required: true,
  },
  color: String,
  tamaño: String,
  fotos: [
    {
      type: String,
    },
  ],
  ubicacion: {
    tipo: String,
    coordenadas: {
      latitud: Number,
      longitud: Number,
    },
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now,
  },
  estadoAdopcion: {
    type: String,
    enum: ["Disponible", "Adoptado"],
    default: "Disponible",
  },
  historialAdopciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adopcion",
    },
  ],
});

export default mongoose.model("Mascota", MascotaSchema);


