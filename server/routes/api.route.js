const express = require('express');

const router = express.Router();

const authRoutes = require('./auth.route');

router.use('/auth', authRoutes);
// router.get('/login', (req, res) => {
//     res.send('ha');
// });

module.exports = router;
