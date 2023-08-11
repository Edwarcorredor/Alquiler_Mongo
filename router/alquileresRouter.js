import { Router } from 'express'
import { conexion } from '../db/conexion_db.js';

const alquileresRouter = Router();

alquileresRouter.get('/', (req,res)=>{
    conexion.query(/*sql*/`SELECT C.* FROM Cliente AS C INNER JOIN Alquiler AS A  ON A.ID_Cliente = C.ID_Cliente WHERE A.Estado = "Activo" `,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    });
});

alquileresRouter.get('/:id', (req, res)=>{
    conexion.query(/*sql*/`SELECT * FROM Alquiler WHERE ID_Alquiler = ?`,
    req.params.id,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    });
});

alquileresRouter.get('/costo/:id', (req, res)=>{
    conexion.query(/*sql*/`SELECT Costo_Total FROM Alquiler WHERE ID_Alquiler = ?`,
    req.params.id,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    });
});

alquileresRouter.get('/fechas/:fecha', (req, res)=>{
    conexion.query(/*sql*/`SELECT * FROM Alquiler WHERE Fecha_Inicio = ?`,
    [req.params.fecha],
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    }); 
});

export default alquileresRouter;
