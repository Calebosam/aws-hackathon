const { Router } = require('express');
const { getUsers, register, login, getCurrentUser, logout, verifyEmail, sendPasswordResetLink, resetPassword } = require('../controllers/authentication');
const { registerValidation, loginValidation } = require('../validators/authentication')
const { validationMiddleware } = require('../middlewares/validation')
const { userAuthentication } = require('../middlewares/authentication')
const { verifyTokenMiddleware } = require('../middlewares/verify-email');
const { verifyUser } = require('../middlewares/verify-user');
const { verifyResetToken } = require('../middlewares/verify-reset-token');
const router = Router();

router.get('/users', getUsers);
router.get('/currentUser', userAuthentication, getCurrentUser);
router.post('/register', registerValidation, validationMiddleware, register);
router.get('/verify-email/:token', verifyTokenMiddleware, verifyEmail);
router.post('/requestpasswordreset', verifyUser, sendPasswordResetLink);
router.post('/resetpassword', verifyResetToken, resetPassword)
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', logout);

module.exports = router