const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa CORS
const { getVoiceMembers } = require('./bot/bot'); // Asegúrate de que esté correcto

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS solo para tu dominio de GitHub Pages
app.use(cors({
    origin: 'https://luisdev6.github.io'
}));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/voice-members', (req, res) => {
    const members = getVoiceMembers();
    res.json(members);
});

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Servidor web corriendo en http://localhost:${PORT}`));
