import express from "express";
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
    });  
});

router.post("/createquestion", (req, res) => {
    const {title, question } = req.body;

    Question.create({
        title: title,
        question: question,
    }).then(() => {
        res.redirect("/");
    });
});

router.get("/responder", auth,(req, res) => {
    Question.findAll().then(questions => {
        res.render("perguntas", { questions: questions, name: req.session.user.name});
    }).catch(err => {
        res.send(err);
    });
});

router.post("/response", (req, res) => {
    const pergunta = req.body;
    Response.create({
        pergunta: pergunta
    }).then(() => {
        res.redirect("/respostas");
    });
});


export default router;