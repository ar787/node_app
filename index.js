const path = require("path");
const express = require("express");
const routs = require("./routes/route")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const PORT = 3000;
const app = express()
const users = []
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'))

app.use(cookieParser())
app.use(function (req, res, next) {
    
    let cookie = req.cookies.cookieName;

    if (cookie === undefined) {
        res.cookie('cookieName',Date.now(), { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    } else {
        console.log('cookie exists', cookie);
    } 
    
    next();
    });
      
app.use(routs)

app.post("/form", urlencodedParser, (req, res, next)=> {
   
    if(req.body.username === "" && req.body.password === "") {
        console.log(req.body)

        return res.sendStatus(400)
    }
    users.push(req.body)
    res.users = users
    res.render("result", {data:req.body})
    next()
})
app.get("/api/users", (req, res)=> {
    console.log("users",users)
    res.send("users")

})
app.get("/api/time", (req, res)=> {
    console.log(req.cookies.cookieName)
    res.send(req.cookies.cookieName)
})

app.listen(PORT, ()=> {
    console.log("Server has started...")
})