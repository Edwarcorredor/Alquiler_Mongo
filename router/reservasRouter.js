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

export default reservasRouter;