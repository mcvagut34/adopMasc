import Usuario from '../models/Usuario.js';


export const crearUsuario = async (req, res, next) => {
    try {
      // Extrae los datos del usuario desde la solicitud
      const {
        nombre,
        apellido,
        fechaNacimiento,
        usuario,
        email,
        password,
        pais,
        ciudad,
        telefono,
      } = req.body;
  
      // Verifica si el usuario ya existe por su dirección de correo electrónico o nombre de usuario
      const usuarioExistente = await Usuario.findOne({ $or: [{ email }, { usuario }] });
      if (usuarioExistente) {
        return res.status(400).json({ mensaje: "El usuario o correo electrónico ya está registrado." });
      }
  
      const nuevoUsuario = new Usuario({
        nombre,
        apellido,
        fechaNacimiento,
        usuario,
        email,
        password,
        pais,
        ciudad,
        telefono,
      });
  
      // Guarda el nuevo usuario en la base de datos
      await nuevoUsuario.save();
  
      // Respuesta exitosa
      res.status(201).json({ mensaje: "Usuario creado con éxito" });
    } catch (error) {
      console.error(`Error al crear usuario: ${error.message}`);
      next(error);
    }
  };

export const actualizarUsuario = async (req, res, next) => {
  try {
    const { activo, ...updateData } = req.body;
    const keys = Object.keys(updateData);
    const updatedFields = {};
    for (let i = 0; i < keys.length; i++) {
      updatedFields[keys[i]] = updateData[keys[i]];
    }

    const updatedUser = Object.assign({}, updatedFields, { activo });
    
    // Comprobar si se ha enviado la imagen
    if(req.file){
      updatedUser.img = req.file.filename;
    }

    const options = { new: true };
    const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id, { $set: updatedUser }, options);
    logger.info(`Usuario actualizado: ${updatedUsuario}`);
    res.status(200).json(updatedUsuario);
  } catch (err) {
    logger.error(`Error al actualizar usuario: ${err.message}`);
    next(err);
  }
};


export const borrarUsuario = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;
    logger.info(`Este es el log para saber si el admin llega o no ${req.user.isAdmin}` ) // Obtener el valor de isAdmin del objeto de usuario en la solicitud
    if (!isAdmin) {
      throw crearError(403, 'No tienes permiso para eliminar usuarios');
    }
  
    await Usuario.findByIdAndUpdate(req.params.id, { activo: false });
    logger.info(`Usuario eliminado con éxito por el administrador ${req.user.usuario}`);
    res.status(200).json("Usuario ha sido borrado");
  } catch (err) {
    logger.error(`Error al eliminar usuario: ${err.message}`);
    next(err);
  }
};



export const obtenerUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    console.log(`Usuario obtenido: ${usuario}`);
    res.status(200).json(usuario);
  } catch (err) {
    console.log(`Error al obtener usuario: ${err.message}`);
    next(err);
  }
};

export const obtenerUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find();
    console.log(`Usuarios obtenidos: ${usuarios}`);
    res.status(200).json(usuarios);
  } catch (err) {
    console.log(`Error al obtener usuarios: ${err.message}`);
    next(err);
  }
};