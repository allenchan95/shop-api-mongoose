const bodyParser = require('body-parser');
const express = require('express');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();

const cors = require('cors');
app.use(cors())


app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());


app.use((req,res, next) =>{
    console.log('HELLO! user');
    User.findById('5cc958a662962c27189ab957')
    .then(user =>{
        req.user = user;
        next();
    })
    .catch(err => console.log(err))
});
app.use('/admin',adminRoutes);
app.use(userRoutes);


app.use((req, res, next)=>{
    res.status(404).send('PAGE NOT FOUND!');
});


mongoose
  .connect(
    'mongodb+srv://allen:123123123zZ@cluster0-tzfsu.mongodb.net/shop?retryWrites=true'
  )
  .then(result => {
    User.findOne().then(user=>{
      if(!user){
        const user = new User({
          name: "Allen",
          email: 'allen@gmamil.com',
          cart: {
            items: []
          }
        })
        user.save();
      }
    })

    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });




