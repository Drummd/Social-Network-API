const {User, Thought} = require('../models');

// use userSchema for users
module.exports = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .select("-__v")
        .sort({_id: -1})
        .then((userDb) => res.json(userDb))
        .catch((err) => res.status(400).json(err))
    },
    //create user
    createUser(req, res) {
        User.create(req.body)
        .then((userDb) => res.json(userDb))
        .catch((err) => res.status(400).json(err));
    },
    //get user by id
    getUserById(req, res) {
        User.findOne({_id: req.params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then((userDb) => 
            !userDb
                ?res.status(404).json({message: 'No user with that ID'})
                :res.json(userDb)
        )
        .catch((err) => res.status(500).json(err));
    },
    //update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((userDb) => 
            !userDb
                ? res.status(404).json({message: 'No user with this ID'})
                : res.json(userDb)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete user
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
        .then((userDb) => 
            !userDb
                ? res.status(404).json({message: 'No user with that ID'})
                : User.deleteMany({_id: {$in: userDb.username}})
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
        .then((userDb) => res.json(userDb))
        .catch((err) => res.status(400).json(err));
    },
    //delete friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$addToSet: {friends: params.friendsId}},
            {new: true}
        )
        .then((userDb) => res.json(userDb))
        .catch((err) => res.status(400).json(err));
    }
};

