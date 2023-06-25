const express = require('express');
// making obj of express.Router - router is used to route on particular URI
const router = express.Router();
// importing User schema 
const User = require('../modules/User');
// importing and destructing express-User.validator used for validating data 
const {body, validationResult } = require('express-validator');
// importing bcryptjs to encrypt the password  
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "SecretKeyforJwt"

// Route localhost:5000/api/auth/createuser
router.post('/createuser', [
    // adding some validations in array 
    body('name').isLength({min : 2}),
    body('email').isEmail(),
    body('password').isLength({min : 8}),
    ],
    async (req, res)=>{
        // error checking for validation  
        const errors = validationResult(req) 
        let success = false;
        if(!errors.isEmpty()){
            success = false;
            return res.status(400).json({success, errors : errors.array()});
        }
        try{    
            // checking user is already created or not 
            let user = await User.findOne({email: req.body.email})
            if(user){
                success = false;
                return res.status(400).json({success, error: "User with this email already exists"})
            }

            const salt = await bcrypt.genSalt(5);
            const secPass = await bcrypt.hash(req.body.password, salt)

            // creating user 
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            success = true;
            res.json({success, user, authtoken})
        }
        catch(error){
            console.error(error.message)
            success = false;
            return res.status(500).json({success, error: "Internal Server Error"});
        }
    })



    router.post('/login',[
        body('email').isEmail(),
        body('password').exists()
    ],
    async (req, res) =>{
        const errors = validationResult(req)
        let success = false;
        if(!errors.isEmpty()){
            success = false;
            return res.status(400).json({success, errors: errors.array()});
        }
        try{
            const {email, password}  = req.body;
            const user = await User.findOne({email})
            if(!user){
                success = false;
                return res.status(400).json({success, error: "Please login with the valid credentails"});
            }

            const passCheck = await bcrypt.compare(password, user.password);
            if(!passCheck){
                success = false;
                return res.status(400).json({success, error: "Please login with the valid credentails"});
            }

            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, authtoken});
        }catch(error){
            console.error(error.message)
            success = false;
            return res.status(500).json({success, error: "Internal Server Error"});
        }
    })

    router.post('/getuser',fetchuser , async (req, res) =>{
        try {
            let success = false;
            const userId = req.user.id
            const user = await User.findById(userId).select("-password");
            success = true;
            res.json({success, user})
        } catch (error) {
            console.error(error.message)
            success = false;
            return res.status(500).json({success, error: "Internal Server Error"});
        }
    })
module.exports = router;