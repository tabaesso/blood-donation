const express = require("express")
const server = express()
const SERVER_PORT = 3000;

//config server to show extra static content
server.use(express.static('public'))

//body form
server.use(express.urlencoded({ extended: true }))

//config template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

const donors = [
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Cleiton Souza",
        blood: "B+"
    },
    {
        name: "Robson Marques",
        blood: "0+"
    },
    {
        name: "Mayk Brito",
        blood: "A-"
    },
]

server.get("/", function(req, res) {
    return res.render("index.html", { donors })
})

server.post("/", function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    donors.push({
        name: name,
        blood: blood,
    })

    return res.redirect("/")
})

server.listen(SERVER_PORT, function() {
    console.log(`Server listen on ${SERVER_PORT}`)
})