import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import { conexion } from '../db/atlas.js';
const automovilesRouter = Router();

automovilesRouter.get('/disponible', limitPet(), async (req, res) => {
    let db = await conexion();
    let resultado = await db.collection("Alquiler").aggregate([
        {
            $match: { 
                Estado: "Disponible", 
            }
        },
        {
            $lookup: {
                from: "Automovil",
                localField: "ID_Automovil",
                foreignField: "_id",
                as: "Automovil"
            }
        },
        {
            $unwind: "$Automovil" // Desenrollar el array "Automovil"
        },
        {
            $unset: ["_id", "Estado", "ID_Cliente", "Fecha_Inicio", "Fecha_Fin", "Costo_Total","ID_Automovil" ] // Eliminar campos no deseados
        },
        {
            $set: {
                Automovil: "$Automovil" // Establecer el campo "Automovil" en el valor deseado
            }
        }
    ]).toArray();
    
    res.send(resultado);  
});

automovilesRouter.get('/capacidad', limitPet(), async (req,res) => {
    let db = await conexion();
    let resultado = await db.collection("Automovil").find({ Capacidad: { $gt: 5 } }, { _id: 0 }).toArray(); 
    res.send(resultado);
});

automovilesRouter.get('/ordenado', limitPet(), async (req,res) => {
    let db = await conexion();
    let resultado = await db.collection("Automovil").find({}, { _id: 0 }).sort({ Marca: 1, Modelo: 1 }).toArray();
    res.send(resultado);
});


export default automovilesRouter;