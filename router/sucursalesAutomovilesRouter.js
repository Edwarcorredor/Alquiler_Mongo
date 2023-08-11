import { Router } from 'express'
import { conexion } from '../db/conexion_db.js';

const sucursalesAutomovilesRouter = Router();

sucursalesAutomovilesRouter.get('/', (req,res)=>{
    conexion.query(/*sql*/`SELECT ID_Sucursal, Cantidad_Disponible FROM Sucursal_Automovil`,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    });
});

export default sucursalesAutomovilesRouter;