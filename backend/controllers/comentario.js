import Comentario from '../models/Comentario.js';


// Controlador para crear un comentario
export const crearComentario = async (req, res, next) => {
  try {
    // Extrae los datos del comentario desde la solicitud
    const { contenido, usuario, mascota } = req.body;

    // Crea un nuevo comentario
    const nuevoComentario = new Comentario({
      contenido,
      usuario,
      mascota,
    });

    // Guarda el comentario en la base de datos
    await nuevoComentario.save();

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Comentario creado con éxito' });
  } catch (error) {
    console.error(`Error al crear comentario: ${error.message}`);
    next(error);
  }
};
export const obtenerComentarios = async (req, res, next) => {
    try {
      const comentarios = await Comentario.find();
  
      // Respuesta exitosa con la lista de comentarios
      res.status(200).json(comentarios);
    } catch (error) {
      console.error(`Error al obtener comentarios: ${error.message}`);
      next(error);
    }
  };
  
  // Controlador para obtener un comentario por ID
  export const obtenerComentario = async (req, res, next) => {
    try {
      const comentarioId = req.params.id;
  
      // Busca el comentario por su ID en la base de datos
      const comentario = await Comentario.findById(comentarioId);
  
      if (!comentario) {
        return res.status(404).json({ mensaje: 'Comentario no encontrado' });
      }
  
      // Respuesta exitosa con el comentario encontrado
      res.status(200).json(comentario);
    } catch (error) {
      console.error(`Error al obtener comentario: ${error.message}`);
      next(error);
    }
  };
  
  // Controlador para actualizar un comentario por ID
  export const actualizarComentario = async (req, res, next) => {
    try {
      const comentarioId = req.params.id;
      const nuevoContenido = req.body.contenido;
  
      // Verifica si el comentario existe
      const comentario = await Comentario.findById(comentarioId);
  
      if (!comentario) {
        return res.status(404).json({ mensaje: 'Comentario no encontrado' });
      }
  
      // Actualiza el contenido del comentario
      comentario.contenido = nuevoContenido;
      await comentario.save();
  
      // Respuesta exitosa
      res.status(200).json({ mensaje: 'Comentario actualizado con éxito' });
    } catch (error) {
      console.error(`Error al actualizar comentario: ${error.message}`);
      next(error);
    }
  };
  
// Controlador para obtener comentarios de una mascota específica
export const obtenerComentariosPorMascota = async (req, res, next) => {
  try {
    const { mascotaId } = req.params;

    // Busca todos los comentarios relacionados con la mascota
    const comentarios = await Comentario.find({ mascota: mascotaId });

    // Respuesta exitosa con los comentarios
    res.status(200).json(comentarios);
  } catch (error) {
    console.error(`Error al obtener comentarios: ${error.message}`);
    next(error);
  }
};

// Controlador para eliminar un comentario
export const eliminarComentario = async (req, res, next) => {
  try {
    const { comentarioId } = req.params;

    // Busca el comentario por su ID
    const comentario = await Comentario.findById(comentarioId);

    // Verifica si el comentario existe
    if (!comentario) {
      throw crearError(404, 'Comentario no encontrado');
    }

    // Verifica si el usuario actual es el propietario del comentario o un administrador
    if (comentario.usuario.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      throw crearError(403, 'No tienes permiso para eliminar este comentario');
    }

    // Elimina el comentario de la base de datos
    await comentario.remove();

    // Respuesta exitosa
    res.status(200).json({ mensaje: 'Comentario eliminado con éxito' });
  } catch (error) {
    console.error(`Error al eliminar comentario: ${error.message}`);
    next(error);
  }
};
