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
router.route('/').get(getUsers).post(createUser);

// /api/users/:uid
router.route('/:uid').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:uid/friends/:fid
router.route('/:uid/friends/:fid').post(addFriend).delete(deleteFriend);

module.exports = router;
