const express = require("express");
const { handleGenrateNewShotUrl, handleRenderTheUrl, handleShowAllData, handleGetAnalytical } = require("../controller/url");

const router = express.Router();

router.post('/', handleGenrateNewShotUrl);

router.get('/:shortId',handleRenderTheUrl);

router.get('/', handleShowAllData);

router.get('/analytics/:shortId', handleGetAnalytical);

module.exports = router;