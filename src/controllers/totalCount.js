const fs = require('fs');

const inputFilePath = './output.txt';
const outputFilePath = './totalCounter.txt';

// Función para leer, procesar y almacenar el total de mensajes individuales
const contarMensajesIndividuales = () => {
  try {
    const data = fs.readFileSync(inputFilePath, 'utf8');
    const lines = data.split('\n');
    let total = 0;

    lines.forEach((line, index) => {
      if (line.startsWith('Mensaje de tipo Individual')) {
        // Suponemos que "Mensaje no" está en la línea correcta o próxima
        for (let i = index + 1; i < lines.length; i++) {
          const messageLine = lines[i];
          const messageNoMatch = messageLine.match(/Mensaje no: (\d+)/);

          if (messageNoMatch) {
            const messageNo = parseInt(messageNoMatch[1], 10);
            total += messageNo;
            break;
          }
        }
      }
    });

    // Escribir el resultado en el archivo totalCounter.txt, agregando como log
    const logEntry = `Total de mensajes individuales: ${total} - ${new Date().toLocaleString()}\n`;
    fs.appendFileSync(outputFilePath, logEntry, 'utf8');
    console.log(`Total de mensajes individuales registrado en ${outputFilePath}`);
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
  }
};

contarMensajesIndividuales();
