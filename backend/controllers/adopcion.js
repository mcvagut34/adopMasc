import Adopcion from '../models/Adopcion.js';
import Mascota from '../models/Mascota.js';
import Usuario from '../models/Usuario.js';
import { crearError } from '../extra/error.js';

// Controlador para crear una nueva adopción
export const crearAdopcion = async (req, res, next) => {
  try {
    // Extrae los datos de la adopción desde la solicitud
    const { mascotaId, usuarioId } = req.body;

    // Verifica si la mascota y el usuario existen
    const mascota = await Mascota.findById(mascotaId);
    const usuario = await Usuario.findById(usuarioId);

    if (!mascota || !usuario) {
      throw crearError(404, 'Mascota o usuario no encontrado');
    }

    // Crea una nueva adopción
    const nuevaAdopcion = new Adopcion({
      mascota: mascota._id,
      usuarioAdoptante: usuario._id,
    });

    // Guarda la adopción en la base de datos
    await nuevaAdopcion.save();

    // Actualiza el estado de adopción de la mascota
    mascota.estadoAdopcion = 'Adoptado';
    await mascota.save();

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Adopción creada con éxito' });
  } catch (error) {
    console.error(`Error al crear adopción: ${error.message}`);
    next(error);
  }
};

// Controlador para obtener todas las adopciones
export const obtenerAdopciones = async (req, res, next) => {
  try {
    const adopciones = await Adopcion.find();

    // Respuesta exitosa
    res.status(200).json(adopciones);
  } catch (error) {
    console.error(`Error al obtener adopciones: ${error.message}`);
    next(error);
  }
};

// Controlador para actualizar el estado de adopción
export const actualizarAdopcion = async (req, res, next) => {
    try {
      const adopcionId = req.params.id;
      const nuevoEstado = req.body.estadoAdopcion;
  
      // Verifica si la adopción existe
      const adopcion = await Adopcion.findById(adopcionId);
  
      if (!adopcion) {
        throw crearError(404, 'Adopción no encontrada');
      }
  
      // Actualiza el estado de adopción
      adopcion.estadoAdopcion = nuevoEstado;
      await adopcion.save();
  
      // Respuesta exitosa
      res.status(200).json({ mensaje: 'Estado de adopción actualizado con éxito' });
    } catch (error) {
      console.error(`Error al actualizar adopción: ${error.message}`);
      next(error);
    }
  };
  
// Controlador para eliminar una adopción por ID
export const eliminarAdopcion = async (req, res, next) => {
    try {
      const adopcionId = req.params.id;
  
      // Verifica si la adopción existe
      const adopcion = await Adopcion.findById(adopcionId);
  
      if (!adopcion) {
        throw crearError(404, 'Adopción no encontrada');
      }
  
      // Elimina la adopción
      await adopcion.remove();
  
      // Respuesta exitosa
      res.status(200).json({ mensaje: 'Adopción eliminada con éxito' });
    } catch (error) {
      console.error(`Error al eliminar adopción: ${error.message}`);
      next(error);
    }
  };
  