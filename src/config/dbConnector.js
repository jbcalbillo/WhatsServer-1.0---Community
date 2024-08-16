const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'carlos',
  password: 'carlos',
  database: 'directorio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const obtenerAreas = async () => {
  try {
    const [rows] = await pool.query('SELECT area FROM areas');
    return rows.map(row => row.area);
  } catch (error) {
    console.error('Error al obtener las áreas:', error);
    throw error;
  }
};

const obtenerPlantillas = async () => {
  try {
    const [rows] = await pool.query('SELECT plantilla FROM plantillas');
    return rows.map(row => row.plantilla);
  } catch (error) {
    console.error('Error al obtener las plantillas:', error);
    throw error;
  }
};

const obtenerCodigoIdiomaPorPlantilla = async (plantilla) => {
  try {
    const [rows] = await pool.query('SELECT code FROM plantillas WHERE plantilla = ?', [plantilla]);
    return rows.length > 0 ? rows[0].code : null;
  } catch (error) {
    console.error('Error al obtener el código de idioma:', error);
    throw error;
  }
};

const obtenerNumerosTelefonosPorArea = async (area) => {
  try {
    const [rows] = await pool.query('SELECT number FROM directorio WHERE area = ?', [area]);
    return rows.map(row => row.number);
  } catch (error) {
    console.error('Error al obtener los números de teléfono por área:', error);
    throw error;
  }
};

const obtenerNombresPorArea = async (area) => {
  try {
    const [rows] = await pool.query('SELECT name FROM directorio WHERE area = ?', [area]);
    return rows.map(row => row.name);
  } catch (error) {
    console.error('Error al obtener los números de teléfono por área:', error);
    throw error;
  }
};

// Función para obtener los números de teléfono desde la base de datos
const obtenerTodosLosNumerosDeTelefono = async () => {
  try {
    // Ejecuta la consulta para obtener los números de teléfono
    const query = 'SELECT number FROM directorio';
    const [resultados] = await pool.query(query);

    // Extrae los números de teléfono de los resultados
    const numerosTelefonos = resultados.map(resultado => resultado.number);

    return numerosTelefonos;
  } catch (error) {
    throw error;
  }
};

// Función para obtener los números de teléfono desde la base de datos






module.exports = { obtenerAreas, obtenerPlantillas, obtenerCodigoIdiomaPorPlantilla, obtenerNumerosTelefonosPorArea, obtenerTodosLosNumerosDeTelefono, obtenerNombresPorArea };
