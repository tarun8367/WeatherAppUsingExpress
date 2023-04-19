const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 3000;

// public static path
const staticPath = path.join(__dirname + "/../public");

app.set('view engine' , 'hbs');
app.set('views', path.join(__dirname , '../templates/views'));
app.use(express.static(staticPath));

// Using Partials
const partialsPath = path.join(__dirname , "../templates/partials");  
hbs.registerPartials(partialsPath);


// routing

app.get("" , (req,res) =>
{
    res.render("index");
});


app.get("/about" , (req,res) =>
{
    res.render("about");
});


app.get("/weather" , (req,res) =>
{
    res.render("weather");
});


app.get("*" , (req,res) =>
{
    res.render("404" ,{
        errorMessage : 'Oops! Page Not Found'
    });
});


app.listen(port , () => {
    console.log(`Project is running on port : ${port}`);
});