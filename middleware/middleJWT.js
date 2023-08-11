import dotenv from 'dotenv'
import { SignJWT, jwtVerify } from 'jose';
import express from 'express';
import 'reflect-metadata';
import {plainToClass, classToPlain } from 'class-transformer';
import { Clientes } from '../controller/Clientes.js';



const tokenJWT = express();
const validateJWT = express();
dotenv.config("../");

tokenJWT.use(async(req,res,next)=>{
    let inst;
    switch (req.query.tabla) {
        case 'clientes':
            inst = plainToClass(Clientes, {}, { ignoreDecorators: true })
            break;
        
        case 'automoviles':
            inst = {"automoviles": "automoviles"};
            break;
        
        case 'alquileres':
            inst = {"alquileres": "alquileres"};
            break;

        case 'reservas':
            inst = {"reservas": "reservas"};
            break;
        
        case 'empleados':
            inst = {"empleados": "empleados"};
            break;

        case 'sucursalesAutomoviles':
            inst = {"sucursalesAutomoviles": "sucursalesAutomoviles"};
            break;
        

        default:
            res.json({status: 406, message: "No se puede generar el token"});
            break;
    }
   
    let interfaceData = classToPlain(inst);
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT({interfaceData});
    
    const jwt = await jwtconstructor
    .setProtectedHeader({alg:"HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime("25m")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    req.data = jwt;
    next();
})
validateJWT.use(async(req,res,next)=>{
    const {authorization} = req.headers;
    if (!authorization) return res.json({status: 401, message: "Token no enviado"});
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        req.data = jwtData.payload;
        next();
    } catch (error) {
        res.json({status: 401, message: "Token caducado"});
    }
})
export {
    tokenJWT,
    validateJWT
};