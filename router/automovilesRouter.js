import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import { conexion } from '../db/atlas.js';
const automovilesRouter = Router();

automovilesRouter.get('/disponible', limitPet(), async (req, res) => {
    let db = await conexion();
    let resultado = await db.collection("Contrato").aggregate([
      {
          $match: { 
              Estado: "Disponible", 
          }
      },
      {
          $lookup: {
              from: "Automovil",
              localField: "ID_Automovil",
              foreignField: "ID",
              as: "Automoviles"
          }
      },
      {
        $unwind : "$Automoviles"
      },
      {
          $project: {
              _id:0,
              "Automoviles":1
          }
      }
  ]).toArray();
    res.send( resultado);  
});

export default automovilesRouter;