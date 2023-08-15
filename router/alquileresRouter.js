import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import { conexion } from '../db/atlas.js';

const alquileresRouter = Router();

alquileresRouter.get('/activo', limitPet(), async (req, res) => {
    let db = await conexion();
    let resultado = await db.collection("Alquiler").aggregate([
        {
          $match: { 
            Estado: "Activo", 
          }
        },
        {
          $lookup: {
            from: "Cliente",
            localField: "ID_Cliente",
            foreignField: "_id",
            as: "Cliente"
          }
        },
        {
          $unset: 
            [
            "Fecha_Fin",
            "Fecha_Inicio",
            "_id"
            ]    
        }  
      ]).toArray();
    res.send(resultado);
});

alquileresRouter.get('/:id', limitPet(), async (req, res) => {
  let db = await conexion();
  let resultado = await db.collection("Alquiler").find({_id: parseInt(req.params.id)}).toArray();
  res.send(resultado);
});

export default alquileresRouter;