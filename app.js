import express from 'express';
import dotenv from 'dotenv';
import appJWT from './router/JWT.js';
import {validateJWT} from "./middleware/middleJWT.js";
import clientesRouter from './router/clientesRouter.js';
import automovilesRouter from './router/automovilesRouter.js';
import alquileresRouter from './router/alquileresRouter.js';
import reservasRouter from './router/reservasRouter.js';
import empleadosRouter from './router/empleadosRouter.js';
import sucursalesAutomovilesRouter from './router/sucursalesAutomovilesRouter.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use("/token", appJWT);

app.use('/clientes', validateJWT, clientesRouter);
app.use('/automoviles', validateJWT, automovilesRouter); 
app.use('/alquileres', validateJWT, alquileresRouter);
app.use('/reservas', validateJWT, reservasRouter);
app.use('/empleados', validateJWT, empleadosRouter);
app.use('/sucursalesAutomoviles', validateJWT, sucursalesAutomovilesRouter);

let config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, () => {
    console.log(`Server is running on http:${config.hostname}:${config.port}`);
});