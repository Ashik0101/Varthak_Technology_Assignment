"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
