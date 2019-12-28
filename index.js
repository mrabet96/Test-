const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const justifyFunction = require('./utils/Justify');
const auth = require('./utils/authToken');
const User = require('./models/user')
const app = express();


mongoose.connect('mongodb://localhost:27017/testbackend',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
  console.log('connected to database');
}).catch(() =>{
  console.log('failed connected to database');
});

app.use(bodyParser.text());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(req);
    res.json({ message: 'welcome'})
})

app.post('/api/justify',auth , async (req, res) => {
    res.set('Content-Type', 'text/plain');
    await User.updateOne( 
        { _id: req.user._id},
        { $push: { texts: {text: JSON.stringify(req.body) } } }
    );
    console.log(req.user.texts);
    await req.user.save();
    let numberOfcacharcters = 0;
    let texts = req.user.texts;
    texts.forEach(elem => numberOfcacharcters = numberOfcacharcters + elem.text.length)
    if(numberOfcacharcters < 80000){
        console.log(numberOfcacharcters);
        console.log(req.user.texts);
        const text = justifyFunction(req.body);
        res.send(text);}  
    else {
        console.log(numberOfcacharcters);
        res.statusCode = 402;
        res.send('Payment Required');
    }
})

app.post('/api/token', async (req, res) => {
    const { email }  = req.body;
    const token = jwt.sign({"email":email}, 'testbackend', {expiresIn: 3600*24 });
    const user = new User({email: email, token: token} );
    await user.save();
    console.log(user);
    res.send({ user })
})

app.listen(4000, () =>{
    console.log('you\'re listen in 4000...')
})