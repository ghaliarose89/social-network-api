const { Thought, User } = require('../models');
const thoughController = {
    
    addThought({ body }, res) {
        Thought.create(body)
            .then(({userId }) => {
                return User.findOneAndUpdate({ _id: params.userId },
                    {$addToSet: { thoughts: _id } },
                    { new: true });
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

}

module.exports = thoughController;