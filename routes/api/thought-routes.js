
const router = require('express').Router();
const {
    getAllThoughts,addThought
} 
= require('../../controllers/thought-contoller');


router.route('/').get(getAllThoughts).post(addThought)
//router.route('/:userId')

module.exports = router;