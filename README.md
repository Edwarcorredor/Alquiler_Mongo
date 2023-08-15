# Filtro Automoviles

Para instalar y utilizar este proyecto, siga los siguientes pasos:

1. Asegúrese de tener [Node.js](https://nodejs.org/) instalado en su sistema.

   ​    

Abra el terminal en la carpeta raiz del repositorio e instale las siguientes dependencias.

```
npm init -y
```

​    

```
npm i -E -D express class-transformer class-validator dotenv jose mysql2 nodemon reflect-metadata typescript
```

​    

  

- express: https://github.com/expressjs/express
- class-transformer: https://github.com/typestack/class-transformer
- class-validator: https://github.com/typestack/class-validator
- dotenv: https://github.com/motdotla/dotenv
- jose: https://github.com/panva/jose
- mysql2: https://github.com/sidorares/node-mysql2
- nodemon: https://github.com/remy/nodemon
- reflect-metadata: https://github.com/typestack/class-transformer

Luego editar el archivo package.json y agregarle `"type":"module"`

Ahora para crear el archivo tsconfig.json debe ejecutar el siguiente comando

```
 npx tsc --init
```

​    

Y lo configura de la siguiente manera

```
 {
   "compilerOptions": {
    "target": "es6",
    "module": "ES6",
    "moduleResolution": "node",
    "outDir": "./controller",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
     }
  }
```

​   