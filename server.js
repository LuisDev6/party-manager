const express = require('express');
const path = require('path');
const cors = require('cors');
const { getVoiceMembers } = require('./bot/bot'); // Asegúrate de que ./bot/bot sea correcto

const app = express();
const PORT = process.env.PORT || 3000;

// Lista de orígenes permitidos para solicitudes CORS
const allowedOrigins = ['https://luisdev6.github.io', 'http://127.0.0.1:5500', 'http://localhost:3000', 'https://party-manager-gilt.vercel.app'];

// Configuración de CORS
app.use(cors({
    origin: (origin, callback) => {
        // Permitir solicitudes sin origen (como Postman) o desde orígenes permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por la política de CORS'));
        }
    }
}));

// Archivos estáticos (sirve la carpeta "public" para archivos HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener miembros de voz
app.get('/api/voice-members', (req, res) => {
    try {
        const members = getVoiceMembers(); // Asegúrate de que esta función retorne datos válidos
        res.json(members); // Responde con los datos como JSON
    } catch (error) {
        console.error('Error obteniendo los miembros de voz:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor
app.listen(PORT, () => console.log(`Servidor web corriendo en http://localhost:${PORT}`));

