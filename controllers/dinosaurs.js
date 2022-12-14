const express = require('express')
const router = express.Router()
const fs = require('fs')

//ROUTES 
//GET localhost:3000/dinosaurs
router.get("/", function(req, res){
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    //takes JSON language and translates it to data for humans
    let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)
    const nameFilter = req.query.nameFilter
    if(nameFilter) {
        //for all items in the object, chekc it lowercase, against form values in index.ejs search input
        //this filter needs exact values "littlefoot" vs "little foot" - one will return nothing because it is not an exact match to the items on the webpage. the only thing this does is eliminate capitilization errors
        dinoData = dinoData.filter(dino => dino.name.toLowerCase() === nameFilter.toLowerCase())
    }
    res.render('dinosaurs/index', {myDinos: dinoData})
})

//GET localhost: 300/dinosaurs/new
//we want to see the form in new.ejs
router.get("/new", function (req,res){
    res.render('dinosaurs/new');
})

//POST localhost:3000/dinosaurs
//returns in console: { type: 'stegasourus', name: 'crystal' }
//type and name come from HTML/ejs ids
//can access using object dot notation
router.post('/', function (req, res){
    // console.log('form data', req.body.name)
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    //this shows us old list
    const dinoData = JSON.parse(dinosaurs)
    //this adds form data to new list
    dinoData.push(req.body)
    console.log(dinoData)
    //this will mash up the files, which file are we updating, then what we need to add
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    res.redirect("/dinosaurs")
})

//express show route for dinosaurs (lists one dinosaur)
router.get('/:idx', (req, res) => {
    // get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
  
    //get array index from url parameter
    let dinoIndex = parseInt(req.params.idx);
  
    //render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
  });

  module.exports = router