const axios = require('axios');
const { obtenerPlantillas, obtenerCodigoIdiomaPorPlantilla, obtenerAreas, obtenerNumerosTelefonosPorArea } = require('../../config/dbConnector');
const { metaToken } = require('../../config/config'); // Importa el token de acceso desde config.js
const readline = require('readline');

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

const enviarMensajePorArea = async (plantillaSeleccionada, numerosTelefonos, codigoIdioma) => {
  for (const numeroTelefono of numerosTelefonos) {
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

    const config = {
      method: 'post',
      url: 'https://graph.facebook.com/v20.0/35/messages',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${metaToken}`
      },
      data: JSON.stringify(dataPlantilla)
    };

    try {
      const response = await axios.request(config);
      console.log(`Mensaje enviado a ${numeroTelefono}:`, response.data);
    } catch (error) {
      console.error(`Error al enviar mensaje a ${numeroTelefono}:`, error.response?.data || error.message);
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

    const areasDisponibles = await obtenerAreas();
    for (const areaSeleccionada of areasDisponibles) {
      const numerosTelefonosPorArea = await obtenerNumerosTelefonosPorArea(areaSeleccionada);
      await enviarMensajePorArea(plantillaSeleccionada, numerosTelefonosPorArea, codigoIdioma);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};

main();
