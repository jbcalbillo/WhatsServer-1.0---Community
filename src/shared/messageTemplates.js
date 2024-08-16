const sampleText = (textResponse, senderWaId) => JSON.stringify({
    recipient_type: "individual",
    to: senderWaId,
    type: "text",
    text: { body: textResponse }
  });

function sampleImage(senderWaId){
    const data = JSON.stringify({
        // "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": senderWaId,
        "type": "image",
        "image": {
            "id": 1159395171781864
        }
    });
    return data;
};


function sampleVideo(senderWaId){
    const data = JSON.stringify({
        // "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": senderWaId,
        "type": "video",
        "image": {
            "id": 1159515661769815
        }
    });
    return data;
};


const sampleList = (senderWaId) => JSON.stringify({
    recipient_type: "individual",
    to: senderWaId,
    type: "interactive",
    interactive: {
      type: "list",
      header: { type: "text", text: "Encabezado" },
      body: { text: "Cuerpo del mensaje" },
      footer: { text: "Pie de Pagina" },
      action: {
        button: "Nombre del botón",
        sections: [
          { title: "Sección 1", rows: [{ id: "row1", title: "Fila 1", description: "Descripción" }] },
          { title: "Sección 2", rows: [{ id: "row2", title: "Fila 2", description: "Descripción" }] }
        ]
      }
    }
  });
  


function sampleButton(senderWaId) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": senderWaId,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "text",
                "text": "Encabezado del mensaje"
                      },
            "body": {
                "text": "Cuerpo del mensaje"
                    },
            "footer": {
                "text": "Pie de página del mensaje"
                      },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "boton_1",
                            "title": "Título del Botón 1"
                                 }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "boton_2",
                            "title": "Título del Botón 2"
                                 }
                    }
                          ]
                     }
                    }
    
    }
)
return data;
};


function sampleLocation(senderWaId) {
    const data = JSON.stringify({
    "messaging_product": "whatsapp", 
    "to": senderWaId, 
    "type": "location",
    "location": { 
        "latitude": "19.54571933605294",
        "longitude": " -99.1942272629728",
        "name": "Oficinas IDMKT Lomas Verdes",
        "address": "Colina de Mocusari 33, Boulevares, 53140 Naucalpan de Juárez, Méx."
            }
        }
    )
    return data;
};

module.exports = {
    sampleButton,
    sampleLocation,
    sampleImage,
    sampleVideo,
    sampleText,
    sampleList
};