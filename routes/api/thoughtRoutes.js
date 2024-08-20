const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
// get(getThoughts) Get all thoughts
// post(createThought) Create a thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
// thoughtId is the thought._id
// get(getSingleThought) Get a single thought
// put(updateThought) Update a thought
// delete(deleteThought) Delete a thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions/
// thoughtId is the thought._id
// post(addReaction) Add a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// thoughtId is the thought._id
// reactionId is the reaction._id
// delete(deleteReaction) Delete a reaction from a thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
