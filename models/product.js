const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId :{
    type: Schema.Types.ObjectId,
    required:true,
    ref: 'User'
  }
});

module.exports = mongoose.model('Product', productSchema);



// const mongodb = require('mongodb'); 
// const getDb = require('../util/database').getDb;
// class Product {
//     constructor(title,price,description,imageUrl, id ,userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id;
//         this.userId = userId;
//     }
//  save() {
//     const db = getDb();
//     let  dbOp;
//     if(this._id){
//         //update the product
//         console.log('updateing books');
//         dbOp =  db.collection('products').updateOne({_id: new mongodb.ObjectID(this._id)},{$set: {title: this.title, price: this.price, description: this.description, imageUrl: this.imageUrl}
//         })
//     } else {
//         dbOp =  db.collection('products').insertOne(this)
//     }
//     return dbOp
//     .then(result => {
        
//     })
//     .catch(err => {
//         console.log(err);
//     })
//  }

//  static fetchAll() {
//      const db = getDb();
//      return db.collection('products')
//      .find()
//      .toArray()
//      .then(products =>{
//          console.log(products);
//          return products;
//      })
//      .catch(err =>{
//          console.log(err);
//      })
//  }
//  static findById(prodId) {
//      const db =getDb();
//      return db.collection('products')
//      .find({_id: mongodb.ObjectID(prodId)})
//      .next()
//      .then(product =>{
//         console.log(product);
//         return product;
//      })
//     .catch(err =>{
//         console.log(err);
//       })
   
//  }
//  static deleteById(prodId) {
//     const db =getDb();
//     return db.collection('products')
//     .deleteOne({_id: new mongodb.ObjectID(prodId)})
//     .then(product =>{
//         console.log("deleted!");
//        return product;
//     })
//    .catch(err =>{
//        console.log(err);
//      })
  
// }


// }

// module.exports = Product;