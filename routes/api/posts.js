const express = require('express');
const router = express.Router();
const {check,validationResult}= require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts')
const User = require('../../models/User');
const Profile = require('../../models/Profile');


// @route POST api/posts
// @desc  create a post
// @access Private
router.post('/',[auth,[
    check('text','text is required').not().isEmpty()
]],
async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});

    }

    try {
        
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post ({
            text : req.body.text,
            name: user.name,
            avatar:user.avatar,
            user: req.user.id
        })
        const post = await newPost.save();
        res.json(post);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }

});

// @route GET api/posts
// @desc  GET all posts
// @access Private

router.get('/',auth,async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})


// @route GET api/posts/:id
// @desc  GET post by id
// @access Private

router.get('/:id',auth,async(req,res)=>{
    try {
        const posts = await Post.findById(req.params.id);
        if(!posts){
            return res.status(404).json({msg:'post not found'});

        }

        res.json(posts);
    } catch (error) {
        console.error(error.message);
        if(!error.kind=='ObjectId'){
            return res.status(404).json({msg:'not a valid id'});

        }
        res.status(500).send('server error')
    }
})

module.exports =router;
