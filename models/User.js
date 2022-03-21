const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is a required field'],
        trim: true        
    },
    email: {
        type: String,
        required: [true, 'Email is a required field'],
        unique: true,
        validate: {
			validator: function (value) {
				return isEmail(value);
			}
        }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true,
    }
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;