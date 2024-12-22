const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.getProduct = async (req, res, next) => {
    try{
        const product = await Product.find({ quantity: { $gt: 0 } });
        if(!product) { 
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({product, message: "Product fetched successfully"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.addToCart = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.productId);
        if(!product) { 
            return res.status(404).json({message: "Product not found"});
        }
        const cart = await Cart.findOne({user: req.user.id, product: product._id, processed: false});
        if (!cart) {
            const newCart = new Cart({user: req.user.id, product: product._id, quantity: req.body.quantity});
            await newCart.save();
            return res.status(200).json({message: "Product added to cart"});
        } else {
            return res.status(400).json({message: "Item already in the cart"});
        }
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.removeFromCart = async (req, res, next) => {
    try{
        const cart = await Cart.findByIdAndDelete(req.params.cartId);
        if(!cart) { 
            return res.status(404).json({message: "Product not found in cart"});
        }
        res.status(200).json({message: "Product removed from cart"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.updateCartQuantity = async (req, res, next) => {
    try{
        const cart = await Cart.findByIdAndUpdate(req.params.cartId, {quantity: req.body.quantity}, {new: true});
        if(!cart) { 
            return res.status(404).json({message: "Product not found in cart"});
        }
        res.status(200).json({message: "Product quantity updated in cart"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
}

exports.getCart = async (req, res, next) => {
    try{
        const cart = await Cart.find({user: req.user.id, processed: false}).populate('product');
        if(!cart) { 
            return res.status(404).json({message: "Cart not found"});
        }
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += parseInt(item.product.price, 10) * item.quantity;
        });
        res.status(200).json({cart, totalPrice, message: "Cart fetched successfully"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.checkout = async (req, res, next) => {
    try{
        const orderInfo = req.body;
        orderInfo.user = req.user.id;
        const cart = await Cart.find({user: req.user.id, processed: false}).populate('product');
        if(!cart) { 
            return res.status(404).json({message: "Cart not found"});
        }
        cartItems = [];
        cart.forEach(item => {
            item.processed = true;
            item.product.quantity = (item.product.quantity - item.quantity);
            item.product.save();
            item.save();
            cartItems.push(item._id);
        });
        orderInfo.items = cartItems;
        const newOrder = new Order(orderInfo);
        await newOrder.save();
        res.status(200).json({message: "Order placed successfully"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.getOrders = async (req, res, next) => {
    try{
        const orders = await Order.find({user: req.user.id});
        res.status(200).json({orders, message: "Orders fetched successfully"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
}