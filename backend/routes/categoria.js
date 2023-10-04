import express from 'express';
import { verificarToken } from '../controllers/autenticacion.js';
import { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } from '../controllers/categoria.js';

const router = express.Router();

// Rutas para usuarios registrados (requieren token)

// Crear una nueva categoría
router.post('/', verificarToken, crearCategoria);

// Obtener todas las categorías
router.get('/', obtenerCategorias);

// Obtener una categoría específica por ID
router.get('/:id', obtenerCategoria);

// Actualizar una categoría por ID
router.put('/:id', verificarToken, actualizarCategoria);

// Eliminar una categoría por ID
router.delete('/:id', verificarToken, eliminarCategoria);

export default router;
