import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import { conexion } from '../db/atlas.js';

const contratosRouter = Router();


contratosRouter.get('/:id', limitPet(), async (req, res) => {
  let db = await conexion();
  let resultado = await db.collection("Contrato").find({ID: parseInt(req.params.id)}).toArray();
  res.send(resultado);
});

export default contratosRouter;