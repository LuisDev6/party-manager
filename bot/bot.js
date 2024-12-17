require('dotenv').config(); // Importa dotenv para cargar variables de entorno

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

let voiceMembers = []; // Lista de usuarios conectados exportada al servidor
const channelId = '1308063307667865630'; // Reemplaza con el ID del canal de voz

client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
    // Actualiza la lista de usuarios al iniciar
    updateVoiceMembers();
});

client.on('voiceStateUpdate', () => {
    // Cada vez que cambia el estado de voz, actualiza la lista
    updateVoiceMembers();
});

function updateVoiceMembers() {
    const channel = client.channels.cache.get(channelId);
    if (channel && channel.isVoiceBased()) { // Verifica que el canal es de voz
        voiceMembers = [...channel.members.values()].map(member => member.nickname || member.user.username); // Toma el apodo si existe
        console.log('Usuarios conectados:', voiceMembers);
    } else {
        console.log('No se encontró el canal de voz o no es válido.');
    }
}

// Esta es la función que debes exportar
function getVoiceMembers() {
    return voiceMembers;
}

module.exports = { getVoiceMembers };  // Exportamos la función correctamente

const token = process.env.DISCORD_TOKEN; // Carga el token desde el archivo .env
client.login(token);
