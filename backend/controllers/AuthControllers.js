//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const users = []; // Simulación en memoria, reemplázalo con una base de datos real.

//const SECRET_KEY = 'your_secret_key';

exports.login = async (req, res) => {
    const { email, password } = req.body;
if (email === 'test@example.com' && password === 'password') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  // Aquí deberías registrar al usuario en la base de datos
  res.status(201).json({ message: 'Usuario registrado exitosamente' });
};
