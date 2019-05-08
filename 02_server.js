/*
 * Subject : Simple server with extended request handlers
 * 
 * When creating a webapi with ExpressJS we want to handle post, put and get request most of the time.
 * In this example I have added a range of requests handlers.
 */

const express = require('express');
const app = express();
const port = 3000;

//---- Request handlers START ----//
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/info', (req, res) => res.send('more info!'))

app.get('/person/:id', (req, res) => {
    let id = req.params.id;
    res.send(id)
})

app.get('/person/:name/:id', (req, res) => {
    let id = req.params.id;
    let name = req.params.name;
    res.send({id: id, name : name})
})

// when dealing with 'post' request handlers, we have to take into consideration the ASCII charecter-set.
// that the internet uses.
// The app.use(express.urlencoded) recognizes the incoming Request Object as strings or arrays
// This is needed only in the presence of incomming post or delete requests. 
app.use(express.urlencoded({
    extended: true
}));

//The post request handler will return the same incomming object 'person', but will later on be saved to the database
app.post('/new-person', (req, res)=>{
    let person = req.body;
    res.send(person);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))