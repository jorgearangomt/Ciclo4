const express = require('express');
const authController = require('../../controllers/authController');
const verifyToken = require('../../middlewares/verificationJWT');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout',verifyToken, authController.logout);
router.get('/is-logged',verifyToken, authController.isLogged);

module.exports = router;