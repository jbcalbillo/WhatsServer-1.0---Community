const SendMessageWhatsapp = require("../services/whatsappService");
const { sampleText, sampleImage, sampleVideo, sampleList, sampleButton, sampleLocation } = require("../shared/messageTemplates");

const { GetTextUser } = require("../helpers/responseHandlers");
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logbot.txt", { flags: "a" }, { encoding: "utf-8" }));

exports.verifyToken = (req, res) => {
  try {
    const accessToken = "*******"; //coloica tu tu token
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (challenge != null && token != null && token === accessToken) {
      res.send(challenge);
    } else {
      res.status(400).send();
    }
  } catch (e) {
    res.status(400).send();
  }
};

exports.receivedMessage = async (req, res) => {
  try {
    const entry = req.body["entry"][0];
    const changes = entry["changes"][0];
    const value = changes["value"];
    const messageObject = value["messages"];

    if (messageObject) {
      const messages = messageObject[0];
      const sender = messages["from"];
      const messageType = messages["type"];
      const senderProfile = value["contacts"][0]["profile"]["name"];
      const senderWaId = value["contacts"][0]["wa_id"];

      myConsole.log("Numero del usuario: " + sender);
      myConsole.log("Perfil del usuario: " + senderProfile);
      myConsole.log("ID de WhatsApp del usuario: " + senderWaId);

      const text = GetTextUser(messages);


      handleResponseFlow(text, senderWaId);

      if (messageType === "interactive") {
        const interactiveObject = messages["interactive"];
        const typeInteractive = interactiveObject["type"];

        if (typeInteractive === "button_reply") {
          myConsole.log("Eligio la respuesta: " + interactiveObject["button_reply"]["title"]);
        } else if (typeInteractive === "list_reply") {
          myConsole.log("Selecciono la respuesta: " + interactiveObject["list_reply"]["title"]);
        } else {
          myConsole.log("Tipo de interaccion desconocido");
        }
      } else {
        myConsole.log("Tipo de mensaje desconocido");
      }
    }

    res.send("EVENT_RECEIVED");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


function handleResponseFlow(text, senderWaId) {
  let data;

  switch (text.toLowerCase()) {
    case "text":
      data = sampleText("Hola Campeón", senderWaId);
      break;
    case "image":
      data = sampleImage(senderWaId);
      break;
    case "video":
      data = sampleVideo(senderWaId);
      break;
    case "list":
      data = sampleList(senderWaId);
      break;
    case "button":
      data = sampleButton(senderWaId);
      break;
    default:
      data = sampleLocation(senderWaId);
  }

  SendMessageWhatsapp(data);
  SendMessageWhatsapp(`El usuario dijo: ${text}`, senderWaId);
}
