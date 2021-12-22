const router = require('express').Router();
const {
    addUser,getAllUsers,getUserById,deleteUser,uppdateUser, removeFriend,addFriend
} = require('../../controllers/user-controller');


router.route('/').post(addUser).get(getAllUsers);
router.route('/:id').get(getUserById).put(uppdateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend)

module.exports = router;