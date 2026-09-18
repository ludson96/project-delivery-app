import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Delivery App API',
      version: '1.0.0',
      description: 'API REST profissional para o Delivery App, suportando controle de pedidos, autenticação e tempo real.',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'authorization',
          in: 'header',
          description: 'Token JWT enviado no cabeçalho `authorization`',
        },
      },
    },
  },
  apis: ['./src/routers/*.ts', './src/api/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
