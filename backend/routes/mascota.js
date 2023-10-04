import express from 'express';
import {
  crearMascota,
  obtenerMascotas,
  obtenerMascota,
  actualizarMascota,
  eliminarMascota,
} from '../controllers/mascotas.js';

import { verificarToken } from '../controllers/autenticacion.js'; // Debes importar tu función de verificación de administrador

const router = express.Router();

// Middleware para verificar que el usuario sea administrador
router.use(verificarToken);

// Ruta para crear una nueva mascota (solo disponible para administradores)
router.post('/', crearMascota);

// Ruta para obtener una lista de todas las mascotas (solo disponible para administradores)
router.get('/', obtenerMascotas);

// Ruta para obtener los detalles de una mascota específica (solo disponible para administradores)
router.get('/:id', obtenerMascota);

// Ruta para actualizar los datos de una mascota (solo disponible para administradores)
router.put('/:id', actualizarMascota);

// Ruta para eliminar una mascota (solo disponible para administradores)
router.delete('/:id', eliminarMascota);

export default router;
