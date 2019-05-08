# Learning-ExpressJS

## Simple server setup
It is very simple to setup an ExpressJS server. With just a few lines of code, you are ready to prototype your way through your application.
Heres is an example of a simple ExpressJS server.

01_server.js
```
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```
The code can be segmented into three groups. a) the declaration of constanst, b) the request handlers, and finally the initialization og the app. 

## The request handlers

