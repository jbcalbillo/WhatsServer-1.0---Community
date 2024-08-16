const readline = require('readline');
const fs = require('fs');
const path = require('path');
const express = require('express');
const apiRoute = require("./src/routes/routes");
const app = express();

const PORT = process.env.PORT || 3015;

app.use(express.json());

app.use("/whatsapp", apiRoute);

app.listen(PORT, () => {
    console.log("el puerto es: " + PORT)});



// Crear una interfaz de lectura de línea
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Mostrar las opciones al usuario
console.log("Menú principal:");
console.log("\x1b[32m%s\x1b[0m", "1. Usuarios");
console.log("\x1b[33m%s\x1b[0m", "2. Plantillas");
console.log("\x1b[35m%s\x1b[0m", "3. Mensajes Individuales");
console.log("\x1b[35m%s\x1b[0m", "4. Mensajes por Área");
console.log("\x1b[35m%s\x1b[0m", "5. Mensajes a toda la organización");
console.log("\x1b[31m%s\x1b[0m", "6. Salir");

// Preguntar al usuario qué opción desea seleccionar
rl.question('Elige una opción del Menú Principal: ', (answer) => {
  const option = parseInt(answer);

  switch(option) {
    case 1:
      console.log("\x1b[37m%s\x1b[0m","Ingresando al menú de Usuarios.");
      ejecutarArchivo(path.join(__dirname, './src/routes/menus/menuUsuarios.js'));
      break;
    case 2:
      console.log("\x1b[37m%s\x1b[0m","Ingresando al menú Plantillas.");
      ejecutarArchivo(path.join(__dirname, './src/routes/menus/menuPlantillas.js'));
      break;
    case 3:
      console.log("\x1b[37m%s\x1b[0m","Ingresando a múdulo de Envíos Individuales.");
      ejecutarArchivo(path.join(__dirname, './src/routes/menus/menuEIndividual.js'));
      break;
    case 4:
      console.log("\x1b[37m%s\x1b[0m","Ingresando a múdulo de Envíos por Área.");
      ejecutarArchivo(path.join(__dirname, './src/routes/menus/menuGroupMessage.js'));
      break;
    case 5:
      console.log("\x1b[37m%s\x1b[0m","Ingresando a múdulo de Envíos Generales.");
      ejecutarArchivo(path.join(__dirname, './src/routes/menus/menuGeneralMessage.js'));
      break;
    default:
      console.log("\x1b[31m%s\x1b[0m","Opción no válida.");
  }

  rl.close();
});

// Función para ejecutar un archivo
const ejecutarArchivo = (archivo) => {
  fs.access(archivo, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`El archivo ${archivo} no existe.`);
      return;
    }
    try {
      require(archivo);
    } catch (error) {
      console.error(`Error al ejecutar el archivo ${archivo}:`, error);
    }
  });
};
