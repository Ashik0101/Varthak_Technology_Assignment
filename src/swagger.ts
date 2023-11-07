import swaggerJsDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Varthak Technology Books API",
      version: "1.0.0",
      description: "The Swagger Documentation of Varthak Technology Books API",
    },
    servers: [
      {
        url: "http://localhost:4002",
        description: "Development Server",
      },
      {
        url: "https://tacniques-task-managment.onrender.com",
        description: "Deployed Server",
      },
    ],
  },
  apis: ["swagger.yaml"],
};

const swaggerSpec = swaggerJsDoc(options);
export default swaggerSpec;
