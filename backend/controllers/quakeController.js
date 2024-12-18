const { fetchSSNData } = require('../services/ssnFetchService');
const { getAllItems, putItem } = require('../services/dynamoDbService');

// Obtener el historial de sismos desde DynamoDB
const getEarthquakeHistory = async (req, res) => {
  try {
    const data = await getAllItems();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener historial de sismos', error: error.message });
  }
};

// Guardar datos sísmicos en DynamoDB
const saveEarthquakeData = async (req, res) => {
  try {
    const earthquakeData = await fetchSSNData();
    for (const earthquake of earthquakeData) {
      await putItem(earthquake);
    }

    res.status(200).json({ message: 'Datos de sismos guardados en la base de datos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar datos de sismos', error: error.message });
  }
};

module.exports = {
  getEarthquakeHistory,
  saveEarthquakeData,
};
