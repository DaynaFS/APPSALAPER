const dynamoDbService = require('../services/dynamoDbService');

const createItem = async (req, res) => {
  try {
    const item = req.body;
    await dynamoDbService.putItem(item);
    res.status(200).json({ message: 'Item creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el item' });
  }
};

module.exports = {
  createItem,
};
