const express = require('express');
const Parser = require('rss-parser');
const cors = require('cors');
const helmet = require('helmet'); // Protección de cabeceras HTTP
const fetchSSNData = require('./ssnFetchData');

const app = express();
const parser = new Parser();
const PORT = 3000;

// Middleware
app.use(cors()); // Permitir CORS para solicitudes desde otras aplicaciones
app.use(helmet()); // Protección básica de cabeceras HTTP

// URL del feed RSS de SSN
const rssFeedUrl = 'http://www.ssn.unam.mx/rss/ultimos-sismos.xml';

// Función para procesar el feed y filtrar los eventos
async function fetchAndFilterEarthquakes() {
  try {
    const feed = await parser.parseURL(rssFeedUrl);

    return feed.items
      .filter(item => {
        const magnitudeMatch = item.title.match(/Magnitud:\s(\d+\.\d+)/);
        if (!magnitudeMatch) return false; // Si no tiene magnitud, lo omite

        const magnitude = parseFloat(magnitudeMatch[1]);
        return magnitude >= 3.0; // Filtra solo eventos de magnitud >= 3.0
      })
      .map(event => {
        const magnitudeMatch = event.title.match(/Magnitud:\s(\d+\.\d+)/);
        const locationMatch = event.title.match(/Latitud:\s([-+]?\d*\.\d+|\d+),\sLongitud:\s([-+]?\d*\.\d+|\d+)/);

        // Extrae magnitud, latitud, longitud si están disponibles
        const magnitude = magnitudeMatch ? parseFloat(magnitudeMatch[1]) : "No disponible";
        const latitude = locationMatch ? parseFloat(locationMatch[1]) : "No disponible";
        const longitude = locationMatch ? parseFloat(locationMatch[2]) : "No disponible";

        return {
          title: event.title,
          date: event.pubDate ? new Date(event.pubDate).toLocaleString() : "Fecha no disponible",
          magnitude: magnitude,
          latitude: latitude,
          longitude: longitude,
          link: event.link
        };
      });
  } catch (error) {
    console.error("Error al procesar el feed:", error);
    throw new Error("Error al procesar el feed de sismos");
  }
}

// Endpoint para obtener los eventos sísmicos filtrados
app.get('/api/filtered-earthquakes', async (req, res) => {
  try {
    const filteredEvents = await fetchAndFilterEarthquakes();
    res.status(200).json({
      message: "Eventos sísmicos de magnitud >= 3.0",
      count: filteredEvents.length,
      events: filteredEvents
    });
  } catch (error) {
    console.error("Error en el endpoint /api/filtered-earthquakes:", error);
    res.status(500).json({ message: "Error al procesar el feed de sismos" });
  }
});

// Ruta principal para mensaje de bienvenida
app.get('/', (req, res) => {
  res.send("Bienvenido a la API de monitoreo sísmico");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
