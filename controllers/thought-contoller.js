const { Thought, User } = require('../models');
const thoughController = {
    // api/thoughts (posting a thought)
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
    // api/thoughts (getting all thoughts)
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbData => res.json(dbData))
            .catch(err => res.json(err));
    },
    // api/thoughts<thought Id> updating a thought
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
    // api/thoughts<thought Id> getting a single thought by Id
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
    // api/thoughts<thought Id> delete a single thought by Id
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

    // api/thoughts/<thoughtId>/reactions (posting a reaction)
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

    // api/thoughts/<thoughtId>/reactions/<reactionId> (delete a reaction)
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