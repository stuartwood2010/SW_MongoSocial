const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction
} = require('../../../controllers/thoughtController');

router.route('/')
    .get(getAllThoughts)
    .post(createThought)
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById)
router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)
module.exports = router;