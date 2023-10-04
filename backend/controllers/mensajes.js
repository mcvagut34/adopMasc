// En tu archivo de controladores (mensajes.js)
import Mensaje from '../models/Mensajes.js';

// Controlador para crear un mensaje
export const crearMensaje = async (req, res, next) => {
  try {
    // Extrae los datos del mensaje desde la solicitud
    const { contenido, remitente, destinatario } = req.body;

    // Crea un nuevo mensaje
    const nuevoMensaje = new Mensaje({
      contenido,
      remitente,
      destinatario,
    });

    // Guarda el mensaje en la base de datos
    await nuevoMensaje.save();

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error(`Error al enviar mensaje: ${error.message}`);
    next(error);
  }
};

// Controlador para obtener todos los mensajes
export const obtenerMensajes = async (req, res, next) => {
  try {
    // Obtiene todos los mensajes desde la base de datos
    const mensajes = await Mensaje.find();

    // Respuesta exitosa con la lista de mensajes
    res.status(200).json(mensajes);
  } catch (error) {
    console.error(`Error al obtener mensajes: ${error.message}`);
    next(error);
  }
};

// Controlador para obtener un mensaje específico por ID
export const obtenerMensaje = async (req, res, next) => {
  try {
    const mensajeId = req.params.id;

    // Busca el mensaje por su ID en la base de datos
    const mensaje = await Mensaje.findById(mensajeId);

    if (!mensaje) {
      return res.status(404).json({ mensaje: 'Mensaje no encontrado' });
    }

    // Respuesta exitosa con el mensaje encontrado
    res.status(200).json(mensaje);
  } catch (error) {
    console.error(`Error al obtener mensaje: ${error.message}`);
    next(error);
  }
};

// Controlador para actualizar un mensaje por ID
export const actualizarMensaje = async (req, res, next) => {
  try {
    const mensajeId = req.params.id;
    const nuevoContenido = req.body.contenido;

    // Busca el mensaje por su ID en la base de datos
    const mensaje = await Mensaje.findById(mensajeId);

    if (!mensaje) {
      return res.status(404).json({ mensaje: 'Mensaje no encontrado' });
    }

    // Actualiza el contenido del mensaje
    mensaje.contenido = nuevoContenido;
    await mensaje.save();

    // Respuesta exitosa
    res.status(200).json({ mensaje: 'Mensaje actualizado con éxito' });
  } catch (error) {
    console.error(`Error al actualizar mensaje: ${error.message}`);
    next(error);
  }
};

// Controlador para eliminar un mensaje por ID
export const eliminarMensaje = async (req, res, next) => {
  try {
    const mensajeId = req.params.id;

    // Busca el mensaje por su ID en la base de datos
    const mensaje = await Mensaje.findById(mensajeId);

    if (!mensaje) {
      return res.status(404).json({ mensaje: 'Mensaje no encontrado' });
    }

    // Elimina el mensaje de la base de datos
    await mensaje.remove();

    // Respuesta exitosa
    res.status(200).json({ mensaje: 'Mensaje eliminado con éxito' });
  } catch (error) {
    console.error(`Error al eliminar mensaje: ${error.message}`);
    next(error);
  }
};
