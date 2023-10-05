import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
  },
  ciudad: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  activo: {
    type: Boolean,
    default: true,
  },
  intentosFallidos: {
    type: Number,
    default: 0,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  historialAdopciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Adopcion" }], 
});

export default mongoose.model("Usuario", UsuarioSchema);
