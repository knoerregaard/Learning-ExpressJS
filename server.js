/*
 * Server
 * 
 */

const express = require('express')
const app = express()
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb+srv://<username>:<password>@cluster0-cpb0x.mongodb.net/<database>?retryWrites=true';

let db = "";

MongoClient.connect(MONGO_URL, function (err, client) {
  if (err) throw err;

  db = client.db('');

}); 

  
// process.env.PORT er relevant når du publicere 
// serveren til fx Heroku

const PORT = [3000, process.env.PORT];

//Corsproblematikker opstår når du forsøger at lave kald på 
//tværs af domæner. Med pakken cors kan vi diktere hvilke indkomne klient
//opkald som vores server må tillade.
app.use(cors({
    'Access-Control-Allow-Origin': '*'
}));

//Encoding definition der er nødvendig for at parse urlencoded indhold
app.use(express.urlencoded({
    extended: true
}));

//Vi ønsker at parse indkomne request med Json. Erstattede bodyparser
app.use(express.json());

// Array med ojekter
let bookings = [
    {name : 'a'},
    {name : 'b'},
    {name : 'c'},
    {name : 'd'}
]

// requesthandler af typen GET. Matcher mønstret?

app.get('/', (req, res) => {
    db.collection('cats').findOne({kattenavn: "mis"}, function (findErr, result) {
        if (findErr) throw findErr;
        console.log(result.name);
      });
    res.status(200).send(result)
});


app.get('/bookings', (req, res)=>{
    res.status(200).send(bookings)
})
app.get('/bookings/:id', (req, res)=>{
    console.log(req.params);
    res.status(200).send(bookings)
})

app.get('/test/:name/:id', (req, res)=>{
    console.log(req.params)
    res.status(200).send("Hello from test");
})
app.post('/new-order',(req, res)=>{
    console.log(req);
    res.send("Tak");
})

app.listen(PORT[0], () => console.log(`Example app listening on port ${PORT[0]}!`))