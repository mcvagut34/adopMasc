import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: String,
});

export default mongoose.model("Categoria", CategoriaSchema);
