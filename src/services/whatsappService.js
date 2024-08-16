const https = require('https');

function SendMessageWhatsapp (data){
  const options = {
    hostname: 'graph.facebook.com',
    path: '/v20.0/****/messages', //Identificador de número de teléfono
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`
    },
  };

  const req = https.request(options, (res) => {
    let response = '';
    res.on("data", (chunk) => response += chunk);
    res.on('end', () => console.log('Response:', response));
  });

  req.on('error', (error) => console.error(`Error sending message: ${error.message}`));
  req.write(JSON.stringify(data));
  req.end();
};

module.exports ={
  SendMessageWhatsapp
};

