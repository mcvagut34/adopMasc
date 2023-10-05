import express from 'express';
import { verificarToken, verificarAdmin, verificarCliente } from '../controllers/autenticacion.js';
import { crearAdopcion, obtenerAdopciones, actualizarAdopcion, eliminarAdopcion } from '../controllers/adopcion.js';

const router = express.Router();


// Crear una nueva adopción
router.post('/',verificarToken,verificarCliente, verificarAdmin, crearAdopcion);

// Obtener todas las adopciones
router.get('/', verificarAdmin,verificarCliente, verificarAdmin, obtenerAdopciones);

// Actualizar el estado de adopción
router.put('/:id', verificarToken, verificarCliente, verificarAdmin, actualizarAdopcion);

// Eliminar una adopción por ID
router.delete('/:id',verificarToken,verificarAdmin,  eliminarAdopcion);

export default router;
