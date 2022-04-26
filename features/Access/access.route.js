
const express = require('express')
const router = express.Router()
const accessController = require('./access.controller');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route

// define the home page route
router.post('/', accessController.create);
router.get('/', accessController.findAll);
router.put('/:id', accessController.update);

module.exports = router