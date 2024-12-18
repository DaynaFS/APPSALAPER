// backend/routes/auth.js
const express = require('express');
const session = require('express-session');
const AWS = require('aws-sdk');
const router = express.Router();

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: 'us-east-1',
});

router.post('/reset-password', async (req, res) => {
  const { username, code, newPassword } = req.body;
  const params = {
    ClientId: 'tu-client-id', // Reemplaza con tu Client ID
    Username: username,
    ConfirmationCode: code,
    Password: newPassword,
  };

  try {
    await cognito.confirmForgotPassword(params).promise();
    res.status(200).send({ message: 'Contraseña restablecida exitosamente' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
