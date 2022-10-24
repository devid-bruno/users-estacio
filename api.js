import express from 'express';
import User from './models/user.js';
import cors from 'cors';

const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.render('login');
});

app.get('/listuser', (req, res) => {
    User.findAll().then((users) => {
        res.render('listuser', {users: users});
    });
})


app.post("/login", (req, res) => {
    var { email, password } = req.body;
    User.findOne({
        where: {
            email: email,
            password: password
        }
    }).then((user) => {
        if (user != undefined) {
            res.redirect('/listuser');
        } else {
            res.json({err: "Invalid email or password"});
        }
    }).catch(() => {
        res.redirect('/');
    })
});

app.post("/deleteuser/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/listuser');
    }).catch(() => {
        res.json({err: "Error while deleting user"});
    })
});


app.get('/createuser', (req, res) => {
    res.render('newuser');
});

app.post('/createuser', (req, res) => {
    var { name, email, password } = req.body;
    User.create({
        name: name,
        email: email,
        password: password
    }).then(() => {
        res.redirect('/listuser');
    }).catch(() => {
        res.json({err: "Error while creating user"});
    })
});

app.get('/partition', (req, res) => {
    res.render('partition');
})

app.get('/sair', (req, res) => {
    res.redirect('/');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})