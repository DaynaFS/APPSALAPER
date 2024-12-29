const notificationsServ = require('../services/notificationsServ');

const sendNotification = async (req, res) => {
  const { target, message } = req.body;

  try {
    const result = await notificationsServ.sendNotification(target, message);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error enviando notificación:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  sendNotification,
};
