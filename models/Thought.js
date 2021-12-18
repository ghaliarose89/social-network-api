const { Schema, Type, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId
    },
    reactionBody:{
        type:String,
        required:true,
        max:250

    },
    username:{
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)

    }

})


const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'thought text is required',
        min: 1,
        max: 12
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],

},
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }

    }

);

ThoughtSchema.virtual('reactionCount').get(function () {
    this.reactions.length;
});
const Thought = model('Thoght', ThoughtSchema);

module.exports = Thought;

