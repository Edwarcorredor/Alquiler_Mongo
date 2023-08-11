import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {Clientes} from '../controller/Clientes.js'
import {validate} from 'class-validator';
const middleClientes = express();

middleClientes.use(async(req,res,next)=>{

    try {
        let data;
        if(req.method=="GET" || req.method=="DELETE"){
            data = plainToClass(Clientes, req.data.interfaceData, { excludeExtraneousValues: true });
        }
        else{
            data = plainToClass(Clientes, req.body, { excludeExtraneousValues: true });
        }
        await validate(data);
        req.body = data;
        req.data = JSON.stringify(data);
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})

export {middleClientes}