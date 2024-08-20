const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// /api/thoughts routes 
router.use('/thoughts', thoughtRoutes);

// /api/users routes
router.use('/users', userRoutes);

module.exports = router;
