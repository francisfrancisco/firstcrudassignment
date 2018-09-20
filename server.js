const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const fs = require('fs');
const bodyParser = require('body-parser');

// app.use(bodyParser.json())

// - Create route for creating new users
app.post('/:name/:email/:state', function(req, res){
  let user = {
    name: req.params.name,
    email: req.params.email,
    state: req.params.state
  }
  let storageData = fs.readFileSync('./storage.json', 'utf-8')
  let data = JSON.parse(storageData)

  data.push(user)
  fs.writeFileSync('./storage.json', JSON.stringify(data))
  res.sendStatus(200)
});

// - Get route for getting all users
app.get("/index", function(req, res){
  let storage = fs.readFileSync('./storage.json', 'utf-8')
  res.json(JSON.parse(storage))
});

// - Get route for getting a user by name
app.get("/index/:name", function(req, res){
  let storage = fs.readFileSync('./storage.json', 'utf-8');
  let allUsers = JSON.parse(storage)
  let user = allUsers.filter(word => word.name === req.params.name)
  res.send(user)

//   for(let i=0; i<allUsers.length; i++){
//     if(allUsers[i].name === req.params.name){
//       res.send(allUsers[i])
//     }
//   }
});

// - Update route for updating a user by name
// app.patch('allUsers/:name/:updatedName', function(req, res){
//   let storage = fs.readFileSync('./storage.json', 'utf-8');
//   let allUsers = JSON.parse(storage)
//   let user = allUsers.filter(word => word.name === req.params.name)
//   // user[0].name = req.params.updatedName
//   console.log(user)
//   // fs.writeFileSync('./storage.json', user[0].name
//   res.sendStatus(200)
// });

// - Delete route for deleting a user by name
app.delete("/index/:name", function(req, res){
  let storage = fs.readFileSync('./storage.json', 'utf-8');
  let allUsers = JSON.parse(storage)
  // let user = allUsers.filter(word => word.name === req.params.name)
  for(let i=0; i<allUsers.length; i++){
    if(allUsers[i].name === req.params.name){
        allUsers.slice(allUsers[i])
    }
  }
  fs.writeFileSync('./storage.json', JSON.stringify(allUsers))
  res.send(allUsers)
  res.sendStatus(200)
});


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
