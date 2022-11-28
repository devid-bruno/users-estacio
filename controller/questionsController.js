import express, { response } from "express";
import Question from "../models/questions.js";
import Response from "../models/response.js";
import User from '../models/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/perguntar", auth,(req, res) => {
    User.findAll().then(user => {
        res.render("perguntar", { user, name: req.session.user.name});
    }).catch(err => {
        res.send(err);
    })
});

router.post("/createquestion", auth,(req, res) => {
    const {title, question } = req.body;
    Question.create({
        title: title,
        question: question,
    }).then(() => {
        res.redirect(`/logado`);
    });
});

router.get("/responder/:id", auth,(req, res) => {
    var id = req.params.id;
    Question.findOne({where: {id: id}}).then(question => {
        Response.findAll({where: {questionId: id}}).then(response => {
            res.render("responder", {question, response, name: req.session.user.name});
        })
    });
});

export default router;