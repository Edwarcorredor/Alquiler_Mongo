import 'reflect-metadata';
import dotenv from 'dotenv';
import { SignJWT, jwtVerify } from 'jose';



dotenv.config("../");

const tablas = {
    "clientes": "clientes",
    "empleados": "empleados",
    "automoviles": "automoviles",
    "sucursales":"sucursales",
    "sucursales_automoviles":"sucursales_automoviles",
    "alquileres": "alquileres",
    "reservas": "reservas",
    "registro_entregas": "registro_entregas",
    "registro_devoluciones": "registro_devoluciones"
}

const createToken = async(req,res)=>{
    if (tablas[req.query.tabla] === undefined){
        return res.status(406).send('Error al generar token, especifique una tabla válida')
    } 
    const encoder = new TextEncoder();
    const jwtConstructor = await new SignJWT({ TablaCreada: tablas[req.query.tabla] })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    res.send(jwtConstructor);
}

const validateToken = async(req,res,next)=>{
    const { authorization } = req.headers;
    if (!authorization) return res.status(404).send('Falta el token de autorización');
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        if (!(jwtData.payload.TablaCreada === req.baseUrl.split('/')[1])) return res.status(401).send('Token incorrecto para esta tabla');
        req.payloadJWT = jwtData.payload; 
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('No autorizado');
        
    }
}

export {
    createToken,
    validateToken
};