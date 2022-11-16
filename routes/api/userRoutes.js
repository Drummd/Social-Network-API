const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require("../../controllers/userController");



router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

//get a single user by its _id and populated thought a friend data



router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


router
    .route("/:id/friends/:friendsId")
    .post(addFriend)
    .delete(removeFriend);

//BONUS: remove a users associated thoughts when deleted

module.exports = router