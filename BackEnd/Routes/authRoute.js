const express = require('express')
const {login, logout, registerEmployee, registerEmployer, checkSession} = require('../Controllers/authController')

const router = express.Router();

router.post(
    '/login',
    login
)

router.post(
    '/logout',
    logout
)

// Add the new session check endpoint
router.get(
    '/session',
    checkSession
)

router.post(
    '/registerEmployer',
    registerEmployer
)

router.post(
    '/registerEmployee',
    registerEmployee
)

module.exports = router