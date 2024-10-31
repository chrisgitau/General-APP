const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const users = {
    'user1': 'password1',
    'user2': 'password2'
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        req.session.authenticated = true;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/ecommerce.html', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(__dirname + '/ecommerce.html');
    } else {
        res.redirect('/login.html');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
