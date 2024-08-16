// config.js

// URL para enviar mensajes a través de Facebook Graph API
const facebookMessageURL = 'https://graph.facebook.com/v18.0/*****/messages';

const hostname = 'graph.facebook.com'

const path = '/v20.0/*******/messages'

const method = 'POST'

// Token Meta para la autorización
const metaToken = '************';

// API Key para la autorización
const apiKey = 'sk-****************';

// URL para solicitar completions a OpenAI Chat API
const openaiCompletionURL = 'https://api.openai.com/v1/chat/completions';

// TOKEN DE WEBHOOK
const VERIFY_TOKEN = 'simobot901';

// TOKEN DE WHATSAPP PARA WEBHOOK
const WHATSAPP_TOKEN = '*****';

// API Key WEBHOOK
const OPENAI_TOKEN = 'sk-*****';

module.exports = { facebookMessageURL, hostname, path, method, metaToken, apiKey, openaiCompletionURL, VERIFY_TOKEN, WHATSAPP_TOKEN, OPENAI_TOKEN };

