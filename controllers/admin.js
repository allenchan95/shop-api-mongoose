const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price ,description} = req.body;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id);
  product
    .save()
    .then(result => {
     res.json('Product Created !');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req,res,next) => {
    Product.fetchAll()
    .then(products => {
        res.json(products);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.postEditProduct = (req,res,next) => {
    const { _id, title, imageUrl, price ,description} = req.body;
    const product = new Product(title,price,description,imageUrl,_id);
    product
    .save()
    .then(result => {
     res.json('Product Updated !');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postDeleteProduct = (req,res,next) => {
    const { _id} = req.body;
    Product.deleteById(_id)
    .then(result => {
     res.json('Product Deleted !');
    })
    .catch(err => {
      console.log(err);
    });
}





