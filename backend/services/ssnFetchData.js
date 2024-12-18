import axios from 'axios';
import { parseStringPromise } from 'react-native-xml2js';
import Constants from 'expo-constants';

const fetchSSNData = async () => {
  const ssnUrl = Constants.expoConfig.extra.SSN_RSS_URL; 

  try {
   
    const response = await axios.get(ssnUrl);

    const parsedData = await parseStringPromise(response.data);

    const items = parsedData?.rss?.channel?.[0]?.item || [];
    return items.map((item) => {
      const contentSnippet = item.description?.[0] || 'Descripción no disponible';
      const dateMatch = contentSnippet.match(/Fecha:(.*?)(\n|$)/);
      const date = dateMatch ? dateMatch[1].trim() : 'Fecha no disponible';

      return {
        title: item.title?.[0] || 'Título no disponible',
        date,
        link: item.link?.[0] || 'Enlace no disponible',
        description: contentSnippet,
      };
    });
  } catch (error) {
    console.error('Error al obtener datos del SSN:', error.message);
    throw error;
  }
};

export default fetchSSNData;
