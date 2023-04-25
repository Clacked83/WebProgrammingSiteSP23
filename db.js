//Establish dependencies

const express = require("express");
const app = express();
const mysql = require("mysql");


//Start listening on port 3000
app.listen(3000, function() {
    console.log("Listening on port 3000...");
});

//Establish connection to database
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "plain^",
    database: "memeUsers"
});

conn.connect(function(err) {
    if (err) {
    console.log("Error connecting to MySQL:", err);
    } else {
    console.log("Connection established");
    }
});

//Select html from folder
app.get("/userReg", function(req, res) {
    res.send("<h1>Hello, Express!</h1>");
});

//Select Folder
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.post("/form_process", function(req, res) {
    const newUser = { username: req.body.username, password: req.body.password, email: req.body.email, passwordConfirm: req.body.passwordConfirm };
    conn.query("INSERT INTO userlogins SET ?", newUser, function(err, result) {
        if (err) {
            console.log("ERROR:", err);
            res.send("Error in insertion!");
        } else {
            console.log("Inserted " + result.affectedRows + " row"); // Success!
           // res.send("Success!")
            res.writeHead(301, {
                location: 'http://localhost:3000/Memes.html'
            }).end();
           
        }
    });
});

app.get("/all", function(req, res) {
    conn.query("SELECT * FROM userlogins", function(err, rows) {
        if (err) {
            console.log("ERROR:", err);
        } else {
            // Produce ordered list of people
            let html = "<ol>";
            html+= '<link rel="stylesheet" href="memes.css">';
            rows.forEach(function(row) {
                html += "<li>" + row.username + ", " + row.email + ", " + row.password + ", " + row.passwordConfirm + "</li>";
            });
            html += "</ol>";
            html += "<a href='Memes.html'>Return to Home</a>";           
            res.send(html);
        }
    });
});


function displayUsers(){
    conn.query("SELECT username, password, email, confirmPassword FROM userlogins", function(err, rows) {
        if (err) {
            console.log("ERROR:", err);
        } else { 
            rows.forEach(function(row) {
                console.log(row.username + ", " + row.password + ", " + row.email + ", " + row.passwordConfirm);
            });
        }
    });
}