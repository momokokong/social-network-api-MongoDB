const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.uid }).populate("thoughts").populate("friends");

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.uid });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: 'User and the user\'s thoughts have been deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.uid }, 
        { ...req.body }, 
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'User updated!', user })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend to a user
  async addFriend(req, res) {
    try {
      if (req.params.uid === req.params.fid) {
        return res.status(400).json({ message: 'Cannot add yourself as a friend!' });
      }
      if (!(await User.findById(req.params.fid))) {
        return res.status(400).json({ message: 'Is your friend a real person?' });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.uid },
        { $addToSet: { friends: req.params.fid } },
        { new: true }
      ).populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'Added a friend!', user })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a friend from a user
  async deleteFriend(req, res) {
    try {
      if (!(await User.findById(req.params.fid))) {
        return res.status(400).json({ message: 'Is your friend a real person?' });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.uid },
        { $pull: { friends: req.params.fid } },
        { new: true }
      ).populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'Deleted a friend!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
