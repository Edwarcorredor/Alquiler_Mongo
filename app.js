import express from 'express';
import dotenv from 'dotenv';
import appJWT from './router/JWT.js';
import { validateToken } from './middleware/token.js';
import clientesRouter from './router/clientesRouter.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use("/token", appJWT);

app.use('/clientes', validateToken, clientesRouter);
//app.use('/automoviles', validateToken, automovilesRouter); 
//app.use('/sucursales', validateToken, reservasRouter);
//app.use('/contratos', validateToken, empleadosRouter);
//app.use('/registros', validateToken, sucursalesAutomovilesRouter);

let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
    console.log(`Server is running on http:${config.hostname}:${config.port}`);
});