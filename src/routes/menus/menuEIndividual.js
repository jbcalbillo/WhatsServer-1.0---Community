const readline = require("readline");
const fs = require("fs");
const path = require("path");

// Crear una interfaz de lectura de línea
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú de ajustes en plantillas
const mostrarMenuIndividualMessage = () => {
  console.log("\nMenú de Envio de Mensajes Individuales:");
  console.log("\x1b[36m%s\x1b[0m","1. Envío de mensaje personalizado individual");
  console.log("\x1b[32m%s\x1b[0m","2. Envío de plantilla individual");
};

      mostrarMenuIndividualMessage();
      // Preguntar al usuario qué acción desea realizar en las plantillas
      rl.question('Por favor elija una opción de envíos individuales: ', (individualOption) => {
        // Convertir la opción de plantillas a un número entero
        const optionIndividual = parseInt(individualOption);
        // Ejecutar la acción correspondiente
        switch(optionIndividual) {
          case 1:
            console.log("Has seleccionado Envío de mensaje personalizado individual.");
            // Ejecutar el archivo para agregar plantilla
            ejecutarArchivo(path.join(__dirname, '../../handlers/single/enviarmensajeind.js'));
            break;
          case 2:
            console.log("Has seleccionado Envío de plantilla individual.");
            // Ejecutar el archivo para borrar plantilla
            ejecutarArchivo(path.join(__dirname, '../../handlers/single/enviarplantillaindividual.js'));
            break;
                      default:
            console.log("Opción no válida.");
        }
        // Cerrar la interfaz de lectura de línea
        rl.close();
      });


// Función para ejecutar un archivo
const ejecutarArchivo = (archivo) => {
  fs.access(archivo, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`El archivo ${archivo} no existe.`);
      return;
    }
    // Ejecutar el archivo
    require(archivo);
  });
};