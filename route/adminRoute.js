const express = require('express');
const { register, logedOut,login } = require('../controller/adminController');

const adminRoute = express.Router();


adminRoute.post(`/registers`, register)
adminRoute.post(`/login`, login)
adminRoute.get(`/logout`, logedOut)

module.exports = adminRoute