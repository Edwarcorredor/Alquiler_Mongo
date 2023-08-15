import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import { conexion } from '../db/atlas.js';

const empleadosRouter = Router();

empleadosRouter.get('/vendedor', limitPet(), async (req, res) => {
    let db = await conexion();
    let resultado = await db.collection("Empleado").find({Cargo: "Vendedor"},{_id: 0}).toArray();
    res.send(resultado);
  });
  
  export default empleadosRouter;