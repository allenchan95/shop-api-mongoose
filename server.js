const bodyParser = require('body-parser');
const express = require('express');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const app = express();

const cors = require('cors');
app.use(cors())


app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());


app.use((req,res, next) =>{
    console.log('HELLO! user');
    User.findById('5cc6df8e1c9d440000d5d340')
    .then(user =>{
        req.user = new User(user.name,user.email,user.cart,user._id);
        next();
    })
    .catch(err => console.log(err))
});
app.use('/admin',adminRoutes);
app.use(userRoutes);


app.use((req, res, next)=>{
    res.status(404).send('PAGE NOT FOUND!');
});


mongoConnect(()=>{
    app.listen(3000);
});



