import Sequelize from 'sequelize';
import db from '../db.js';

const Question = db.define('question', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});


//Question.sync({force: true});

export default Question;