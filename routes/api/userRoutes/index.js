const router = require('express').Router();
const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriendToUserById,
    removeFriendFromUserById,
} = require('../../../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createUser)
router.route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)
router.route('/:userId/friends/:friendId')
    .post(addFriendToUserById)
    .delete(removeFriendFromUserById)
module.exports = router;