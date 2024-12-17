const express = require('express');
const path = require('path');
const { getVoiceMembers } = require('../bot/bot'); // Cambié la importación
const app = express();
const PORT = 3000;

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/voice-members', (req, res) => {
    const members = getVoiceMembers();  // Llamamos a la función para obtener los miembros actualizados
    res.json(members);  // Responde con los miembros en formato JSON
});

// Carga la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Servidor web corriendo en http://localhost:${PORT}`));

