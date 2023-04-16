const { Router } = require('express');
const { getUsers, register, login, getCurrentUser, logout, verifyEmail } = require('../controllers/authentication');
const { registerValidation, loginValidation } = require('../validators/authentication')
const { validationMiddleware } = require('../middlewares/validation')
const { userAuthentication } = require('../middlewares/authentication')
const { verifyTokenMiddleware } = require('../middlewares/verify-email')
const router = Router();

router.get('/users', getUsers);
router.get('/currentUser', userAuthentication, getCurrentUser);
router.post('/register', registerValidation, validationMiddleware, register);
router.get('/verify-email/:token', verifyTokenMiddleware, verifyEmail);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', logout);

module.exports = router