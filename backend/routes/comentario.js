import express from 'express';
import { verificarToken, verificarUsuarioRegistrado } from '../controllers/autenticacion.js';
import {
  crearComentario,
  obtenerComentarios,
  obtenerComentario,
  actualizarComentario,
  eliminarComentario,
} from '../controllers/comentario.js';

const router = express.Router();

// Todas las rutas requieren token

// Crear un nuevo comentario (solo para usuarios registrados)
router.post('/', verificarToken,verificarUsuarioRegistrado, crearComentario);

// Obtener todos los comentarios (para administradores y usuarios registrados)
router.get('/', verificarToken, obtenerComentarios);

// Obtener un comentario específico por ID (para administradores y usuarios registrados)
router.get('/:id', verificarToken, obtenerComentario);

// Actualizar un comentario por ID (solo para administradores)
router.put('/:id', verificarToken, verificarUsuarioRegistrado, actualizarComentario);

// Eliminar un comentario por ID (solo para administradores)
router.delete('/:id', verificarToken, verificarUsuarioRegistrado, eliminarComentario);

export default router;
