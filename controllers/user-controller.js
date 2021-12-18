const {Thought,User} = require ('../models');

const userController = {
    //post a new user function
    addUser({ body},res){
        User.create(body,{ new: true , runValidators:true})
        .then (dbData => res.json(dbData))
        .catch(err => res.json(err));
        
    },
    getAllUsers(req, res){
        User.find({})
        .then (dbData => res.json(dbData))
        .catch(err => res.json(err));
    },

    getUserById({params},res){
        User.findOne({ _id : params.id})
        .populate({
            path:'thoughts',
            select:'-_v',
            populate:'friends'
        })
        .then (dbData => res.json(dbData))
        .catch(err => res.json(err));
         
    },





}

module.exports = userController;