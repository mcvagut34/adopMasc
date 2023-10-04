import express from 'express';
import { verificarToken, verificarUsuarioRegistrado } from '../controllers/autenticacion.js';
import {
  crearMensaje,
  obtenerMensajes,
  obtenerMensaje,
  actualizarMensaje,
  eliminarMensaje,
} from '../controllers/mensajes.js';

const router = express.Router();

// Todas las rutas requieren token

// Crear un nuevo mensaje (para usuarios registrados, incluyendo administradores)
router.post('/', verificarToken, verificarUsuarioRegistrado, crearMensaje);

// Obtener todos los mensajes (para administradores y usuarios registrados)
router.get('/', verificarToken, obtenerMensajes);

// Obtener un mensaje específico por ID (para administradores y usuarios registrados)
router.get('/:id', verificarToken, obtenerMensaje);

// Actualizar un mensaje por ID (solo para administradores)
router.put('/:id', verificarToken, verificarUsuarioRegistrado, actualizarMensaje);

// Eliminar un mensaje por ID (solo para administradores)
router.delete('/:id', verificarToken, verificarUsuarioRegistrado, eliminarMensaje);

export default router;
