import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import { conexion } from '../db/atlas.js';

const sucursalesRouter = Router();

sucursalesRouter.get('/', limitPet(), async (req, res) => {
    let db = await conexion();
    let resultado = await db.collection("SucursalAutomovil").find().toArray();
    res.send(resultado);
});

export default sucursalesRouter;