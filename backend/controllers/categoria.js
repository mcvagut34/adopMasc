import Categoria from '../models/Categoria.js';
import { crearError } from '../extra/error.js';

// Controlador para crear una nueva categoría
export const crearCategoria = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;

    // Verifica si la categoría ya existe por su nombre
    const categoriaExistente = await Categoria.findOne({ nombre });

    if (categoriaExistente) {
      return res.status(400).json({ mensaje: 'La categoría ya existe.' });
    }

    // Crea una nueva categoría
    const nuevaCategoria = new Categoria({
      nombre,
      descripcion,
    });

    // Guarda la nueva categoría en la base de datos
    await nuevaCategoria.save();

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Categoría creada con éxito' });
  } catch (error) {
    console.error(`Error al crear categoría: ${error.message}`);
    next(error);
  }
};

export const obtenerCategorias = async (req, res, next) => {
    try {
      const categorias = await Categoria.find();
  
      // Respuesta exitosa con la lista de categorías
      res.status(200).json(categorias);
    } catch (error) {
      console.error(`Error al obtener categorías: ${error.message}`);
      next(error);
    }
  };
  
  // Controlador para obtener una categoría por ID
  export const obtenerCategoria = async (req, res, next) => {
    try {
      const categoriaId = req.params.id;
  
      // Busca la categoría por su ID en la base de datos
      const categoria = await Categoria.findById(categoriaId);
  
      if (!categoria) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }
  
      // Respuesta exitosa con la categoría encontrada
      res.status(200).json(categoria);
    } catch (error) {
      console.error(`Error al obtener categoría: ${error.message}`);
      next(error);
    }
  };
  
  // Controlador para actualizar una categoría por ID
  export const actualizarCategoria = async (req, res, next) => {
    try {
      const categoriaId = req.params.id;
      const nuevoNombre = req.body.nombre;
  
      // Verifica si la categoría existe
      const categoria = await Categoria.findById(categoriaId);
  
      if (!categoria) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }
  
      // Actualiza el nombre de la categoría
      categoria.nombre = nuevoNombre;
      await categoria.save();
  
      // Respuesta exitosa
      res.status(200).json({ mensaje: 'Categoría actualizada con éxito' });
    } catch (error) {
      console.error(`Error al actualizar categoría: ${error.message}`);
      next(error);
    }
  };
  
// Controlador para eliminar una categoría
export const eliminarCategoria = async (req, res, next) => {
    try {
      const categoriaId = req.params.id;
  
      // Verifica si la categoría existe
      const categoria = await Categoria.findById(categoriaId);
  
      if (!categoria) {
        return res.status(404).json({ mensaje: 'La categoría no existe.' });
      }
  
      // Elimina la categoría de la base de datos
      await Categoria.findByIdAndDelete(categoriaId);
  
      // Respuesta exitosa
      res.status(200).json({ mensaje: 'Categoría eliminada con éxito' });
    } catch (error) {
      console.error(`Error al eliminar categoría: ${error.message}`);
      next(error);
    }
  };
