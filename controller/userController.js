import express, { application } from "express";
import User from '../models/user.js';
import auth from '../middleware/auth.js'
import Question from "../models/questions.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});


router.post("/authenticate", (req, res) => {
    const {email, password} = req.body;

    User.findOne({
        where:{
            email: email
        }
    }).then((user) => {
        if(user != undefined){
            if(user.password == password){
                req.session.user = user
                res.redirect("/logado");
            }else{
                res.redirect("/login");
            }
        }
    })
});


router.post('/cadastro', (req, res) => {
    const {name, email, password} = req.body;

    User.create({
        name: name,
        email: email,
        password: password
    }).then(() => {
        res.redirect("/logado");
    })
})

router.get('/logado', auth, (req, res) => {
    Question.findAll().then(questions => {
        res.render("index", {questions: questions, name: req.session.user.name});
     })

});



/*
router.get("/logado", (req, res) => {
    User.findAll().then(user => {
        res.render("admin/index", { user, nome: req.session.admin.nome});
    }).catch(err => {
        res.send(err);
    });
});


router.get("/adminAuth", (req, res) => {
    res.render("index");
})




router.get("/createAdmin", verify,(req, res) => {
    res.render("admin/createAdmin", { nome: req.session.admin.nome});
})

router.post("/admin", verify,(req, res) => {
    var { nome, email, telefone, password, nivel} = req.body;
    
    Admin.findOne({
        where: 
        {
            nome: nome,
            email: email,
            telefone: telefone,
            password: password,
            nivel: nivel
        }
    }).then( admin => {
        if(admin == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            Admin.create({
            nome: nome,
            email: email,
            telefone: telefone,
            password: hash,
            nivel: nivel
            }).then(() => {
                res.redirect("/logado");
            }).catch((err) => {
                res.json("Usuário já existe");
            });
        }
    });
});

router.get("/editAdmin/:id", verify, (req, res) => {
   var id = req.params.id;

    Admin.findByPk(id).then(admin => {
        if(admin != undefined){
            res.render("admin/editAdmin", { admin: admin, nome: req.session.admin.nome});
        }else{
            res.redirect("/logado");
        }
    }).catch(err => {
        res.redirect('/logado');
    })
});

router.post("/adminUpdate", verify,(req, res) => {
    var id  = req.body.id
    var { nome, email, telefone, password, nivel} = req.body
    
    Admin.update({
        nome: nome,
        email: email,
        telefone: telefone,
        password: password,
        nivel: nivel
    },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/logado");
    }).catch((err) => {
        res.json(err);
    })
});


router.post("/adminDelete", verify,(req, res) => {
    var id  = req.body.id;
    Admin.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/logado");
    }).catch((err) => {
        res.json(err);
    })
});

//destruir sessão
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/adminAuth");
});

*/
export default router;