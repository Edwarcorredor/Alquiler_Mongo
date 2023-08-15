import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import middleClientes from '../middleware/middleClientes.js';
const clientesRouter = Router();

clientesRouter.get('/', limitPet(), middleClientes,async (req, res) => {
    res.send(await req.body.allTabla());
});

export default clientesRouter;