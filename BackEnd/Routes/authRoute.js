const express = require('express')
const {login, logout, registerEmployee, registerEmployer} = require('../Controllers/authController')


const router = express.Router();

router.post(
    '/login',
    login
)

router.post(
    '/logout',
    logout
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