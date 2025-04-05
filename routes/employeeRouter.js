const express = require("express");
const router = express.Router();
const { addEmployee, getEmployee, editEmployee,deleteEmployee} = require("../controller/addEmployee.js");

router.post("/add", addEmployee); 
router.get("/all", getEmployee); 
router.delete("/:id", deleteEmployee); 
router.put("/edit/:id", editEmployee); 



module.exports = router;
