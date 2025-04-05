
const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {
    try {
        const { name, email, phone, position, department, experience } = req.body;

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee with this email already exists" });
        }

        const newEmployee = new Employee({
            name,
            email,
            phone,
            position,
            department,
            experience
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee added successfully", employee: newEmployee });

    } catch (error) {
        res.status(500).json({ message: "Error adding employee", error: error.message });
    }
};

exports.getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error: error.message });
    }
};

exports.editEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, position, department, experience } = req.body;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        if (email && email !== employee.email) {
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) {
                return res.status(400).json({ message: "Email already in use by another employee" });
            }
        }

        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.phone = phone || employee.phone;
        employee.position = position || employee.position;
        employee.department = department || employee.department;
        employee.experience = experience || employee.experience;

        await employee.save();
        res.status(200).json({ message: "Employee updated successfully", employee });

    } catch (error) {
        res.status(500).json({ message: "Error updating employee", error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the employee
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", error: error.message });
    }
};
