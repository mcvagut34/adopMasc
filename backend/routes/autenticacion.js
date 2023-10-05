import express from "express";
import { inicioSesionUsuario, cerrarSesionUsuario } from "../controllers/autenticacion.js";

const router = express.Router();


// Inicio de sesión de usuario
router.post("/login", inicioSesionUsuario);

// Cerrar sesión de usuario
router.post("/logout", cerrarSesionUsuario);

export default router;