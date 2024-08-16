const express = require('express')
const app = express();
const apiRoute = require("./routes/routes");

app.use(express.json());

app.use("/whatserver", apiRoute);

module.exports = app;