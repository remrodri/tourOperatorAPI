import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mi APIREST",
      version: "1.0.0",
      description: "Documentacion de mi APIREST",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/modules/*.ts"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
