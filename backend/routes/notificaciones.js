import express from 'express';
import { verificarToken, verificarAdmin, verificarCliente } from '../controllers/autenticacion.js';
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
router.post('/', verificarToken, verificarAdmin, crearNotificacion);

// Obtener todas las notificaciones (para administradores y usuarios registrados)
router.get('/', verificarToken,verificarAdmin, verificarCliente, obtenerNotificaciones);

// Obtener una notificación específica por ID (para administradores y usuarios registrados)
router.get('/:id', verificarToken,verificarAdmin, obtenerNotificacion);

// Actualizar una notificación por ID (solo para administradores)
router.put('/:id', verificarToken, verificarAdmin, actualizarNotificacion);

// Eliminar una notificación por ID (solo para administradores)
router.delete('/:id', verificarToken, verificarAdmin, eliminarNotificacion);

export default router;
