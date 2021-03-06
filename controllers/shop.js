const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req,res,next) => {
    Product.find()
    .then(products => {
        res.json(products);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        res.json(product);
    })
    .catch(err =>{
        console.log(err);
    })  
}

exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product =>{
            return req.user.addToCart(product)
        }).then(result =>{
            res.json(result)
        })
        .catch(err => console.log(err))
}

exports.getCart = (req,res,next) => {
   req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user =>{
        const products = user.cart.items;
        res.json(products);
    })
    .catch(err => {
        console.log(err);
    })
}
exports.postCartDeleteProduct = (req,res,next) =>{
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result =>{
            res.json(result);
        })
        .catch(err => console.log(err))
}

exports.postOrder = (req,res,next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user =>{
        const products = user.cart.items.map(i =>{
            return {quantity: i.quantity, product: {...i.productId._doc}}
        });
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user._id
            },
            products: products
        });
        order.save();
    })
        .then(result=>{
            return req.user.clearCart();
           
        })
        .then((result)=>{
            res.json(result);
        })
        .catch(err => console.log(err))
}

exports.getOrders = (req,res,next) => {
    Order.find({"user.userId": req.user._id})
        .then(orders=>{
            console.log(orders);
            res.json(orders);
        })
        .catch(err => console.log(err));
}
