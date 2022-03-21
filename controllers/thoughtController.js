const {
    User,
    Thought
} = require('../models');

module.exports = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (error) {
            res.json(error)
        }
    },
    getThoughtById: async (req, res) => {
        const {
            thoughtId
        } = req.params;
        try {
            const thought = await Thought.findById(thoughtId);
            res.json(thought)
        } catch (error) {
            res.json(error)
        }
    },
    createThought: async (req, res) => {
        const {
            thoughtText,
            username,
            userId
        } = req.body
        try {
            const newThought = await Thought.create({
                thoughtText,
                username,
                userId
            });
            await User.findByIdAndUpdate(
                userId, {
                    $push: {
                        thoughts: newThought.id
                    }
                }, {
                    runValidators: true,
                    new: true
                }
            );
            res.json(newThought);
        } catch (error) {
            res.json(error)
        }
    },
    updateThoughtById: async (req, res) => {
        const {
            thoughtId
        } = req.params
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId, {
                    ...req.body
                }, {
                    new: true,
                    runValidators: true
                }
            );
            res.json(updatedThought)
        } catch (error) {
            res.json(error)
        }
    },
    deleteThoughtById: async (req, res) => {
        const {
            thoughtId
        } = req.params;
        try {
            const deletedThought = await Thought.findByIdAndDelete(thoughtId);
            res.json(deletedThought)
        } catch (error) {
            res.json(error)
        }
    },
    addReaction: async (req, res) => {
        const {
            thoughtId
        } = req.params;
        const reaction = req.body;
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId, {
                    $push: {
                        reactions: reaction
                    }
                }, {
                    runValidators: true,
                    new: true
                }
            );
            res.json(updatedThought)
        } catch (error) {
            re.json(error)
        }
    },
    deleteReaction: async (req, res) => {
        const {
            thoughtId
        } = req.params;
        const {
            reactionId
        } = req.body;
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId, {
                    $pull: {
                        reactions: {
                            reactionId: reactionId
                        }
                    }
                }, {
                    runValidators: true,
                    new: true
                }
            );
            res.json(updatedThought)
        } catch (error) {
            res.json(error)
        }
    }
}