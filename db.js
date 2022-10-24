import sequelize, { Sequelize } from 'sequelize';

var db = 'heroku_2effc7b300a2a01'

//mysql://b81cddf744f2f9:2f9cfd3a@us-cdbr-east-06.cleardb.net/heroku_2effc7b300a2a01?reconnect=true

const connect = new Sequelize(`${db}`, 'b81cddf744f2f9', '2f9cfd3a', {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    timezone: '-03:00'
})

connect.authenticate().then(() => {
    console.log(`Conectado ao banco ${db}`);
}).catch((msgErr) => {
    console.log("Unable to connect to the database:", msgErr);
});

export default connect;