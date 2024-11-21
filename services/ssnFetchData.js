// ssnFetchData.js
import RSSParser from 'react-native-rss-parser';

// Función para obtener y devolver los datos de SSN
const fetchSSNData = async () => {
  try {
    // Obtiene el feed RSS desde la URL
    const response = await fetch('http://www.ssn.unam.mx/rss/ultimos-sismos.xml');
    const responseData = await response.text();
    const feed = await RSSParser.parse(responseData);
    
    // Imprime la estructura del feed para verificar
    console.log("Estructura del feed:", feed.items.slice(0, 3)); // Imprime los primeros 3 elementos para revisión

    // Procesa los datos para devolver solo lo necesario
    return feed.items.map(item => {
      // Extrae la fecha y otros datos del elemento
      const dateMatch = item.description ? item.description.match(/Fecha:(.*?)(\n|$)/) : null;
      const date = dateMatch ? dateMatch[1].trim() : 'Fecha no disponible';

      return {
        title: item.title || "Título no disponible",
        date: date,
        link: item.links?.[0]?.url || "Enlace no disponible",
        description: item.description || "Descripción no disponible",
      };
    });
  } catch (error) {
    console.error('Error al obtener datos de SSN:', error);
    return [];
  }
};

// Exporta la función para su uso en otros archivos
export default fetchSSNData;
