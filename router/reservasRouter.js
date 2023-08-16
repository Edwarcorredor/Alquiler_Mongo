import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import { conexion } from '../db/atlas.js';

const reservasRouter = Router();

reservasRouter.get('/pendiente', limitPet(), async (req, res) => {
    let db = await conexion();
    let resultado = await db.collection("Reserva").aggregate([
        {
          $match: {      
            Estado: "Pendiente", 
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
          $lookup: {
            from: "Automovil",
            localField: "ID_Automovil",
            foreignField: "_id",
            as: "Automovil"
          }
        } ,
        {
          $unset: 
            [
            "Fecha_Fin",
            "Fecha_Inicio",
            "Automovil"
            ]    
        }  
      ]).toArray();
    res.send(resultado);
});

reservasRouter.get('/cliente/:id', limitPet(), async (req, res) => {
  let db = await conexion();
  let resultado = await db.collection("Reserva").find({ID_Cliente: parseInt(req.params.id)}, {_id:0}).toArray();
  res.send(resultado);
});

reservasRouter.get('/reserva/:id', limitPet(), async (req, res) => {
  let db = await conexion();
  let resultado = await db.collection("Reserva").aggregate([
    {
      $match: { 
        ID_Cliente: parseInt(req.params.id)
      }
    },
    {
      $lookup: {
        from: "Cliente",
        localField: "ID_Cliente",
        foreignField: "_id",
        as: "Cliente"
      }
    }
  ]).toArray();
  res.send(resultado);
});

export default reservasRouter;