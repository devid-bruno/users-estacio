import Sequelize from 'sequelize';
import db from '../db.js';
import Question from './questions.js';

const Response = db.define('response', {
    response:{
        type: Sequelize.STRING,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        references: {
            model: Question,
            key: 'id'
        }
    }
});


//Response.sync({force: true});

Question.hasMany(Response);
Response.belongsTo(Question);


export default Response;