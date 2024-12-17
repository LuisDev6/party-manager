const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa cors
const { getVoiceMembers } = require('./bot/bot');
const app = express();

// Configurar CORS para permitir solicitudes desde GitHub Pages
const corsOptions = {
    origin: 'https://luisdev6.github.io', // Cambia este dominio según sea necesario
};
app.use(cors(corsOptions)); // Aplica la configuración de CORS

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener los miembros conectados
app.get('/api/voice-members', (req, res) => {
    const members = getVoiceMembers();
    res.json(members);
});

// Sirve el archivo index.html por defecto
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
