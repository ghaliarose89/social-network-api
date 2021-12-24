const { Thought, User } = require('../models');
const thoughController = {

    addThought({ body }, res) {
        Thought.create(body)
       
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: body.userId },
                    { $addToSet: { thoughts: _id } },

                    { new: true }
                );
            })
            
            .then(dbThoughtsData => {
            
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts with this particular ID!' });
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => res.json(err));
    },

    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbData => res.json(dbData))
            .catch(err => res.json(err));
    },

    updateThoughById({params,body}, res){
        Thought.findByIdAndUpdate(
            {_id : params.id} ,body , {new : true}
            )
            .then(dbThoughtsData => {
                
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts with this particular ID!' });
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => res.json(err));

    },

    getThoughById({params},res){
        Thought.findById(
            {_id : params.id}
        )
      
        .then(dbThoughtsData => {
                
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts with this particular ID!' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },

    deleteThought({params}, res){
        Thought.findOneAndDelete({_id : params.id})
        .then (dbData=>{
            if (!dbData){
                res.status(404).json({message: 'No thought found with this id!' })
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );

        })
        .catch(err=> res.json(err))
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbReactionData => {
                if (!dbReactionData) {
                    res.status(404).json({ message: 'No reaction found with this id!' });
                    return;
                }
                res.json(dbReactionData);
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

}

module.exports = thoughController;