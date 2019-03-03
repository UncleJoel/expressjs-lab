const express = require('express');
const path = require('path');
const fs = require('fs');


let app = express();
let router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use('/', router);

app.route('/contact-form')

    .post((req, res) => {
        let userName = req.body.name
        let userEmail = req.body.email

        let user = {
            name: userName,
            email: userEmail
        }

        fs.writeFile(path.join(__dirname, './form.json'), JSON.stringify(user, null, 2), (err) => {
            if (err) console.log(err)
        });
    });

    fs.readFile('server/form.json', {encoding: 'base64'}, (err, data) => {
        if (err) console.log(err)
        app.get('/formsubmissions', (req, res) => {
            res.send(data)
        })
    });

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);