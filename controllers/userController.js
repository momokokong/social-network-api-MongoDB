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
      const user = await User.findOne({ _id: req.params.uid })
        .select('-__v');

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

      // await Application.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'User deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user and 
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.uid }, { ...req.body }, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'User updated!', user })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user and 
  async addFriend(req, res) {
    try {
      // const user = await User.findOneAndDelete({ _id: req.params.uid });

      // if (!user) {
      //   return res.status(404).json({ message: 'No user with that ID' });
      // }

      // await Application.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'Added a friend!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user and 
  async deleteFriend(req, res) {
    try {
      // const user = await User.findOneAndDelete({ _id: req.params.uid });

      // if (!user) {
      //   return res.status(404).json({ message: 'No user with that ID' });
      // }

      // await Application.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'Deleted a friend!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
