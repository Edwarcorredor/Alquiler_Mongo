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

En el archivo .env del proyecto configurar las variables de entorno de acuerdo a su usuario y acceso a base de datos.

```
MY_CONFIG = {"hostname":"127.0.0.5", "port":3000}

MY_DATABASE = { "host": "localhost", "user": "root", "password": "", "database": "vehiculos_autonomos", "port": 3306}

JWT_PRIVATE_KEY = "Edwar"
```

​    

​		MY_CONFIG: Corresponde al servidor que se creará con Express

​		MY_DATABASE: La información para la conexión con la base de datos

​		JWT_PRIVATE_KEY: Llave privada para la creación del token

### Ejecución

Para poner en marcha el proyecto, sigue estos pasos:

1. Abre dos terminales.
2. En la primera terminal, ejecuta el siguiente comando para iniciar el servidor:

```
npm run dev
```

3. En la segunda terminal, utiliza el siguiente comando para compilar el código TypeScript:

```
npm run tsc
```

### Token acceso

Para obtener el token de acceso a las tablas, es necesario realizar una petición GET al siguiente endpoint:

```
http://127.0.0.5:3000/token?tabla=nombre_tabla
```

​    

En el query "nombre_tabla", deberás  ingresar el nombre de la tabla de la cual deseas obtener los datos. Las  tablas a las cuales puedes acceder son las siguientes:

- clientes
- automoviles
- alquileres
- reservas
- empleados
- surcursalesAutomoviles

Por ejemplo, si deseas obtener acceso a los datos de la tabla "clientes", la solicitud sería:

```
http://127.0.0.5:3000/token?tabla=clientes
```

### Acceso a las Tablas

1.Mostrar todos los clientes registrados en la base de datos

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/clientes
```

Para ingresar datos en la tabla  se debe realizar una peticion POST al siguiente endpoint, y enviarle datos por medio del body:

```
http://127.0.0.5:3000/clientes
```

2.Obtener todos los automóviles disponibles para alquiler.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/automoviles
```

3.Listar todos los alquileres activos junto con los datos de los
clientes relacionados.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/alquileres
```

4.Mostrar todas las reservas pendientes con los datos del cliente
y el automóvil reservado.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/reservas
```

5.Obtener los detalles del alquiler con el ID_Alquiler específico.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/alquileres/id
```

Se debe enviar el valor del id en los parametros, por ejemplo: 

```
http://127.0.0.5:3000/alquileres/1
```

6.Listar los empleados con el cargo de "Vendedor".

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/empleados
```

7.Mostrar la cantidad total de automóviles disponibles en cada
sucursal.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/sucursalesAutomoviles
```

8.Obtener el costo total de un alquiler específico.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/alquileres/costo/id
```

Se debe enviar el valor del id en los parametros, por ejemplo: 

```
http://127.0.0.5:3000/alquileres/costo/1
```

9.Listar los clientes con el DNI específico.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/clientes/DNI
```

Se debe enviar el valor del DNI en los parametros, por ejemplo: 

```
http://127.0.0.5:3000/clientes/123456
```

10.Mostrar todos los automóviles con una capacidad mayor a 5
personas.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/automoviles/capacidad
```

11.Obtener los detalles del alquiler que tiene fecha de inicio en
'2023-07-05'.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/alquileres/fechas/fecha
```

Se debe enviar el valor del fecha en los parametros, por ejemplo: 

```
http://127.0.0.5:3000/alquileres/fechas/2023-07-05
```

12.Listar las reservas pendientes realizadas por un cliente
específico.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/alquileres/pendientes/id
```

Se debe enviar el valor del id en los parametros, por ejemplo: 

```
http://127.0.0.5:3000/alquileres/pendientes/1
```

13.Mostrar los empleados con cargo de "Gerente" o "Asistente".

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/empleados/cargo
```

14.Obtener los datos de los clientes que realizaron al menos un
alquiler.

Se debe acceder al endpoint con una peticion GET:

```
http://127.0.0.5:3000/clientes/alquiler
```

