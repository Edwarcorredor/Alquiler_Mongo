import { Router } from 'express'
import { conexion } from '../db/conexion_db.js';

const reservasRouter = Router();

reservasRouter.get('/', (req,res)=>{
    conexion.query(/*sql*/`SELECT R.ID_Automovil, C.* FROM Cliente AS C INNER JOIN Reserva AS R  ON C.ID_Cliente = R.ID_Cliente WHERE R.Estado = "Pendiente" `,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    });
});

reservasRouter.get('/pendientes/:id',(req,res)=>{
    conexion.query(/*sql*/`SELECT * FROM Reserva WHERE Estado = "Pendiente" AND ID_Cliente = ? `,
    req.params.id,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    }); 
});

export default reservasRouter;