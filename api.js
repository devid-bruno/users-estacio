import express from 'express';
import User from './models/user.js';
import auth from './middleware/auth.js';


const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/listuser', (req, res) => {
    User.findAll().then((users) => {
        res.render('listuser', {users: users});
    });
})

app.post("/saveuser", (req, res) => {
    var { name, email, password} = req.body;
    User.create({
        name: name,
        email: email,
        password: password
    }).then(() => {
        res.redirect('/');
    }).catch(() => {
        res.redirect('/register');
    })
});

app.post("/login", (req, res) => {
    var { email, password } = req.body;
    User.findOne({
        where: {
            email: email,
            password: password
        }
    }).then((user) => {
        if (user) {
            res.redirect('/listuser');
        } else {
            res.json({err: "Invalid email or password"});
        }
    }).catch(() => {
        res.redirect('/');
    })
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})