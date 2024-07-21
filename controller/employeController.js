const Employee = require('../model/employeeModel')

//getemployee
const getEmployee = async(req,res) =>{ 
    try {

        const employees = await Employee.find();
        // console.log(' employees:', employees); 
        res.status(200).json({ length: employees.length, employees });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//add employee
const addEmployee  = async (req,res) =>{
    try {

        const { name, email, mobile, course, gender, designation } = req.body
        const newEmployee = await Employee.create({
            name,
            email,
            mobile,
            course,
            gender,
            designation
        })
        res.status(201).json({ message: 'New employee added', employee: newEmployee });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//update employee
const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      console.log('id:', id);
      console.log('updated:', req.body);
  
      const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updatedEmployee) {
        console.log(' not found');
        return res.status(404).json({ message: 'Employee not found' });
      }
      
      res.status(200).json({ message: 'Employee updated', employee: updatedEmployee });
    } catch (error) {
     
      res.status(400).json({ error: error.message });
    }
  };

//delete employee
const deleteEmployee  = async (req,res) =>{
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
}

module.exports = {getEmployee,addEmployee,updateEmployee,deleteEmployee}