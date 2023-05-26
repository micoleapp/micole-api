const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

// Ruta de la carpeta que contiene las rutas
const routesFolder = 'src/routes';

// Obtener la lista de archivos en la carpeta routes
const routeFiles = fs.readdirSync(routesFolder);

// Filtrar los archivos .js solamente
const jsRouteFiles = routeFiles.filter(file => path.extname(file) === '.js');

// Construir la ruta completa de cada archivo .js
const routePaths = jsRouteFiles.map(file => path.join(routesFolder, file));


// Opciones de configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MiCole API',
      version: '1.0.0',
      description: 'Documentación v1 de MiCole API',
    },
  },
  apis: routePaths,
};

// Generar la documentación Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware para mostrar la interfaz de Swagger UI
const swaggerDocs = (app, port) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Swagger UI disponible en http://localhost:${port}`);
};

module.exports = { swaggerDocs };
