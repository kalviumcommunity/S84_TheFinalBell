const express = require("express")
const router = express.Router()
const {register , login , logout} = require("../controllers/authController")
const User = require("../model/User")

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/" , async(req ,res)=>{
    const data = await User.find() 
    return res.status(200).json(data)
})
module.exports = router
