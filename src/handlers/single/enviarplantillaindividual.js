// Importar las dependencias necesarias
const axios = require('axios');
const { obtenerPlantillas, obtenerCodigoIdiomaPorPlantilla } = require('../../config/dbConnector');
const readline = require('readline');
const fs = require('fs');
const outputConsole = new console.Console(fs.createWriteStream("./output.txt", { flags: "a"}, { encoding: "utf-8"}, { autoDestroy: false}, { autoFlush: false}));
const contadorPlantillasEnviadas = require("../../controllers/counters");


// URL de la API de mensajes de Facebook y el token de autenticación
const facebookMessageURL = 'https://graph.facebook.com/v20.0/25/messages';
const metaToken = 'EyxM8GhT5Mnn';
// let contadorPlantillasEnviadas = 0;
// Crear la interfaz de línea de comandos para interactuar con el usuario
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

const obtenerHoraActual = () => {
  const ahora = new Date();
  return ahora.toLocaleString(); // Devuelve la fecha y hora en formato local
};


// Función para enviar un mensaje a un número de teléfono usando una plantilla seleccionada
const enviarMensaje = async (plantillaSeleccionada, numeroTelefono, codigoIdioma) => {
  try {
    // Datos del mensaje en formato JSON
    const dataPlantilla = {
      messaging_product: "whatsapp",
      to: numeroTelefono,
      type: "template",
      template: {
        name: plantillaSeleccionada,
        language: {
          code: codigoIdioma // Utiliza el código de idioma obtenido
        }
      }
    };

    // Configuración de la solicitud
    const config = {
      method: 'post',
      url: facebookMessageURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${metaToken}`
      },
      data: JSON.stringify(dataPlantilla)
    };

    // Enviar la solicitud
    const response = await axios.request(config);
    contadorPlantillasEnviadas++;
    console.log(`Plantilla ${plantillaSeleccionada} enviada a ${numeroTelefono}:`, response.data);
  } catch (error) {
    console.error(`Error al enviar plantilla a ${numeroTelefono}:`, error.response ? error.response.data : error.message);
  }
};

// Obtener las plantillas disponibles y permitir al usuario elegir una
const main = async () => {
  const horaActual = obtenerHoraActual();
  try {
    const plantillaNombres = await obtenerPlantillas();
    console.log('Plantillas disponibles:');
    plantillaNombres.forEach((nombre, index) => {
      console.log(`${index + 1}. ${nombre}`);
    });

    const opcionPlantilla = await solicitarInput('Seleccione el número de la plantilla: ');
    const plantillaSeleccionada = plantillaNombres[opcionPlantilla - 1];

    // Obtener el código de idioma correspondiente a la plantilla seleccionada
    const codigoIdioma = await obtenerCodigoIdiomaPorPlantilla(plantillaSeleccionada);

    // Solicitar al usuario que ingrese el número de teléfono
    const numeroTelefono = await solicitarInput('Ingrese el número de teléfono: ');

    // Enviar el mensaje con la plantilla seleccionada y el número de teléfono ingresado
    await enviarMensaje(plantillaSeleccionada, numeroTelefono, codigoIdioma);
    outputConsole.log("\nMensaje de tipo Plantilla Individual");
    outputConsole.log(`Plantilla individual enviada a: ${numeroTelefono}`);
    outputConsole.log(`Nombre de plantilla enviada: "${plantillaSeleccionada}"`);
    outputConsole.log(`Hora de envío: ${horaActual}`);
    outputConsole.log(`Total de plantillas enviadas: ${contadorPlantillasEnviadas}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};

// Ejecutar la función principal
main();
