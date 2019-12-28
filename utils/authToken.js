const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifytoken = async (req, res, next) => {
    let token = req.headers['authorization']; 
    if(token){
        try {
        
            if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
            }
            const decoded  = jwt.verify(token, 'testbackend')
            const user  = await User.findOne({ id:decoded._id, 'token': token})

            if(!user){
                throw new Error()
            }
            req.token = token
            req.user = user
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({error:'token is not valid!'})
        }
    }
};

module.exports = verifytoken;