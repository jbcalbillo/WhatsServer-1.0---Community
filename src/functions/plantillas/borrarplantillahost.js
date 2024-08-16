const mysql = require('mysql');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'carlos',
  password: 'carlos',
  database: 'directorio'
});

// Conectarse a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log("\x1b[32m%s\x1b[0m",'Conexión establecida con la base de datos MySQL');
  solicitarNombrePlantilla();
});

// Función para solicitar al usuario el nombre de la plantilla a borrar
function solicitarNombrePlantilla() {
  rl.question('Ingrese el nombre de la plantilla a borrar: ', (nombrePlantilla) => {
    if (!nombrePlantilla) {
      console.log("\x1b[32m%s\x1b[0m",'¡El nombre de la plantilla es obligatorio!');
      solicitarNombrePlantilla(); // Volver a solicitar el nombre de la plantilla
    } else {
      // Verificar si la plantilla existe en la tabla y confirmar su eliminación
      confirmarBorrado(nombrePlantilla);
    }
  });
}

// Función para confirmar el borrado de una plantilla antes de realizar la operación
function confirmarBorrado(nombrePlantilla) {
  connection.query('SELECT plantilla FROM plantillas WHERE plantilla = ?', nombrePlantilla, (err, rows) => {
    if (err) {
      console.error('Error al buscar la plantilla en la base de datos:', err);
      rl.close();
      connection.end();
      return;
    }

    // Verificar si se encontró la plantilla con el nombre proporcionado
    if (rows.length === 0) {
      console.log('No se encontró ninguna plantilla con el nombre proporcionado.');
      rl.close();
      connection.end();
      return;
    }

    // Mostrar confirmación y esperar respuesta del usuario
    rl.question(`¿Seguro deseas borrar la plantilla "${nombrePlantilla}"? (S/N): `, (respuesta) => {
      if (respuesta.toLowerCase() === 's') {
        borrarPlantilla(nombrePlantilla); // Borrar la plantilla si la respuesta es 'S'
      } else {
        console.log('Operación cancelada.');
        rl.close();
        connection.end();
      }
    });
  });
}

// Función para borrar una plantilla de la base de datos MySQL por su nombre
function borrarPlantilla(nombrePlantilla) {
  connection.query('DELETE FROM plantillas WHERE plantilla = ?', nombrePlantilla, (err, result) => {
    if (err) {
      console.error('Error al borrar la plantilla de la base de datos:', err);
    } else if (result.affectedRows === 0) {
      console.log('No se encontró ninguna plantilla con el nombre proporcionado.');
    } else {
      console.log(`La plantilla "${nombrePlantilla}" ha sido borrada exitosamente de la base de datos.`);
    }
    rl.close();
    connection.end(); // Cerrar la conexión a la base de datos
  });
}
