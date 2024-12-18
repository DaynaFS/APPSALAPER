exports.getUserProfile = (req, res) => {
    // Usa req.user para obtener los datos del token JWT
    res.json({ email: req.user.email, message: 'Perfil del usuario' });
  };
  
  exports.updateUserProfile = (req, res) => {
    const { email } = req.user;
    const { name } = req.body;
    // Actualiza los datos del usuario en la base de datos
    res.json({ email, name, message: 'Perfil actualizado correctamente' });
  };
  