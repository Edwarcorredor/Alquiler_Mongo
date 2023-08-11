import express from 'express';
import dotenv from 'dotenv';
import appJWT from './router/JWT.js';
import { validateToken } from './middleware/token.js';


dotenv.config();
const app = express();
app.use(express.json());

app.use("/token", appJWT);

app.use('/clientes', validateToken, clientesRouter);
app.use('/automoviles', validateToken, automovilesRouter); 
app.use('/alquileres', validateToken, alquileresRouter);
app.use('/reservas', validateToken, reservasRouter);
app.use('/empleados', validateToken, empleadosRouter);
app.use('/sucursalesAutomoviles', validateToken, sucursalesAutomovilesRouter);

let config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, () => {
    console.log(`Server is running on http:${config.hostname}:${config.port}`);
});