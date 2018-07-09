const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 5000;

app.use(bodyParser.json());

app.listen(port, function(){
    console.log("You are listening on port 5000")
})

mongoose.connect('mongodb://localhost/mongo-dashboard');
var UserSchema = new mongoose.Schema({
    name: { type: String},
    created_at: { type: Date }
});
const User = mongoose.model('User', UserSchema);

app.get('/', function(req, res){
    User.find({}, function(err, users){
        res.json(users)
    })
})
app.get('/new/:name/', function(req, res){
    
    var user = new User({name: req.params.name, created_at: new Date()})
    user.save(function(err){
        if(err){
            console.log("Error: " , err)
        }else{
            res.redirect('/') 
        }
    })

})


