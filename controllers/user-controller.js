const {Thought,User} = require ('../models');


const userController = {
    //post a new user function
    addUser({ body},res){
        User.create(body)
        .then (dbData => res.json(dbData))
        .catch(err => res.json(err));
        
    },

    //getting all users route
    getAllUsers(req, res){
        User.find({})
        .then (dbData => res.json(dbData))
        .catch(err => res.json(err));
    },
// geting a user byId 
// api/users/<userId>
    getUserById({params},res){
        User.findOne({ _id: params.id })
        
        .populate({path:'thoughts', select: "-__v"})
        // populate user friends
        .populate({path :'friends', select: "-__v"})
        .select('-__v')
        .then (dbData => res.json(dbData))
        .catch(err => res.json(err));
         
    },
    // updating a user by Id
    // api/users/:userId
    uppdateUser ({params, body}, res){
        User.findByIdAndUpdate({_id : params.id} , body, {new: true})
        . then(dbData=>{
            if (!dbData){
                res.status(404).json({ message: 'No user found with this id!' });
          return;
            }
            res.json(dbData)

        })
        .catch(err => res.json(err));

    },

    // api/users/:userId

    deleteUser({params}, res){
        User.findOneAndDelete({_id : params.id})
        .then (dbData=>{
            if (!dbData){
                res.status(404).json({message: 'No user found with this id!' })
            }
            res.json(dbData)

        })
        .catch(err=> res.json(err))
    },
    // api/users/:userId/friends/friendId
    addFriend({params}, res){
        User.findOneAndUpdate({ _id : params.userId },
        {$addToSet:{ friends:params.friendId} }, 
        { new: true}
        )
        
        . then (dbData=> {
            if (!dbData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbData);
          })
          .catch(err => res.json(err));

    },

// api/users/:userId/friends/friendId

    removeFriend({params},res){
        User.findOneAndUpdate(
            {_id:params.userId},
            {$pull: { friends: params.friendId}}, { new: true}
            
        )
        . then (dbData=> {
            if (!dbData) {
              res.status(404).json({ message: 'No friend or user found with this id!' });
              return;
            }
            res.json(dbData);
          })
          .catch(err => res.json(err));
    }


}

module.exports = userController;