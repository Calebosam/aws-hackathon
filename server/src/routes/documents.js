const { Router } = require('express');
const { getDocuments, postDocument, downloadFile, deleteFile } = require('../controllers/documents');
const { userAuthentication } = require('../middlewares/authentication')
const router = Router();

router.get('/documents', userAuthentication, getDocuments);
router.post('/upload', userAuthentication, postDocument)
router.get('/download/:id', userAuthentication, downloadFile);
router.delete('/delete/:id', userAuthentication, deleteFile);

module.exports = router