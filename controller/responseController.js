import express from "express";
import Response from "../models/response.js";
import Question from "../models/questions.js";
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/addresponse', auth, (req, res) => {
    const {response, questionId} = req.body;
    const idquestion = questionId;
    Response.create({
        response: response,
        questionId: questionId
    }).then(() => {
        res.redirect(`/responder/${idquestion}`);
    })
})




export default router;