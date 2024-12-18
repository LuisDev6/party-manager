const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa CORS
const { getVoiceMembers } = require('./bot/bot'); // Asegúrate de que esté correcto

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['https://luisdev6.github.io', 'http://127.0.0.1:5500'];

// Habilitar CORS sin restricciones (o limita a tu frontend si es necesario)
app.use(cors({
    origin: (origin, callback) => {
        // Permite solicitudes desde los orígenes definidos o desde clientes sin origen (como Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por la política de CORS'));
        }
    }
}));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/voice-members', (req, res) => {
    const members = getVoiceMembers(); // Llama a la función para obtener los usuarios
    res.json(members); // Devuelve la lista como JSON
});

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Servidor web corriendo en http://localhost:${PORT}`));
