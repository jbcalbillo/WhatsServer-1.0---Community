const readline = require("readline");
const fs = require("fs");
const path = require("path");

// Crear una interfaz de lectura de línea
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú de ajustes en plantillas
const mostrarMenuArea = () => {
  console.log("\nMenú de Envio de Mensajes por area:");
  console.log("\x1b[36m%s\x1b[0m","1. Envío de plantilla a una area");
  console.log("\x1b[32m%s\x1b[0m","2. Envío de mensaje personalizado a una area");
};

mostrarMenuArea();


      // Preguntar al usuario qué acción desea realizar en las plantillas
      rl.question('Por favor elija una opción de envíos por area: ', (groupOption) => {
        // Convertir la opción de plantillas a un número entero
        const optionGroup = parseInt(groupOption);
        // Ejecutar la acción correspondiente
        switch(optionGroup) {
          case 1:
            console.log("\x1b[36m%s\x1b[0m","Estás ingresando al módulo de envío de plantilla por area.");
            // Ejecutar el archivo para agregar plantilla
            ejecutarArchivo(path.join(__dirname, '../../handlers/group/enviarplantillaarea.js'));
            break;
          case 2:
            console.log("\x1b[36m%s\x1b[0m","Estás ingresando al módulo de envío de mensajes personalizados por area.");
            // Ejecutar el archivo para borrar plantilla
            ejecutarArchivo(path.join(__dirname, '../../handlers/group/enviarmensajearea.js'));
            break;
          default:
            console.log("\x1b[31m%s\x1b[0m","Opción no válida.");
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
