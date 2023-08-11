import { Router } from 'express'
import { middleClientes } from '../middleware/middleClientes.js'
import { conexion } from '../db/conexion_db.js';

const clientesRouter = Router();

clientesRouter.get('/', middleClientes, async(req,res)=>{
  res.send(await req.body.allTabla);
});

clientesRouter.post('/', middleClientes, (req,res)=>{
    req.body.guardar = JSON.parse(req.data);
    res.json({status: 201, message: "Datos guardados"});
  });

clientesRouter.get('/:DNI', (req,res)=>{
    conexion.query(/*sql*/`SELECT * FROM Cliente WHERE DNI = ?`,
    req.params.DNI,
    (err, data, fields)=>{
     console.log(err)
     console.log(data)
     console.log(fields)
     res.send(data);
    }); 
} )

clientesRouter.get('/alquiler', (req,res)=>{
  conexion.query(/*sql*/`SELECT * FROM Cliente WHERE Cliente.ID_Cliente = Alquiler.ID_Cliente`,
  (err, data, fields)=>{
   console.log(err)
   console.log(data)
   console.log(fields)
   res.send(data);
  });
});

export default clientesRouter;