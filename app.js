import express from 'express';
import dotenv from 'dotenv';
import appJWT from './router/JWT.js';
import { validateToken } from './middleware/token.js';
import clientesRouter from './router/clientesRouter.js';
import automovilesRouter from './router/automovilesRouter.js';
import contratosRouter from './router/contratosRouter.js';
import empleadosRouter from './router/empleadosRouter.js';
dotenv.config();
const app = express();
app.use(express.json());

app.use("/token", appJWT);

app.use('/clientes', validateToken, clientesRouter);
app.use('/automoviles', validateToken, automovilesRouter); 
app.use('/empleados', validateToken, empleadosRouter);
app.use('/contratos', validateToken, contratosRouter);
//app.use('/registros', validateToken, sucursalesAutomovilesRouter);

let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
    console.log(`Server is running on http:${config.hostname}:${config.port}`);
});