import express from 'express';
import { verificarToken, verificarUsuarioRegistrado } from '../controllers/autenticacion.js';
import { crearAdopcion, obtenerAdopciones, actualizarAdopcion, eliminarAdopcion } from '../controllers/adopcion.js';

const router = express.Router();


// Crear una nueva adopción
router.post('/',verificarToken, crearAdopcion);

// Obtener todas las adopciones
router.get('/', verificarUsuarioRegistrado, obtenerAdopciones);

// Actualizar el estado de adopción
router.put('/:id', verificarToken, actualizarAdopcion);

// Eliminar una adopción por ID
router.delete('/:id',verificarToken, eliminarAdopcion);

export default router;
