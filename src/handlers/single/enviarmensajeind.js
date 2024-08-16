const axios = require('axios');
const readline = require('readline');
const fs = require('fs');
const { incrementarContadorMensajesEnviados } = require("../../controllers/counters");

const outputConsole = new console.Console(fs.createWriteStream("./output.txt", { flags: "a", encoding: "utf-8" }));

// Configura la URL de Facebook y el token de acceso
const facebookMessageURL = 'https://graph.facebook.com/v20.0/255/messages';
const metaToken = 'EAZBpAWZABrwhT5Mnn';

// Crear la interfaz de línea de comandos para solicitar entradas al usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para solicitar entrada del usuario
const solicitarInput = async (mensaje) => {
  return new Promise((resolve) => {
    rl.question(mensaje, (respuesta) => {
      resolve(respuesta);
    });
  });
};

// Función para obtener la hora actual en un formato legible
const obtenerHoraActual = () => {
  const ahora = new Date();
  return ahora.toLocaleString(); // Devuelve la fecha y hora en formato local
};

// Función para enviar un mensaje a un número de teléfono usando la API de WhatsApp
const enviarMensajeANumero = async (mensaje, numeroTelefono) => {
  try {
    // Datos del mensaje en formato JSON
    const data = {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": numeroTelefono,
      "type": "text",
      text: {
        body: mensaje // Usamos el mensaje ingresado por el usuario
      }
    };

    // Configuración de la solicitud para WhatsApp
    const config = {
      method: 'post',
      url: facebookMessageURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${metaToken}`
      },
      data: data
    };

    // Enviar la solicitud
    const response = await axios.request(config);
    const contador = incrementarContadorMensajesEnviados();
    console.log(`Mensaje enviado a ${numeroTelefono}:`, response.data);
    return contador;
  } catch (error) {
    console.error(`Error al enviar mensaje a ${numeroTelefono}:`, error.response ? error.response.data : error.message);
  }
};

// Función principal para ejecutar el script
const main = async () => {
  try {
    // Solicitar al usuario que ingrese el número de teléfono al que se enviará el mensaje
    const numeroTelefono = await solicitarInput('Ingrese el número de teléfono al que se enviará el mensaje: ');

    // Solicitar al usuario que ingrese el mensaje a enviar
    const mensaje = await solicitarInput('Ingrese el mensaje a enviar: ');
    const horaActual = obtenerHoraActual();
    
    // Enviar el mensaje al número de teléfono proporcionado por el usuario
    const contador = await enviarMensajeANumero(mensaje, numeroTelefono);
    
    outputConsole.log("\nMensaje de tipo Individual");
    outputConsole.log(`Mensaje individual enviado a: ${numeroTelefono}`);
    outputConsole.log(`Mensaje del texto enviado: "${mensaje}"`);
    outputConsole.log(`Hora de envío: ${horaActual}`);
    outputConsole.log(`Mensaje no: ${contador}`);
    
  } catch (error) {
    console.error('Error:', error);
    outputConsole.log(error);
  } finally {
    rl.close();
  }
};

main();

module.exports = { outputConsole };
