const {User, Thought} = require('../models');

module.exports = {
    //get all users
    getAllUsers(req, res) {
        User.find()
        .populate('users')
        .then((users) => res.json(courses))
        .catch((err) => res.status(500).json(err))
    },
    //create user
    createUser(req, res) {
        User.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err);
            return pageYOffset.status(500).json(err);
        });
    },
    //get user by id
    getUserById(req, res) {
        User.findOne({_id: req.params.username})
        .select('-__v')
        .then((users) => 
            !users
                ?res.status(404).json({message: 'No user with that ID'})
                :res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
    //update user
    updateUser(req, res) {
        User.findByIdAndUpdate(
            {_id: req.params.username},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((users) => 
            !users
                ? res.status(404).json({message: 'No user with this ID'})
                : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete user
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.username})
        .then((users) => 
            !users
                ? res.status(404).json({message: 'No user with that ID'})
                : User.deleteMany({_id: {$in: users.username}})
        )
        .then(() => res.json({message: 'User and Username deleted'}))
        .catch((err) => res.status(500).json(err));
    },
    //add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$addToSet: {friends: params.friendsId}},
            {new: true}
        )
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json(err));
    },
    //delete friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$addToSet: {friends: params.friendsId}},
            {new: true}
        )
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json(err));
    }
};

module.exports = userController;