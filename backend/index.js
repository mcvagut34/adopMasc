// npm i express dotenv mongoose cookie-parser cors body-parser nodemon
// "type": "module",
//   "scripts": {
//     "start": "nodemon index.js"
//   },

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import usuariosRuta from "./routes/usuario.js";
import adopcionRuta from "./routes/adopcion.js";
import categoriaRuta from "./routes/categoria.js";
import comentarioRuta from "./routes/comentario.js";
import mascotaRuta from "./routes/mascota.js";
import mensajesRuta from "./routes/mensajes.js";
import notificacionesRuta from "./routes/notificaciones.js";
import autenticacionRuta from "./routes/autenticacion.js";

const app = express();
dotenv.config();


const connect = async () => {
    try {
      await mongoose.connect(process.env.BASE);
      console.log("Base de datos conectada");
    } catch (error) {
      console.error(`Error al conectar con la base de datos: ${error}`);
      process.exit(1);
    }
  };
  
  mongoose.connection.on("disconnected", () => {
    console.log("Mongo desconectado");
  });

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use("/api/autenticacion", autenticacionRuta)
app.use("/api/usuarios", usuariosRuta);
app.use("/api/adopciones", adopcionRuta);
app.use("/api/categorias", categoriaRuta);
app.use("/api/comentarios", comentarioRuta);
app.use("/api/mascotas", mascotaRuta);
app.use("/api/mensajes", mensajesRuta);
app.use("/api/notificaciones", notificacionesRuta);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Error interno del servidor";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

let serverReady = false;
app.listen(8800, () => {
  connect();
  serverReady = true;
  console.log("Server levantado en el puerto 8800 :)");
});
