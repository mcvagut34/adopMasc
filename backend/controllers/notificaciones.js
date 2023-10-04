// En tu archivo de controladores (notificaciones.js)
import Notificacion from '../models/Notificaciones.js';

// Controlador para crear una notificación
export const crearNotificacion = async (req, res, next) => {
  try {
    // Extrae los datos de la notificación desde la solicitud
    const { contenido, usuarioDestino } = req.body;

    // Crea una nueva notificación
    const nuevaNotificacion = new Notificacion({
      contenido,
      usuarioDestino,
    });

    // Guarda la notificación en la base de datos
    await nuevaNotificacion.save();

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Notificación creada con éxito' });
  } catch (error) {
    console.error(`Error al crear notificación: ${error.message}`);
    next(error);
  }
};

// Controlador para obtener todas las notificaciones
export const obtenerNotificaciones = async (req, res, next) => {
  try {
    // Obtiene todas las notificaciones desde la base de datos
    const notificaciones = await Notificacion.find();

    // Respuesta exitosa con la lista de notificaciones
    res.status(200).json(notificaciones);
  } catch (error) {
    console.error(`Error al obtener notificaciones: ${error.message}`);
    next(error);
  }
};

// Controlador para obtener una notificación específica por ID
export const obtenerNotificacion = async (req, res, next) => {
  try {
    const notificacionId = req.params.id;

    // Busca la notificación por su ID en la base de datos
    const notificacion = await Notificacion.findById(notificacionId);

    if (!notificacion) {
      return res.status(404).json({ mensaje: 'Notificación no encontrada' });
    }

    // Respuesta exitosa con la notificación encontrada
    res.status(200).json(notificacion);
  } catch (error) {
    console.error(`Error al obtener notificación: ${error.message}`);
    next(error);
  }
};

// Controlador para actualizar una notificación por ID
export const actualizarNotificacion = async (req, res, next) => {
  try {
    const notificacionId = req.params.id;
    const nuevoContenido = req.body.contenido;

    // Busca la notificación por su ID en la base de datos
    const notificacion = await Notificacion.findById(notificacionId);

    if (!notificacion) {
      return res.status(404).json({ mensaje: 'Notificación no encontrada' });
    }

    // Actualiza el contenido de la notificación
    notificacion.contenido = nuevoContenido;
    await notificacion.save();

    // Respuesta exitosa
    res.status(200).json({ mensaje: 'Notificación actualizada con éxito' });
  } catch (error) {
    console.error(`Error al actualizar notificación: ${error.message}`);
    next(error);
  }
};

// Controlador para eliminar una notificación por ID
export const eliminarNotificacion = async (req, res, next) => {
  try {
    const notificacionId = req.params.id;

    // Busca la notificación por su ID en la base de datos
    const notificacion = await Notificacion.findById(notificacionId);

    if (!notificacion) {
      return res.status(404).json({ mensaje: 'Notificación no encontrada' });
    }

    // Elimina la notificación de la base de datos
    await notificacion.remove();

    // Respuesta exitosa
    res.status(200).json({ mensaje: 'Notificación eliminada con éxito' });
  } catch (error) {
    console.error(`Error al eliminar notificación: ${error.message}`);
    next(error);
  }
};
