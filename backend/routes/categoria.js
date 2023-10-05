import express from 'express';
import { verificarToken, verificarAdmin,verificarCliente } from '../controllers/autenticacion.js';
import { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } from '../controllers/categoria.js';

const router = express.Router();

// Rutas para usuarios registrados (requieren token)

// Crear una nueva categoría
router.post('/', verificarToken, verificarAdmin, crearCategoria);

// Obtener todas las categorías
router.get('/', verificarToken, verificarAdmin, verificarCliente, obtenerCategorias);

// Obtener una categoría específica por ID
router.get('/:id',verificarToken, verificarAdmin, verificarCliente, obtenerCategoria);

// Actualizar una categoría por ID
router.put('/:id',verificarToken, verificarAdmin, actualizarCategoria);

// Eliminar una categoría por ID
router.delete('/:id', verificarToken,verificarAdmin, eliminarCategoria);

export default router;
