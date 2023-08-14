import Router from 'express';
import { limitGet } from '../middleware/configLimit.js';
import middleClientes from '../middleware/middleClientes.js';
const clientesRouter = Router();

clientesRouter.get('/', limitGet(), middleClientes,async (req, res) => {
    res.send(req.body.allTabla());
});

export default clientesRouter;