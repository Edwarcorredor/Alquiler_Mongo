import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import middleClientes from '../middleware/middleClientes.js';
const clientesRouter = Router();

clientesRouter.get('/todos', limitPet(), middleClientes,async (req, res) => {
    res.send(await req.body.allTabla());
});

clientesRouter.get('/:DNI', limitPet(), middleClientes, async (req, res) => {
    res.send(await req.body.dniEspeci(req.params.DNI));
});

clientesRouter.get('/alquiler/minimo', limitPet(), middleClientes, async (req, res) => {
    res.send(await req.body.alquiler());
});

export default clientesRouter;