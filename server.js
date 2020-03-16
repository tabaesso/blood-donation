const express = require("express")
const server = express()
const SERVER_PORT = 3000;

//config server to show extra static content
server.use(express.static('public'))

//body form
server.use(express.urlencoded({ extended: true }))

//config db
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'tabata.',
    host: 'localhost',
    port: 5432,
    database: 'blood-donation'
})

//config template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

server.get("/", function(req, res) {
    
    db.query("SELECT * FROM donors", function(err, result) {
        if (err) return res.send("Erro de banco de dados.")

        const donors = result.rows
        return res.render("index.html", { donors })
    })
})

server.post("/", function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios.")
    }

    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err) {
        if (err) return res.send("erro no banco de dados.")

        return res.redirect("/")
    })

    return res.redirect("/")
})

server.listen(SERVER_PORT, function() {
    console.log(`Server listen on ${SERVER_PORT}`)
})