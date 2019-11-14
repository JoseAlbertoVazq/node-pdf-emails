const express = require('express');
const router = express.Router();
const pdf = require('../controllers/pdf-controller');

router.post('/pdf', pdf.sendPdf);

module.exports = router;