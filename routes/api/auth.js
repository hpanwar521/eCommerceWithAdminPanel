const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const {check,validationResult}=require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');



// @route GET api/auth
// @desc  user already loggedIn
// @access Public
router.get('/',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');/*The include always but exclude sometimes example:

                                                                                       Users.find().select("-password")
                                                                                             or
        
                                                                                       Users.find().exclude("password")
                                                                                    The exlucde always but include sometimes example:
        
                                                                                       Users.find().select("+password")
                                                                                    but you must define in the schema:
        
                                                                                    password: { type: String, select: false }*/
        
         res.json(user);

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }
});


//login

router.post('/',[
    check('email','please enter a valid email').isEmail(),
    check('password','password should be min 6 letters').exists()
],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({errors:[{msg:'user is not registered'}]});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({errors:[{msg:'password is invalid'}]});
        }

        const payload ={
            user:{
                id: user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:50000000000},
        (err,token)=>{
            if(err) throw err
            res.json({token})});

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }


})




module.exports =router;
