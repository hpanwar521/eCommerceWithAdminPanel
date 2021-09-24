const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    admin:{
        type: Boolean

    },
    superadmin:{
        type: Boolean

    },
    user:{
        type: Boolean,
        default:true
    },
     date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);
