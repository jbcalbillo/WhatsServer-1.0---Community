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

// Función para conectarse a la base de datos
function connectToDatabase() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        reject(err);
      } else {
        console.log("\x1b[32m%s\x1b[0m",'Conexión establecida con la base de datos MySQL');
        resolve();
      }
    });
  });
}

// Función para solicitar al usuario los datos de la nueva plantilla
function solicitarDatosPlantilla() {
  return new Promise((resolve) => {
    rl.question('Ingrese el nombre de la plantilla: ', (plantilla) => {
      rl.question('Ingrese el código de idioma (ej. es_MX, en_US, etc.): ', (code) => {
        const newPlantilla = { plantilla, code };
        resolve(newPlantilla);
      });
    });
  });
}

// Función para verificar duplicados
function verificarDuplicados(plantilla) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM plantillas WHERE plantilla = ?', [plantilla.plantilla], (err, rows) => {
      if (err) {
        console.error('Error al verificar duplicados en la base de datos:', err);
        reject(err);
      } else if (rows.length > 0) {
        console.log(`La plantilla ${plantilla.plantilla} ya está creada. No se pudo agregar la plantilla debido a duplicados.`);
        resolve(true); // Hay duplicados
      } else {
        resolve(false); // No hay duplicados
      }
    });
  });
}

// Función para agregar una nueva plantilla a la base de datos MySQL
function agregarPlantilla(plantilla) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO plantillas SET ?', plantilla, (err, result) => {
      if (err) {
        console.error('Error al insertar la plantilla en la base de datos:', err);
        reject(err);
      } else {
        console.log('La plantilla ha sido agregada exitosamente a la base de datos.');
        resolve();
      }
    });
  });
}

// Función principal que ejecuta el flujo completo
async function ejecutarProceso() {
  try {
    await connectToDatabase();
    const nuevaPlantilla = await solicitarDatosPlantilla();
    const existeDuplicado = await verificarDuplicados(nuevaPlantilla);
    if (!existeDuplicado) {
      await agregarPlantilla(nuevaPlantilla);
    }
  } catch (error) {
    console.error('Se produjo un error durante el proceso:', error);
  } finally {
    rl.close();
    connection.end(); // Cerrar la conexión a la base de datos
  }
}

// Iniciar el proceso
ejecutarProceso();
