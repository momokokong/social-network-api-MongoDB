const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users 
// get(getUsers) Get all users
// post(createUser) Create a user
router.route('/').get(getUsers).post(createUser);

// /api/users/:uid
// uid is the user._id
// get(getSingleUser) Get a single user
// put(updateUser) Update a user
// delete(deleteUser) Delete a user and associated thoughts
router.route('/:uid').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:uid/friends/:fid
// uid is the user._id
// fid is the firend's user._id
// post(addFriend) Add a friend fid to user uid
// delete(deleteFriend) Delete a firend fid from user uid
router.route('/:uid/friends/:fid').post(addFriend).delete(deleteFriend);

module.exports = router;
