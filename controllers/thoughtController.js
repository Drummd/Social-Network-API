const {User, Thought} = require('../models');

module.exports = {
    //get all thought
    getAllThoughts(req, res) {
        Thought.find({})
        .select("-__v")
        .then((thoughtDb) => res.json(thoughtDb))
        .catch((err) => res.status(500).json(err));
    },
    //create thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughtDb) => res.json(thoughtDb))
        .catch((err) => res.status(400).json(err.message));
    },
    //get thought by id
    getThoughtById(req, res) {
        Thought.findOne({_id: req.params.id})
        .then((thoughtDb) =>
        !thoughtDb
            ?res.status(404).json({message: 'No thought for this id'})
            :res.json(thoughtDb)
        )
        .catch((err) => res.status(500).json(err));
    },
    //update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
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
    //delete thought
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then((thoughtDb) => {
            if(!thoughtDb) {
                res.status(404).json({message: "No thought with this ID"})
                return;
            }
            res.json(thoughtDb)
        })
        .catch((err) => res.status(400).json(err))
    },
    //add reaction
    addReaction({ params, body},res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$addToSet: {reactions: body}},
            {new: true}
        )
        .then((thoughtDb) => {
            if(!thoughtDb) {
                res.status(404).json({message: "NO thought for this id"})
                return;
            }
            res.json(thoughtDb)
        })
        .catch((err) => res.json(err));
    },
    //delete reaction
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            //{$pull: {reactions: {reactionId: params.reactionId}}},
            {$pull: {reactions: {reactionId: body.reactionId}}},
            {new: true}
        )
        .then((thughtDb) => res.json(thoughtDb))
        .catch((err) => res.json(err));
    }
};

