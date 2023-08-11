import { Router } from 'express'
import { conexion } from '../db/conexion_db.js';

const automovilesRouter = Router();

automovilesRouter.get('/', (req,res)=>{
    conexion.query(/*sql*/`SELECT * FROM Automovil`,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    });
});

automovilesRouter.get('/capacidad', (req,res)=>{
    conexion.query(/*sql*/`SELECT * FROM Automovil WHERE Capacidad > 5 `,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    });
});
export default automovilesRouter;
