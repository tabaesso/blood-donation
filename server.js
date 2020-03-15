const express = require("express")
const server = express()
const SERVER_PORT = 3000;

server.get("/", function(req, res) {
    return res.send("eai man?")
})

server.listen(SERVER_PORT, function() {
    console.log(`Server listen on ${SERVER_PORT}`)
})