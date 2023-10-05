import express from 'express';
import { verificarToken, verificarAdmin, verificarCliente } from '../controllers/autenticacion.js';
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
router.post('/', verificarToken, verificarAdmin, verificarCliente, crearMensaje);

// Obtener todos los mensajes (para administradores y usuarios registrados)
router.get('/', verificarToken,verificarAdmin, verificarCliente, obtenerMensajes);

// Obtener un mensaje específico por ID (para administradores y usuarios registrados)
router.get('/:id', verificarToken,verificarAdmin, verificarCliente, obtenerMensaje);

// Actualizar un mensaje por ID (solo para administradores)
router.put('/:id', verificarToken, verificarAdmin, actualizarMensaje);

// Eliminar un mensaje por ID (solo para administradores)
router.delete('/:id', verificarToken, verificarAdmin, eliminarMensaje);

export default router;
