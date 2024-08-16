const readline = require('readline');
const fs = require('fs');
const path = require("path");

// Crear una interfaz de lectura de línea
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú de ajustes en plantillas
const mostrarMenuMasivos = () => {
  console.log("\nMenú de Envio de Mensajes a toda la Organización:");
  console.log("1. Envío de plantilla a toda la Organización");
  console.log("2. Envío de mensaje personalizado a toda la Organización");
};



      mostrarMenuMasivos();
      // Preguntar al usuario qué acción desea realizar en las plantillas
      rl.question('Por favor elija una opción de envíos masivos: ', (masivoOption) => {
        // Convertir la opción de plantillas a un número entero
        const optionMasivo = parseInt(masivoOption);
        // Ejecutar la acción correspondiente
        switch(optionMasivo) {
          case 1:
            console.log("\x1b[36m%s\x1b[0m","Estás ingresando al módulo de envío de plantilla a toda la Organización.");
            // Ejecutar el archivo para agregar plantilla
            ejecutarArchivo(path.join(__dirname, '../../handlers/general/enviarplantillamasiva.js'));
            break;
          case 2:
            console.log("\x1b[36m%s\x1b[0m","Estás ingresando al módulo de envío de mensajes personalizados a toda la Organización.");
            // Ejecutar el archivo para borrar plantilla
            ejecutarArchivo(path.join(__dirname, '../../handlers/general/enviarmensajemasivo.js'));
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
