import express from 'express';
import { verificarToken, verificarUsuarioRegistrado } from '../controllers/autenticacion.js';
import {
  crearNotificacion,
  obtenerNotificaciones,
  obtenerNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
} from '../controllers/notificaciones.js';

const router = express.Router();

// Todas las rutas requieren token

// Crear una nueva notificación (para usuarios registrados, incluyendo administradores)
router.post('/', verificarToken, verificarUsuarioRegistrado, crearNotificacion);

// Obtener todas las notificaciones (para administradores y usuarios registrados)
router.get('/', verificarToken, obtenerNotificaciones);

// Obtener una notificación específica por ID (para administradores y usuarios registrados)
router.get('/:id', verificarToken, obtenerNotificacion);

// Actualizar una notificación por ID (solo para administradores)
router.put('/:id', verificarToken, verificarUsuarioRegistrado, actualizarNotificacion);

// Eliminar una notificación por ID (solo para administradores)
router.delete('/:id', verificarToken, verificarUsuarioRegistrado, eliminarNotificacion);

export default router;
