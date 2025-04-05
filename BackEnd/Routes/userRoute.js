const express = require('express');
const { getProfileInfo } = require('../Controllers/userController');

const router = express.Router();

router.get(
    '/getProfileInfo',
    getProfileInfo
)

router.put(
    '/updateProfileInfo',
    editProfileInfo
)

module.exports = router