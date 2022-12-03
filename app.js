const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const date = require("./public/js/date.js");

mongoose.connect("mongodb://0.0.0.0:27017/factsDB", {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const factSchema = ({
    name:String,
    content:String
})

const Fact = new mongoose.model('Fact', factSchema);

app.get("/", function(req, res){
        res.render('home');
});

app.get("/compose", function(req, res){
    res.render('compose');
});

app.get("/posts", function(req, res){
    Fact.find({}, function(err, foundFacts){
        res.render('posts', {factContent:foundFacts});
    });
});

app.get("/")

app.get("/:factName", function(req, res){
    const day = date.getDate();

    let request = req.params.factName

    Fact.findOne({name:request}, function(err, foundItem){
        res.render('single', {
            day:day,
            title:foundItem.name,
            content:foundItem.content});
    });
});

app.post("/compose", function(req, res){
    let fact = new Fact ({
        name: req.body.tag,
        content: req.body.fact
    });

    fact.save(function(err){
        if(!err){
            res.redirect("/posts");
        } else {
            console.log(err);
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

