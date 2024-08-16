const axios = require('axios');
const readline = require('readline');
const { obtenerTodosLosNumerosDeTelefono } = require('../../config/dbConnector'); // Asumiendo que esta función obtiene todos los números

// Configura la URL de Facebook y el token de acceso
const facebookMessageURL = 'https://graph.facebook.com/v20.0/25/messages';
const metaToken = 'EAAM'
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
    console.log(`Mensaje enviado a ${numeroTelefono}:`, response.data);
  } catch (error) {
    console.error(`Error al enviar mensaje a ${numeroTelefono}:`, error.response ? error.response.data : error.message);
  }
};

// Función principal para ejecutar el script
const main = async () => {
  try {
    // Solicitar al usuario que ingrese el mensaje a enviar
    const mensaje = await solicitarInput('Ingrese el mensaje a enviar: ');

    // Obtener todos los números de teléfono desde la base de datos
    const numerosDeTelefono = await obtenerTodosLosNumerosDeTelefono();

    // Enviar el mensaje a todos los números de teléfono
    for (const numeroTelefono of numerosDeTelefono) {
      await enviarMensajeANumero(mensaje, numeroTelefono);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};

main();
