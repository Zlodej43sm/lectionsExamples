const mongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";

mongoClient.connect(url, function(err, client){
    const db = client.db("usersdb");
    const collection = db.collection("users");

    const user = {name: "Tom", age: 23};

    collection.insertOne(user, function(err, result){
        if(err) return console.log(err);

        console.log(result.ops);
        client.close();
    });
});