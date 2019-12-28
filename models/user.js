const mongoose  = require('mongoose');
const validator = require('validator');

const UserSchema  = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    token:{
            type:String,
            required: true
    },
    texts:[{
        text:{
            type: String
        }
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;