import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { crearError } from '../extra/error.js';

// Función para registrar a un nuevo usuario
export const registroUsuario = async (req, res, next) => {
  try {
    // Extrae los datos del usuario desde la solicitud
    const {
      nombre,
      apellido,
      usuario,
      email,
      password,
    } = req.body;

    // Verifica si el usuario ya existe por su dirección de correo electrónico o nombre de usuario
    const usuarioExistente = await Usuario.findOne({ $or: [{ email }, { usuario }] });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario o correo electrónico ya está registrado.' });
    }

    // Genera un hash de la contraseña del usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      usuario,
      email,
      password: hashedPassword,
    });

    // Guarda el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(`Error al registrar usuario: ${error.message}`);
    next(error);
  }
};

// Función para iniciar sesión de un usuario
export const inicioSesionUsuario = async (req, res, next) => {
  try {
    // Extrae las credenciales del usuario desde la solicitud
    const { usuario, password } = req.body;

    // Busca al usuario por nombre de usuario
    const usuarioEncontrado = await Usuario.findOne({ usuario });

    // Verifica si el usuario existe
    if (!usuarioEncontrado) {
      throw crearError(401, 'USUARIO. Credenciales incorrectas');
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const contraseñaValida = await bcrypt.compare(password, usuarioEncontrado.password);

    // Si las credenciales son válidas, genera un token JWT
    if (contraseñaValida) {
      const token = jwt.sign({ id: usuarioEncontrado._id, isAdmin: usuarioEncontrado.isAdmin }, 'secreto', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      throw crearError(401, 'Credenciales incorrectas');
    }
  } catch (error) {
    console.error(`Error al iniciar sesión: ${error.message}`);
    next(error);
  }
};

// // Función para cerrar sesión de un usuario
// export const cerrarSesionUsuario = async (req, res, next) => {
//   try {
//     // Obtén el token de acceso actual del usuario desde las cabeceras de la solicitud
//     const token = req.headers.authorization.split(' ')[1]; // Suponiendo que el token esté en las cabeceras

//     // Revoca el token (esto puede depender de cómo almacenas y gestionas los tokens)
//     // Por ejemplo, podrías tener una lista negra (blacklist) de tokens revocados
//     // y agregar el token actual a la lista negra para invalidarlo
//     // Pseudo código para agregar el token a la lista negra:
//     // await agregarTokenAListaNegra(token);

//     // Elimina las cookies de sesión (esto puede depender de tu método de gestión de sesiones)
//     res.clearCookie('nombreDeLaCookie'); // Reemplaza 'nombreDeLaCookie' con el nombre de tu cookie de sesión

//     // Respondemos con un mensaje de éxito
//     res.status(200).json({ mensaje: 'Sesión cerrada con éxito' });
//   } catch (error) {
//     console.error(`Error al cerrar sesión del usuario: ${error.message}`);
//     next(error);
//   }
// };

// Función para cerrar sesión de un usuario
export const cerrarSesionUsuario = (req, res) => {
  // No necesitas hacer nada en particular para cerrar sesión cuando usas tokens JWT
  // Los tokens son autónomos y el cliente simplemente dejará de enviarlos
  res.status(200).json({ mensaje: 'Sesión cerrada con éxito' });
};

export const verificarToken = (req, res, next) => {
  // Extrae el token de la solicitud (generalmente se encuentra en el encabezado 'Authorization')
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  // Verifica el token utilizando la clave secreta (deberías guardar la clave en una variable de entorno)
  jwt.verify(token, 'secreto', (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token no válido' });
    }

    // Si el token es válido, agrega los datos decodificados del usuario a la solicitud
    req.usuario = decoded;

    next(); // Continúa con la siguiente función de middleware o controlador
  });
};

// Middleware para permitir solo a los administradores
export const verificarAdmin = (req, res, next) => {
  if (req.usuario.isAdmin) {
    next(); // El usuario es un administrador, permite el acceso
  } else {
    res.status(403).json({ mensaje: 'Acceso prohibido para este rol' });
  }
};


export const verificarCliente = (req, res, next) => {
  if (!req.usuario.isAdmin) {
    next(); // El usuario no es un administrador, lo que significa que es un cliente, permite el acceso
  } else {
    res.status(403).json({ mensaje: 'Acceso prohibido para este rol' });
  }
};




// Función para renovar el token JWT (puede ser implementada según tus necesidades)
export const renovarToken = async (req, res, next) => {
    try {
      // Extrae el usuario decodificado de la solicitud (previamente verificado por el middleware verificarToken)
      const usuarioDecodificado = req.usuario;
  
      // Genera un nuevo token con una nueva fecha de vencimiento
      const nuevoToken = jwt.sign({ id: usuarioDecodificado.id }, 'secreto', { expiresIn: '1h' });
  
      // Devuelve el nuevo token al usuario
      res.status(200).json({ token: nuevoToken });
    } catch (error) {
      console.error(`Error al renovar el token: ${error.message}`);
      next(error);
    }
  };
  
