const messages = require("../controllers/botController");

const MessageTypes = {
    TEXT: "text",
    IMAGE: "image",
    DOCUMENT: "document",
    AUDIO: "audio",
    VIDEO: "video",
    STICKER: "sticker",
    CONTACT: "contact"
};

function GetTextUser(messages) {
    let text = "";
    const typeMessage = messages["type"];

    switch (typeMessage) {
        case MessageTypes.TEXT:
            text = messages["text"]["body"];
            break;
        case MessageTypes.AUDIO:
            text = "El usuario ha enviado un audio.";
            break;
        case MessageTypes.VIDEO:
            text = "El usuario ha enviado un video.";
            break;
        case MessageTypes.IMAGE:
            text = "El usuario ha enviado una imagen.";
            break;
        case MessageTypes.STICKER:
            text = "El usuario ha enviado un sticker.";
            break;
        case MessageTypes.INTERACTIVE:
            const interactiveObject = messages["interactive"];
            const typeInteractive = interactiveObject["type"];

            if (typeInteractive === "button_reply") {
                text = interactiveObject["button_reply"]["title"];
            } else if (typeInteractive === "list_reply") {
                text = interactiveObject["list_reply"]["title"];
            }
            break;
        default:
            text = "Tipo de mensaje no soportado o indefinido.";
            break;
    }

    return text;
};

module.exports = {
    GetTextUser
};

