const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname,'build')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'build','index'));
});

app.get('/get-users', (req,res) => {
    fs.readFile(path.join(__dirname,'src','public','data','users.json'),(err, data) => {
        if(err) throw err

        res.send({
            action: true,
            data: JSON.parse(data.toString())
        })
    });
});

app.post('/save-user', (req,res) => {
    let body = JSON.stringify(req.body);
    fs.writeFile(path.join(__dirname,'src','public','data','users.json'),body,(err) => {
        if(err) throw err

        res.send({
            action: true
        })
    });
});

app.listen(PORT,() => {
    console.log('Listen in port:',PORT);
});