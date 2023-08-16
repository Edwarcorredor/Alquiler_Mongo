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
npm i -E -D express class-transformer class-validator dotenv jose mongodb nodemon reflect-metadata typescript
```

​    

  

- express: https://github.com/expressjs/express
- class-transformer: https://github.com/typestack/class-transformer
- class-validator: https://github.com/typestack/class-validator
- dotenv: https://github.com/motdotla/dotenv
- jose: https://github.com/panva/jose
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

```bash
MY_SERVER = { "hostname": "127.10.10.10", "port":5020}

ATLAS_PASSWORD ="password"

ATLAS_USER="user"

ATLAS_DB="AutosDB"
```

​    

```bash
	MY_SERVER: Corresponde al servidor que se creará con Express

	ATLAS_PASSWORD: Contraseña de tu Atlas

	ATLAS_USER: Usuario de tu cuenta de Atlas
	
	ATLAS_DB = Base de datos que eliges para crear los documentos
```

### Ejecución

Para poner en marcha el proyecto, sigue estos pasos:

1. Abre dos terminales.
2. En la primera terminal, ejecuta el siguiente comando para iniciar el servidor:

```bash
npm run dev
```

3. En la segunda terminal, utiliza el siguiente comando para compilar el código TypeScript:

```bash
npm run tsc
```

### Token acceso

Para obtener el token de acceso a las tablas, es necesario realizar una petición GET al siguiente endpoint:

```bash
http://127.0.0.5:3000/token?tabla=nombre_tabla
```

​    

En el query "nombre_tabla", deberás  ingresar el nombre de la tabla de la cual deseas obtener los datos. Las  tablas a las cuales puedes acceder son las siguientes:

- clientes
- automoviles
- alquileres
- reservas
- empleados
- surcursales

Por ejemplo, si deseas obtener acceso a los datos de la tabla "clientes", la solicitud sería:

```bash
http://127.0.0.5:3000/token?tabla=clientes
```

## Rutas

### Alquileres

#### GET /alquileres/activo

Obtiene una lista de alquileres activos con detalles de clientes.

#### GET /alquileres/:id

Obtiene los detalles de un alquiler por su ID.

#### GET /alquileres/costo/:id

Obtiene el costo total de un alquiler por su ID.

#### GET /alquileres/busqueda/fecha

Busca alquileres por fecha de inicio.

#### GET /alquileres/cantidad/total

Obtiene la cantidad total de alquileres.

#### GET /alquileres/fecha/inicio

Obtiene alquileres en un rango de fechas de inicio.

### Automóviles

#### GET /automoviles/disponible

Obtiene una lista de automóviles disponibles para alquilar.

#### GET /automoviles/capacidad

Obtiene automóviles con capacidad superior a 5.

#### GET /automoviles/ordenado

Obtiene automóviles ordenados por marca y modelo.

#### GET /automoviles/cantidad

Obtiene la cantidad de automóviles disponibles con capacidad 5 y en estado disponible.

### Clientes

#### GET /clientes/todos

Obtiene todos los clientes de la base de datos.

#### GET /clientes/:DNI

Obtiene los detalles de un cliente por su número de DNI.

#### GET /clientes/alquiler/minimo

Obtiene los clientes que han realizado al menos un alquiler.

### Empleados

#### GET /empleados/vendedor

Obtiene los empleados con cargo de "Vendedor".

#### GET /empleados/cargos

Obtiene empleados con cargo de "Gerente" o "Asistente".

### Reservas

#### GET /reservas/pendiente

Obtiene reservas pendientes con detalles de clientes y automóviles.

#### GET /reservas/cliente/:id

Obtiene las reservas de un cliente por su ID.

#### GET /reservas/reserva/:id

Obtiene las reservas de un cliente por su ID, incluyendo detalles de cliente.

### Sucursales

#### GET /sucursales

Obtiene una lista de sucursales de automóviles.

#### GET /sucursales/cantidad

Obtiene la cantidad de automóviles por sucursal.

------

**Nota:** Reemplaza `/alquileres`, `/automoviles`, `/clientes`, `/empleados`, `/reservas` y `/sucursales` con la ruta base correspondiente de tu API.