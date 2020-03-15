const express = require("express")
const server = express()
const SERVER_PORT = 3000;

//config server to show extra static content
server.use(express.static('public'))

//config template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})

server.get("/", function(req, res) {
    return res.render("index.html")
})

server.listen(SERVER_PORT, function() {
    console.log(`Server listen on ${SERVER_PORT}`)
})