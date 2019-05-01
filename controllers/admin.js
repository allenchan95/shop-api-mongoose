const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price ,description} = req.body;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
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
    Product.find()
    .then(products => {
        res.json(products);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.postEditProduct = (req,res,next) => {
    const { _id, title, imageUrl, price ,description} = req.body;
    Product.findById(_id)
    .then(product => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then(result => {
     res.json('Product Updated !');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postDeleteProduct = (req,res,next) => {
    const { _id} = req.body;
    Product.findByIdAndRemove(_id)
    .then(result => {
     res.json('Product Deleted !');
    })
    .catch(err => {
      console.log(err);
    });
}





