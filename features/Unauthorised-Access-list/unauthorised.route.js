
const express = require('express')
const router = express.Router()
const unAuthorsiedController = require('./unauthorised.controller');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// define the home page route
router.post('/', unAuthorsiedController.create);
router.get('/', unAuthorsiedController.findAll);
router.get('/:id', unAuthorsiedController.findOne);
router.put("/addEntry/:id", unAuthorsiedController.addUnuthorisedEnty);

module.exports = router