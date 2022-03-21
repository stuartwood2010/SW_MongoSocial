const { User } = require('../models');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users)
        } catch (error) {
            res.json(error);
        }
    },
    getUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findById(userId);
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    },
    createUser: async (req, res) => {
        const { username, email } = req.body
         try {
            const newUser = await User.create({
                username,
                email
            });
            res.json(newUser);
         } catch (error) {
             res.json(error);
         }
    },
    updateUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {...req.body},
                { new: true, runValidators: true }
            );
            res.json(updatedUser)
        } catch (error) {
            res.json(error);
        }
    },
    deleteUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            res,json(deletedUser)
        } catch (error) {
            res.json(error);
        }
    },
    addFriendToUserById: async (req, res) => {
        const { userId, friendId } = req.params;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { friends: friendId }},
                { runValidators: true, new: true }
            );
            res.json(updatedUser)
        } catch (error) {
            res.json(error)
        }
    },
    removeFriendFromUserById: async (req, res) => {
        const { userId, friendId } = req.params;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { runValidators: true, new: true }
            );
            res.json(updatedUser)
        } catch (error) {
            res.json(error)
        }
    }
}