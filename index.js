const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require("./config/app.config");
const usersRoutes = require('./features/users/users.route');
const accessRoutes = require('./features/Access/access.route');
const unAuthorisedAccessRoutes = require('./features/Unauthorised-Access-list/unauthorised.route');
const port = config.port;
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.use('/users', usersRoutes);
app.use('/access', accessRoutes);
app.use('/unAuthorisedAccess', unAuthorisedAccessRoutes);
const db = require("./config/db.setup");
db.sequelizeDB.sync();
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})