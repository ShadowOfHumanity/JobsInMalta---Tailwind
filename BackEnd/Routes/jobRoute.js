const express = require('express')
const {getJobs, postJobs} = require('../Controllers/jobController')

const router = express.Router();

router.get(
    '/getJobs',
    getJobs
)

router.post(
    '/postJobs',
    postJobs
)

module.exports = router