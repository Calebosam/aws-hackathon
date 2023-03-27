const { Router } = require('express');
const { getUsers, register, login, logout } = require('../controllers/authentication');
const { registerValidation, loginValidation } = require('../validators/authentication')
const { userAuthentication } = require('../middlewares/authentication')
const { validationMiddleware } = require('../middlewares/validation')
const router = Router();

router.get('/users', getUsers);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', userAuthentication, logout)


module.exports = router