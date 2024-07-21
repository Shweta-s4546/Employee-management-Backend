const express = require('express');
const { getEmployee,addEmployee,updateEmployee,deleteEmployee} = require('../controller/employeController');

const employeeRoute = express.Router();


employeeRoute.get(`/getAll`, getEmployee)
employeeRoute.post(`/add`, addEmployee)
employeeRoute.patch(`/edit/:id`, updateEmployee)
employeeRoute.delete(`/delete/:id`,deleteEmployee)


module.exports = employeeRoute