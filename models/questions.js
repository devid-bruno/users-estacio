import Sequelize from 'sequelize';
import db from '../db.js';


const Question = db.define('question', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    question:{
        type: Sequelize.STRING,
        allowNull: false
    }
});


//Question.sync({force: true});


export default Question;