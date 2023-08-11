import {Transform, Expose } from "class-transformer";
import { IsDefined} from 'class-validator';
import {conexion} from '../db/conexion_db.js';

export class Clientes{
    /**
    ** Variables de entrada:
    ** id_vehiculo, id_clase_alarma
    */
    @Expose({name: "CLIENTE_ID"})
    @Transform(({value}) => {
    let data = /^([1-9]\d*)$/g.test(value);
    if (data && typeof value == "number"){ 
        return Number(value);
    } 
    else{
        throw {status:401, message:"Error en el CLIENTE_ID"};
    }    
    })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro CLIENTE_ID es obligatorio"}}})
    ID_Cliente: number

    @Expose({name: "NAME"})
    @Transform(({value}) => {
        let data = /^[a-zA-Z ]+$/g.test(value);
        if ( data && typeof value == "string"){ 
            return String(value);
        } 
        else{
            throw {status:401, message:"Error en el NAME"};
        }    
      })
    @IsDefined({ message: 'El parametro NAME es obligatorio.' })
    Nombre: string

    @Expose({name: "LAST_NAME"})
    @Transform(({value}) => {
        let data = /^[a-zA-Z ]+$/g.test(value);
        if ( data && typeof value == "string"){ 
            return String(value);
        } 
        else{
            throw {status:401, message:"Error en el LAST_NAME"};
        }    
      })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro LAST_NAME es obligatorio"}}})
    Apellido: string

    @Expose({name: "NUMBER_DNI"})
    @Transform(({value}) => {
    let data = /^([1-9]\d*)$/g.test(value);
    if (data){ 
        return String(value);
    } 
    else{
        throw {status:401, message:"Error en el NUMBER_DNI"};
    }    
    })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro NUMBER_DNI es obligatorio"}}})
    DNI: string


    @Expose({name: "ADDRESS"})
    @Transform(({value}) => {
        let data = /^([a-zA-Z0-9\s.,#-])|undefined+$/i.test(value);
        if ( data){ 
            return String(value);
        } 
        else{
            throw {status:401, message:"Error en el ADDRESS"};
        }    
    })
    Direccion: string

    @Expose({name: "PHONE"})
    @Transform(({value}) => {
        let data = /^(?:[1-9]\d*|undefined)$/g.test(value);
        if (data){ 
            return String(value);
        } 
        else{
            throw {status:401, message:"Error en el PHONE"};
        }    
    })
    Telefono: string

    @Expose({name: "EMAIL"})
    @Transform(({value}) => {
        let data = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|undefined+$/g.test(value);
        if (data){ 
            return String(value);
        } 
        else{
            throw {status:401, message:"Error en el EMAIL"};
        }    
    })
    Email: string

    constructor(p1:number = 10, p2:string = "nombre", p3:string = "apellido", p4:string ="123", p5:string = "carea122", p6:string ="123", p7:string = "edaca@gmail.com"){
        this.ID_Cliente = p1;
        this.Nombre = p2;
        this.Apellido  = p3;
        this.DNI = p4;
        this.Direccion = p5;
        this.Telefono = p6;
        this.Email = p7;
    }

    set guardar(body:object){
        conexion.query(/*sql*/`INSERT INTO Cliente SET ?`,
        body,
        (err, data, fields)=>{
         console.log(err)
         console.log(data)
         console.log(fields)
        });
    }



    get allTabla(){
        const cox = conexion.promise();
        return (async()=>{
          const [rows, fields] = await cox.execute(/*sql*/`
          SELECT * FROM Cliente
          `);
          return rows;
        })();
    }


}