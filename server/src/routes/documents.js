const { Router } = require('express');
const { getDocuments, postDocument, downloadFile } = require('../controllers/documents');
const { userAuthentication } = require('../middlewares/authentication')
const router = Router();

router.get('/documents', userAuthentication, getDocuments);
router.post('/upload', userAuthentication, postDocument)
router.get('/download/:id', userAuthentication, downloadFile)

module.exports = router