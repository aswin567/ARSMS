
const express = require('express')
const router = express.Router()
const userController = require('./user.controller');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// define the home page route
router.post('/', userController.create);
router.get('/', userController.findAll);

module.exports = router