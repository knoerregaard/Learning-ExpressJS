/*
 * Subject : ExpressJS Server, ExpressJS router
 * Source  : https://expressjs.com/en/guide/routing.html
 * 
 * This is an addition to 01_server.js
 * A server application can have lots of endpoints - maybe hundreds of endpoints.
 * To structure your server better, you can do group you requesthandlers into
 * categories and seperate files using ExpressJS/Router.
 */

const express = require('express')
const app = express()
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb+srv://mongouser:mongo123@cluster0-cpb0x.mongodb.net/test?retryWrites=true';

let db = "";

MongoClient.connect(MONGO_URL, function (err, client) {
  if (err) throw err;
  db = client.db('test');
}); 

// process.env.PORT is relevant when you use Heroku as a host.
const PORT = 3000 |  process.env.PORT;

//---- Setting up middleware START ----//

// Whenever you make cross-domain request you will need to handle cores setup.
// You have to whitelist clients ip adresses, or allow certain ip addresses to make 
// reuqest to your server. Below I am allowing every request to access my server.
app.use(cors({
    'Access-Control-Allow-Origin': '*'
}));

// express.urlencoded() is a method built in express to recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({
    extended: true
}));

//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

//---- Setting up middleware END ----//

//---- Setting up requesthandlers START ----//

app.get('/', (req, res) => {
    //cats is a collection in the database
    db.collection('cats').findOne({kattenavn: "mis"}, function (findErr, result) {
        if (findErr) throw findErr;
        console.log(result);
        
        res.status(200).send(result)
      });
});

app.get('/test/:name/:id', (req, res)=>{
    console.log(req.params)
    res.status(200).send("Hello from test");
})
app.post('/new-order',(req, res)=>{
    console.log(req);
    res.send("Tak");
})
//---- Setting up requesthandlers END ----//

//The app is instantiated and ready to go
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))