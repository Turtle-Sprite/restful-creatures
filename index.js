const express = require('express')
const app = express()
const PORT = 3000

const fs = require("fs")

//this lets us see the infromation on our pages
app.set("view engine", 'ejs')
//this middleware tells body-parser to capture urlencoded data (form data) and store it in req.body
app.use(express.urlencoded({extended: false}))

//CONTROLLERS
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))

app.listen(PORT, function() {
    console.log("listening ")
})