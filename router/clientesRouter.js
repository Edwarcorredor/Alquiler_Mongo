import Router from 'express';
import { limitGet } from '../middleware/configLimit.js';
import middleClientes from '../middleware/middleClientes.js';
const clientesRouter = Router();

clientesRouter.get('/', limitGet(), middleClientes,(req, res) => {
    
});

export default clientesRouter;