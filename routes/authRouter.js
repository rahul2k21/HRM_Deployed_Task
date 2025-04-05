const { Router } = require("express");
const { login, register, getAllUsers } = require("../controller/authController"); 

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/", getAllUsers );



module.exports = authRouter;
