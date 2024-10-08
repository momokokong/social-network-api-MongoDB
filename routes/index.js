const router = require('express').Router();
const apiRoutes = require('./api');

// Only backend api routes from ./api and nothing else
router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
