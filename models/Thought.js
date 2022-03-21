const {
    Schema,
    model,
    Types
} = require('mongoose');
const moment = require('moment');
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: () => moment().format('MM/DD/YYYY')
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'Cannot add an empty string'],
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: () => moment().format('MM/DD/YYYY')
    },
    username: {
        type: String,
        required: [true, 'Username must be provided']
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
    }
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;