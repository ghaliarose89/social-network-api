const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default:new Types.ObjectId
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
        max: 280
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
    reactions: [ReactionSchema],

},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
}

);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

