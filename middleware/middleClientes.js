import 'reflect-metadata';
import {plainToInstance} from 'class-transformer';
import {Clientes} from '../controller/Clientes.js'
import {validate} from 'class-validator';


const middleClientes = async(req,res,next)=>{
    try {
        let data;
        if(req.method=="GET" || req.method=="DELETE"){
            data = plainToInstance(Clientes, {}, { ignoreDecorators: true })
        }
        else{
            data = plainToInstance(Clientes, req.body, { excludeExtraneousValues: true });
        }
        await validate(data);
        req.body = data;
        req.data = JSON.stringify(data);
        next();
    } catch (err) {
        res.status(err.status).json(err);
    }
}

export default middleClientes;