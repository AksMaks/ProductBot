const express = require('express');
const path = require('path');
//const URL = require('url');
const cors = require('cors');
const fs = require('fs');

//const https = require('https');
const http = require('http');
/*
let httpsOptions = {
  key: fs.readFileSync("./ssl/alerts.wdepo.ru.key"), // путь к ключу
  cert: fs.readFileSync("./ssl/alerts.wdepo.ru.cer") // путь к сертификату
}
*/

const app = new express()
const PORT = 5000
//const PORTHTTPS = 443

app.use(cors())
app.use(express.static('static'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const authRouter = require("./routes/authRouter.js")

//Маршруты
app.use("/auth", authRouter)

async function start() {
  try{
    http.createServer(app).listen(PORT, () => console.log(`Starn in http port ${PORT}`))
	  //https.createServer(httpsOptions, app).listen(PORTHTTPS, () => console.log(`Starn in https port ${PORTHTTPS}`));
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()