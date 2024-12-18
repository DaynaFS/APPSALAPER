const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/Auth');
const secureRoutes = require('./routes/SecureAuth');
const corsOptions = require('./configCors/corsOptions');
const connectDB = require('./config/db'); // Archivo para conectar la base de datos
const earthquakeRoutes = require('./routes/quake');

dotenv.config();

const app = express();

connectDB();

//mmiddlewares
app.use(express.json()); 
app.use(cors(corsOptions)); 
app.use(morgan('dev')); 


//rutas públicas 
app.use('/auth', authRoutes);

//rutas protegidas
app.use('/secure', secureRoutes);


app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

//error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error en el servidor', error: err.message });
});

//servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
