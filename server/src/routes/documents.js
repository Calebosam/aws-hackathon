const { Router } = require('express');
const { getDocuments } = require('../controllers/documents');
const { userAuthentication } = require('../middlewares/authentication')
const router = Router();

router.get('/documents', userAuthentication, getDocuments);

module.exports = router