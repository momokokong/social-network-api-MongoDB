const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleThought(req, res) {
    try {
      // if viewing a single thought, populate the reactions
      const thought = await Thought.findById(req.params.thoughtId).populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // add the thought to the user's thoughts array
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({
          message: 'Great thought, but found no user with that ID',
        })
      }

      res.json({ message: 'Great thought created!', thought });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Check thoughtText' });
      }

      res.json({ message: 'Thought successfully updated!', thought });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete a thought
  async deleteThought(req, res) {
    try {
      console.log(req.params.thoughtId);
      const thought = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId }, 
        { new: true }
      );
      console.log(thought);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      // remove the thought from a user's thoughts array
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created but no user with this name!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add a reaction to a thought by thought id
  async addReaction(req, res) {
    try {
      // make sure the username exists in User
      if (!(await User.findOne({ username: req.body.username }))) {
        return res.status(400).json({ message: 'Are you a real person?' });
      }

      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json({ message: 'Reaction added!', thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a reaction from a thought by thought id
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId }}},
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json({ message: 'Reaction removed!', thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
