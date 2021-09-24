const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');
const config = require('config');




// @route GET api/profile/me
// @desc  already loggedIn user profile/ get current user profile
// @access private
router.get('/me',auth,async(req,res)=>{
    try {
        const Profile = await Profile.findOne({req: req.user.id}).populate('user',['user','avatar']);

        if (!Profile){return res.status(400).json({msg:'there is no profile for this user'});}

        res.json(Profile);

    } catch (error) {
        res.status(500).send('server error')
    }


}




)

// @route post api/profile
// @desc   create or update a user profile
// @access private
router.post('/',[auth,[
    check('status','status is required').not().isEmpty(),
    check('skills','skills is required').not().isEmpty()

]],async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty){
        res.status(400).json({error:error.array()});

    }
    const {company,website,location,bio,status,githubusername,
        skills,youtube,facebook,twitter,instagram,linkedin}=req.body;
    
    //Build profile object
    const profileFields ={};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {profileFields.skills = skills.split(',').map(skill=>skill.trim());}
    
    //build social object
    profileFields.social={}

    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({user:req.user.id});
        
        if (profile){
            //update if profile found

            profile = await Profile.findOneAndUpdate({user:req.user.id},{$set: profileFields},{new:true});

            return res.json(profile);

        }
        //create if profile not found

        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile); 
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }

});


// @route GET api/profile
// @desc  get all user profiles
// @access public
router.get('/', async(req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server  error')
    }

});
// @route GET api/profile/user/:user_id
// @desc  get user profile by the userId (jese facebook me hota userid dene par  koi bhi profile dek pata hai)
// @access public
router.get('/user/:user_id', async(req,res)=>{
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user',['name','avatar']);
        if(!profile) return res.status(400).json({msg:'there is no profile for this user'});
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind=='ObjectId'){return res.status(400).send('user id is invalid')};
        res.status(500).send('server  error')
    }

});

// @route DELETE api/profile
// @desc  DELETE user & posts & user's profile
// @access private
router.delete('/api/profile',auth,async(req,res)=>{
    try {
        //delete user's post
        //delete user's profile
        //delete user

        await Promise.all([

            Profile.findOneAndRemove({user:req.user.id}),
            User.findOneAndRemove({_id:req.user.id})
        ]);

        res.json({msg:'user deleted'});

    } catch (error) {
        res.status(500).send('server error');
    }
})


// @route PUT api/profile/experience
// @desc  ADD profile experience
// @access private
router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','company is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty(),

]],
async(req,res)=>{
const error= await validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({error:error.array()});

}

const {title,company,location,from,to,current,description}=req.body;

const newExp={
    title,company,location,from,to,current,description
}

try {
    const profile = await Profile.findOne({user:req.user.id});
    profile.experience.unshift(newExp);

    await profile.save();
    res.json(profile);

    
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
    
}

});


// @route DELETE api/profile/experience/:exp_id
// @desc  DELETE profile experience
// @access private

router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});

        //get remove index 
        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex,1);
        await profile.save();

        res.json(profile);


    } catch (error) {
        console.error(error.message);
    res.status(500).send('server error');
    
    }
});

// @route PUT api/profile/education
// @desc  ADD profile education
// @access private
router.put('/education',[auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','Field of study is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty(),
    

]],
async(req,res)=>{
const error= await validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({error:error.array()});

}

const {school,degree,fieldofstudy,from,to,current,description}=req.body;

const newEdu={
    school,degree,fieldofstudy,from,to,current,description
}

try {
    const profile = await Profile.findOne({user:req.user.id});
    profile.education.unshift(newEdu);

    await profile.save();
    res.json(profile);

    
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
    
}

});


// @route DELETE api/profile/education/:edu_id
// @desc  DELETE profile experience
// @access private

router.delete('/education/:edu_id',auth,async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});

        //get remove index 
        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex,1);
        await profile.save();

        res.json(profile);


    } catch (error) {
        console.error(error.message);
    res.status(500).send('server error');
    
    }
});

// @route GET api/profile/github/:username
// @desc  Get user repos from github
// @access public

router.get('/github/:username',(req,res)=>{
    try {
        const options = {
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers:{'user-agent':'node.js'}
        }
        request(options,(error,response,body)=>{
            if(error)console.error(error);
            if(response.statusCode!==200){
              return  res.status(404).json({msg:'no github profile found '})
            }
            res.json(JSON.parse(body));

        })
    } catch (error) {
        console.error(error.message);
    res.status(500).send('server error');
        
    }
})


module.exports =router;
