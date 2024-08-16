const readline = require("readline");
const fs = require("fs");
const path = require("path");

// Crear una interfaz de lectura de línea
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú de ajustes en plantillas
const mostrarMenuPlantillas = () => {
  console.log("\nMenú de Ajustes en Plantillas:");
  console.log("\x1b[36m%s\x1b[0m","1. Agregar Plantilla");
  console.log("\x1b[31m%s\x1b[0m","2. Borrar Plantilla");
  console.log("\x1b[32m%s\x1b[0m","3. Ver Plantillas");
};

// Mostrar el menú de ajustes en plantillas
mostrarMenuPlantillas();

      // Preguntar al usuario qué acción desea realizar en las plantillas
      rl.question('Por favor elija una opción de ajustes en plantillas: ', (plantillaOption) => {
        // Convertir la opción de plantillas a un número entero
        const optionPlantilla = parseInt(plantillaOption);
        // Ejecutar la acción correspondiente
        switch(optionPlantilla) {
          case 1:
            console.log("\x1b[36m%s\x1b[0m","Estas ingresando al modulo de alta de plantillas.");
            // Ejecutar el archivo para agregar plantilla
            ejecutarArchivo(path.join(__dirname, '../../functions/plantillas/agregarplantillahost.js'));
            break;
          case 2:
            console.log("\x1b[31m%s\x1b[0m","Estas ingresando al modulo de baja de plantillas.");
            // Ejecutar el archivo para borrar plantilla
            ejecutarArchivo(path.join(__dirname, '../../functions/plantillas/borrarplantillahost.js'));
            break;
          case 3:
            console.log("\x1b[32m%s\x1b[0m","Presentando lista de Plantillas.");
            // Ejecutar el archivo para ver plantillas
            ejecutarArchivo(path.join(__dirname, '../../sources/plantillas.js'));
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
