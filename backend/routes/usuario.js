import express from "express";
import { crearUsuario, actualizarUsuario, borrarUsuario, obtenerUsuario, obtenerUsuarios } from "../controllers/usuario.js";
import { verificarAdmin, verificarToken} from "../controllers/autenticacion.js"; // Importa la función verificarToken

const router = express.Router();

// Actualizar (solo accesible para administradores)
router.put("/:id", verificarToken, verificarAdmin, actualizarUsuario);

// Eliminar (solo accesible para administradores)
router.delete("/:id", verificarToken, verificarAdmin, borrarUsuario);

// Obtener Usuario único (solo accesible para administradores)
router.get("/:id", verificarToken, verificarAdmin, obtenerUsuario);

// Obtener todos los Usuarios (solo accesible para administradores)
router.get("/", verificarToken, verificarAdmin, obtenerUsuarios);


// Registro de usuario
router.post("/registro", crearUsuario);


export default router;
