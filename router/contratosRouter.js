import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import { conexion } from '../db/atlas.js';

const contratosRouter = Router();

contratosRouter.get('/activo', limitPet(), async (req, res) => {
    let db = await conexion();
    let resultado = await db.collection("Contrato").aggregate([
        {
          $match: { 
            Estado: "Activo",
            Tipo: "Alquiler"
          }
        },
        {
          $lookup: {
            from: "Cliente",
            localField: "ID_Cliente",
            foreignField: "ID",
            as: "Clientes"
          }
        },
        {
          $unwind: '$Clientes'
        },
        {
          $project: { 
            _id: 0,
            "Clientes": 1
          }
        }
      ]).toArray();
    res.send(resultado);
});

export default contratosRouter;