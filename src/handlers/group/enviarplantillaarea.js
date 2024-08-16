const axios = require('axios');
const { obtenerPlantillas, obtenerCodigoIdiomaPorPlantilla, obtenerAreas, obtenerNombresPorArea, obtenerNumerosTelefonosPorArea } = require('../../config/dbConnector');
 // Importa el token de acceso desde config.js
const readline = require('readline');
const facebookMessageURL = 'https://graph.facebook.com/v20.0/2535/messages';
const metaToken = 'EOhT5Mnn';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const solicitarInput = async (mensaje) => {
  return new Promise((resolve) => {
    rl.question(mensaje, (respuesta) => {
      resolve(respuesta);
    });
  });
};

const enviarMensajePorArea = async (plantillaSeleccionada, numerosTelefonos, codigoIdioma ) => {
  for (const numeroTelefono of numerosTelefonos) {
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

  }
};

const main = async () => {
  try {
    const plantillaNombres = await obtenerPlantillas();
    console.log('Plantillas disponibles:');
    plantillaNombres.forEach((nombre, index) => {
      console.log(`${index + 1}. ${nombre}`);
    });

    const opcionPlantilla = await solicitarInput('Seleccione el número de la plantilla: ');
    const plantillaSeleccionada = plantillaNombres[opcionPlantilla - 1];

    const codigoIdioma = await obtenerCodigoIdiomaPorPlantilla(plantillaSeleccionada);

    console.log('Áreas disponibles:');
    const areasDisponibles = await obtenerAreas();
    areasDisponibles.forEach((area, index) => {
      console.log(`${index + 1}. ${area}`);
    });

    const opcionArea = await solicitarInput('Seleccione el número del área para la cual se enviará la plantilla: ');
    const areaSeleccionada = areasDisponibles[opcionArea - 1];

    const numerosTelefonosPorArea = await obtenerNumerosTelefonosPorArea(areaSeleccionada);
    await enviarMensajePorArea(plantillaSeleccionada, numerosTelefonosPorArea,codigoIdioma);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};

main();
