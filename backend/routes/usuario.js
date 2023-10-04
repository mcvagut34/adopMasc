import express from "express";
import { actualizarUsuario, borrarUsuario, obtenerUsuario, obtenerUsuarios } from "../controllers/usuario.js";
import { verificarToken } from "../controllers/autenticacion.js"; // Importa la función verificarToken

const router = express.Router();

// Actualizar (solo accesible para administradores)
router.put("/:id", verificarToken, actualizarUsuario);

// Eliminar (solo accesible para administradores)
router.delete("/:id", verificarToken, borrarUsuario);

// Obtener Usuario único (solo accesible para administradores)
router.get("/:id", verificarToken, obtenerUsuario);

// Obtener todos los Usuarios (solo accesible para administradores)
router.get("/", verificarToken, obtenerUsuarios);

export default router;
