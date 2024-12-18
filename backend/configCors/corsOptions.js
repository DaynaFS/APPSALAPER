const corsOptions = {
    origin: 'http://localhost:3000', // Cambiar al dominio de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  };
  
  module.exports = corsOptions;
  