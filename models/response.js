import Sequelize from 'sequelize';
import db from '../db.js';
import Question from '../models/questions.js';

const Response = db.define('response', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    perguntas_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Question,
            key: 'id'
        }
    },
    resposta: {
        type: Sequelize.STRING,
        allowNull: false
    },
    correta: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});


//Response.sync({force: true});

export default Response;