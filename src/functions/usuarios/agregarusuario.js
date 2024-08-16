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
  solicitarDatosUsuario();
});

// Función para solicitar al usuario los datos del nuevo usuario
function solicitarDatosUsuario() {
console.log("\x1b[36m%s\x1b[0m",'Ingrese los datos del nuevo usuario:');
  rl.question('Teléfono del usuario: ', (number) => {
    rl.question('Nombre del usuario: ', (name) => {
      rl.question('Puesto del usuario: ', (puesto) => {
        rl.question('Localidad del usuario: ', (localidad) => {
          rl.question('Jefe Directo del usuario: ', (jefe) => {
            rl.question('Area del usuario: ', (area) => {
              rl.question('Correo del usuario: ', (email) => {
                rl.question('Número de empleado: ', (empleado) => {
                  const nuevoUsuario = {
                    number,
                    name,
                    puesto,
                    localidad,
                    jefe,
                    area,
                    email,
                    empleado // Agregar el número de empleado al objeto de usuario
                  };
                  agregarUsuario(nuevoUsuario);
                });
              });
            });
          });
        });
      });
    });
  });
}

// Función para agregar un nuevo usuario a la base de datos MySQL
function agregarUsuario(usuario) {
  // Verificar si ya existe un usuario con el mismo número de empleado o número de teléfono (movil)
  connection.query('SELECT * FROM directorio WHERE empleado = ? OR number = ?', [usuario.empleado, usuario.number], (err, rows) => {
    if (err) {
      console.error('Error al verificar duplicados en la base de datos:', err);
      rl.close();
      connection.end(); // Cerrar la conexión a la base de datos
      return;
    }

    // Si se encontraron filas en el resultado, significa que ya existe un usuario con el mismo número de empleado o número de teléfono
    if (rows.length > 0) {
      const usuarioDuplicado = rows[0];
      if (usuarioDuplicado.empleado === usuario.empleado) {
        console.log(`El número de empleado ${usuario.empleado} ya está asociado al usuario ${usuarioDuplicado.name}.`);
      }
      if (usuarioDuplicado.number === usuario.number) {
        console.log(`El número de teléfono ${usuario.number} ya está asociado al usuario ${usuarioDuplicado.name}.`);
      }
      console.log('No se pudo agregar el usuario debido a duplicados.');
      rl.close();
      connection.end(); // Cerrar la conexión a la base de datos
      return;
    }

    // Si no se encontraron filas en el resultado, insertar el nuevo usuario
    connection.query('INSERT INTO directorio SET ?', usuario, (err, result) => {
      if (err) {
        console.error('Error al insertar el usuario en la base de datos:', err);
      } else {
        console.log(`El usuario ${usuario.name} ha sido agregado exitosamente a la base de datos.`);
      }
      rl.close();
      connection.end(); // Cerrar la conexión a la base de datos
    });
  });
};

module.exports = {
  solicitarDatosUsuario,
  agregarUsuario
};

