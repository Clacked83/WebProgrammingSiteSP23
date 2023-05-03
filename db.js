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

//Select Folder
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));


//Process form data from user registration
app.post("/form_process", function(req, res) {
    const newUser = { username: req.body.username, password: req.body.password, email: req.body.email};
        conn.query("INSERT INTO users SET ?", newUser, function(err, result) {
            if (err) {
                console.log("ERROR:", err);
                let html = "<a href='userReg.html' style='position: absolute; left: 43%; top: 22%;'>Return to Registration</a>";
                html += '<link rel="stylesheet" href="memes.css">';
                html += '<h1>Error in insertion!</h1>';
                res.send(html);

            } else {
                console.log("Inserted " + result.affectedRows + " row"); // Success!
                res.writeHead(301, {
                    location: 'http://localhost:3000/memeLoginPage.html'
                }).end();          
            }      
        });
    }
);




//Compare user credentials to databse
let username;
let password;
let pic;

app.post("/login", function(req, res) {
    const user = {
                username: req.body.username, 
                password: req.body.password,
                }; 
    username = user.username.replace(/['"]+/g, '');
    password = user.password.replace(/['"]+/g, '');
    conn.query("SELECT username, password from users WHERE username=\"" + username + "\" AND password=\"" + password + "\"", function(err, result) {
        if (result[0] == null) {
            console.log("ERROR:" + err);
            let html = '<div id="menuBorder">';
            html+= '<p>User not found!</p>';
            html+= '<a href = "memeLoginPage.html">Back to login page</a>';
            html+= '<link rel="stylesheet" href="memes.css"></div>';
            res.send(html);           
        } else {
            console.log(result); // Success!
            res.writeHead(301, {
                location: 'http://localhost:3000/Memes.html'
            }).end();          
        }      
    });
});

//Get and send current username to home page
app.get('/user', (req, res)=>{
    res.send(username);
})

//Diplay all users
app.get("/all", function(req, res) {
    conn.query("SELECT * FROM users", function(err, rows) {
        if (err) {
            console.log("ERROR:", err);
        } else {
            // Produce ordered list of people
            let html = "<ul>";
            html+= '<link rel="stylesheet" href="memes.css">';
            rows.forEach(function(row) {
                html += "<li>" + row.username + "</li>";//", " + row.email + ", " + row.password + ", " + row.passwordConfirm + "</li>";
            });
            html += "</ul>";
            html += "<a id='back' href='Memes.html' style='position: absolute; left: 46.2%; top: 15%;'>Back to Home</a>";           
            res.send(html);
        }
    });
});

//Update profile information
//TODO: if profile-pic = null, do not update
app.post("/profile", function(req, res) {
    const userinfo = {
                oldName: req.body.oldName,
                newName: req.body.newName, 
                email: req.body.email,
                oldPass: req.body.oldPass,
                newPass: req.body.newPass
                }; 
    let oldName = userinfo.oldName.replace(/['"]+/g, '');
    let newName = userinfo.newName.replace(/['"]+/g, '');
    let email = userinfo.email.replace(/['"]+/g, '');
    let oldPass = userinfo.oldPass.replace(/['"]+/g, '');
    let newPass = userinfo.newPass.replace(/['"]+/g, '');
    conn.query("SELECT username, password from users WHERE username=\"" + oldName + "\" AND password=\"" + oldPass + "\"", function(err, result) {
        if (result[0] == null) {
            console.log("ERROR:" + err);
            let html = '';
            html+= '<link rel="stylesheet" href="memes.css">';
            html+= '<p>User not found!</p>';
            html+= '<a href = "Memes.html">Back to login page</a>';
            res.send(html);
        } else {
            sql = "UPDATE users SET username=\""+ newName +"\", password=\""+newPass+"\", email=\""+ email +"\" WHERE username = '"+oldName+"'";         
            conn.query(sql, (err, result)=>{
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                username = newName;
                res.writeHead(301, {
                    location: 'http://localhost:3000/Memes.html'
                }).end(); 
            });     
        }      
    });
});