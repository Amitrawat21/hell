import express from "express"
import users from "../Controller/userController.js";


const router = express.Router();


router.post("/register" , users.registration )
router.post("/login" , users.login)


export default router