const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      console.log(req.params.thoughtId);
      const thought = await Thought.findById(req.params.thoughtId);
      console.log(thought);
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the createThought method
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
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
  // TODO: Add comments to the functionality of the updateThought method
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Check username and thoughtText' });
      }

      res.json({ message: 'Thought successfully updated!', thought });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the deleteThought method
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
  // TODO: Add comments to the functionality of the addTag method
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { tags: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
      res.json({ message: 'Reaction added!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the addTag method
  async deleteReaction(req, res) {
    try {
      // const thought = await Thought.findOneAndUpdate(
      //   { _id: req.params.thoughtId },
      //   { $pull: { tags: { tagId: req.params.tagId } } },
      //   { runValidators: true, new: true }
      // );

      // if (!thought) {
      //   return res.status(404).json({ message: 'No thought with this id!' });
      // }
      res.json({ message: 'Reaction removed!' });
      // res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
