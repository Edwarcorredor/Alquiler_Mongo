import Router from 'express';
import { limitPet } from '../middleware/configLimit.js';
import { conexion } from '../db/atlas.js';

const sucursalesRouter = Router();

sucursalesRouter.get('/', limitPet(), async (req, res) => {
    let db = await conexion();
    let resultado = await db.collection("SucursalAutomovil").find().toArray();
    res.send(resultado);
});

sucursalesRouter.get('/cantidad', limitPet(), async (req, res) => {
    let db = await conexion();
    let resultado = await db.collection("SucursalAutomovil").aggregate([
        {
          $lookup: {
            from: "Sucursal",
            localField: "ID_Sucursal",
            foreignField: "_id",
            as: "Sucursal_Automovil"
          }
        }, 
        {
          $unset: 
            [
            "ID_Sucursal",
            "ID_Automovil",
            "_id",
            ]    
        }     
    ]).toArray();
    res.send(resultado);
});

export default sucursalesRouter;