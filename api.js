import express from 'express';
import cors from 'cors';
import session from 'express-session';

import UsersController from './controller/userController.js';
import Questions from './controller/questionsController.js';
import Response from './controller/responseController.js';

const app = express();

app.use(cors())

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});
    

app.use("/", UsersController);
app.use("/", Questions);
app.use("/", Response);

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})