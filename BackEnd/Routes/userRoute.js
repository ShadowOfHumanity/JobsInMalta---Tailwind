const express = require('express');
const { getProfileInfo, editProfileInfo } = require('../Controllers/userController');

const router = express.Router();

router.get(
    '/getProfileInfo',
    getProfileInfo
)

router.post(
    '/updateProfileInfo',
    editProfileInfo
)

module.exports = router