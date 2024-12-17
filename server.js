const express = require('express');
const path = require('path');
const { getVoiceMembers } = require('./bot/bot'); // Asegúrate de que esta importación sea válida
const app = express();

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener los miembros conectados
app.get('/api/voice-members', (req, res) => {
    const members = getVoiceMembers(); // Llamamos a la función para obtener los miembros actualizados
    res.json(members); // Responde con los miembros en formato JSON
});

// Carga la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Exporta el app para que Vercel lo maneje
module.exports = app;
