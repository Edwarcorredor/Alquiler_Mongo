import { Router } from 'express'
import { conexion } from '../db/conexion_db.js';

const empleadosRouter = Router();


empleadosRouter.get('/', (req, res)=>{
    conexion.query(/*sql*/`SELECT * FROM Empleado WHERE Cargo = "Vendedor"`,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    });
});

empleadosRouter.get('/cargo', (req, res)=>{
    conexion.query(/*sql*/`SELECT * FROM Empleado WHERE Cargo = 'Gerente' OR Cargo = 'Asistente'`,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    });
});

export default empleadosRouter;