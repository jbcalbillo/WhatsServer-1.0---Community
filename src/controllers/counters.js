// counters.js

// Definición de los contadores
let contadorMensajesEnviados = 0;
let contadorPlantillasEnviadas = 0;

// Funciones para incrementar los contadores
function incrementarContadorMensajesEnviados() {
  return ++contadorMensajesEnviados;
}

function incrementarContadorPlantillasEnviadas() {
  return ++contadorPlantillasEnviadas;
}

// Exportación de las variables y funciones
module.exports = {
  contadorMensajesEnviados,
  contadorPlantillasEnviadas,
  incrementarContadorMensajesEnviados,
  incrementarContadorPlantillasEnviadas
};

