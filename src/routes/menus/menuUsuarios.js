const readline = require('readline');
const fs = require('fs');
const path = require("path");


// Crear una interfaz de lectura de línea
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú de ajustes en Usuarios
  const mostrarMenuUsuarios = () => {
  console.log("\nMenú de Ajustes en Usuarios:");
  console.log("\x1b[36m%s\x1b[0m", "1. Agregar Usuario");
  console.log("\x1b[31m%s\x1b[0m", "2. Borrar Usuario");
  console.log("\x1b[32m%s\x1b[0m", "3. Ver Usuarios");
};

mostrarMenuUsuarios();


      rl.question('Por favor elija una opción de ajustes en usuarios: ', (usuarioOption) => {
        // Convertir la opción de plantillas a un número entero
        const optionUsuario = parseInt(usuarioOption);
        // Ejecutar la acción correspondiente
        switch(optionUsuario) {
          case 1:
            console.log("\x1b[36m%s\x1b[0m","Estas ingresando al modulo de alta de usuarios en el directorio.");
            // Ejecutar el archivo para agregar usuarios
            ejecutarArchivo(path.join(__dirname, '../../functions/usuarios/agregarusuario.js'));
            break;
          case 2:
            console.log("\x1b[31m%s\x1b[0m","Estas ingresando al modulo de baja de usuarios en el directorio.");
            // Ejecutar el archivo para borrar usuarios
            ejecutarArchivo(path.join(__dirname, '../../functions/usuarios/borrarusuario.js'));
            break;
          case 3:
              console.log("\x1b[32m%s\x1b[0m","Presentando la lista de usuarios en el directorio.");
              // Ejecutar el archivo para borrar usuarios
              ejecutarArchivo(path.join(__dirname, '../../functions/usuarios/borrarrusuario.js'));
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
