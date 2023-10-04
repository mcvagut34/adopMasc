import Mascota from '../models/Mascota.js';


export const crearMascota = async (req, res, next) => {
  try {
    const {
      nombre,
      categoria,
      descripcion,
      edad,
      sexo,
      color,
      tamaño,
      fotos,
      ubicacion,
    } = req.body;

    const nuevaMascota = new Mascota({
      nombre,
      categoria,
      descripcion,
      edad,
      sexo,
      color,
      tamaño,
      fotos,
      ubicacion,
    });

    await nuevaMascota.save();

    res.status(201).json({ mensaje: 'Mascota creada con éxito' });
  } catch (error) {
    console.error(`Error al crear mascota: ${error.message}`);
    next(error);
  }
};

export const obtenerMascotas = async (req, res, next) => {
    try {
      const mascotas = await Mascota.find({ estadoAdopcion: 'Disponible' });
      res.status(200).json(mascotas);
    } catch (error) {
      console.error(`Error al obtener mascotas: ${error.message}`);
      next(error);
    }
  };
  
  // Controlador para obtener una mascota por ID
export const obtenerMascota = async (req, res, next) => {
    try {
      const mascotaId = req.params.id;
  
      // Busca la mascota por su ID en la base de datos
      const mascota = await Mascota.findById(mascotaId);
  
      if (!mascota) {
        return res.status(404).json({ mensaje: 'Mascota no encontrada' });
      }
  
      // Respuesta exitosa con la mascota encontrada
      res.status(200).json(mascota);
    } catch (error) {
      console.error(`Error al obtener mascota: ${error.message}`);
      next(error);
    }
  };
  
  export const actualizarMascota = async (req, res, next) => {
    try {
      const { estadoAdopcion, ...updateData } = req.body;
  
      const options = { new: true };
      const mascotaActualizada = await Mascota.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        options
      );
  
      res.status(200).json(mascotaActualizada);
    } catch (error) {
      console.error(`Error al actualizar mascota: ${error.message}`);
      next(error);
    }
  };
  
  export const eliminarMascota = async (req, res, next) => {
    try {
      await Mascota.findByIdAndRemove(req.params.id);
      res.status(200).json({ mensaje: 'Mascota eliminada con éxito' });
    } catch (error) {
      console.error(`Error al eliminar mascota: ${error.message}`);
      next(error);
    }
  };
  