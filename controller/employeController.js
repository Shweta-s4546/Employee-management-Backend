const Employee = require('../model/employeeModel');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Get all employees
const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ length: employees.length, employees });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add employee
const addEmployee = [
  upload.single('image'),
  async (req, res) => {
    try {
        
      const { name, email, mobile, course, gender, designation, create_date } = req.body;
      const newEmployee = await Employee.create({
        name,
        email,
        mobile,
        course: Array.isArray(course) ? [...new Set(course)] : [course],
        gender,
        designation,
        create_date,
        image: req.file ? req.file.path : null
      });
      res.status(201).json({ message: 'New employee added', employee: newEmployee });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Update employee
const updateEmployee = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { id } = req.params;
      let updateData = req.body;
      
      if (req.file) {
        updateData.image = req.file.path;
      }

      // Handle course data
      if (updateData.course) {
        // If course is a string, convert it to an array
        if (typeof updateData.course === 'string') {
          updateData.course = updateData.course.split(',');
        }
        // Ensure it's an array and remove duplicates
        updateData.course = [...new Set(updateData.course)];
      }


      const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee updated', employee: updatedEmployee });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted', employee: deletedEmployee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getEmployee, addEmployee, updateEmployee, deleteEmployee };