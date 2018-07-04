const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017/";

app.use(express.static(__dirname + "/public"));
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get("/api/users", function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        client.db("usersdb")
            .collection("users")
            .find()
            .toArray(function(err, users) {
                res.send(users);
                client.close();
            });
    });
});

app.get("/api/users/:id", function(req, res){
    const id = new ObjectId(req.params.id);

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        client.db("usersdb")
            .collection("users")
            .findOne(
                {_id: id},
                function(err, user){
                    if(err) return res.status(400).send();

                    res.send(user);
                    client.close();
                }
            );
    });
});

app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        client.db("usersdb")
            .collection("users")
            .insertOne(
                user,
                function(err, result) {
                    if(err) return res.status(400).send();

                    res.send(user);
                    client.close();
                }
            );
    });
});

app.delete("/api/users/:id", function(req, res){
    const id = new ObjectId(req.params.id);

    MongoClient.connect(url, { useNewUrlParser: true },  function(err, client){
        client.db("usersdb")
            .collection("users")
            .findOneAndDelete(
                {_id: id},
                function(err, result) {
                    if(err) return res.status(400).send();

                    const user = result.value;

                    res.send(user);
                    client.close();
                }
            );
    });
});

app.put("/api/users", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);

    const id = new ObjectId(req.body.id);
    const userName = req.body.name;
    const userAge = req.body.age;

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
        client.db("usersdb")
            .collection("users")
            .findOneAndUpdate(
                {_id: id},
                {
                    $set: {
                        age: userAge,
                        name: userName
                    }
                },
                {
                    returnOriginal: false
                },
                function(err, result){

                    if(err) return res.status(400).send();

                    const user = result.value;

                    res.send(user);
                    client.close();
                }
            );
    });
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});