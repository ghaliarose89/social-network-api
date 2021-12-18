const router = require('express').Router();
const {
    addUser,getAllUsers,getUserById
} = require('../../controllers/user-controller');


router.route('/').post(addUser).get(getAllUsers);




module.exports = router;