const express = require('express');
const { getProduct, addToCart, removeFromCart, updateCartQuantity, getCart, checkout, getOrders } = require('../controllers/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

const router = express.Router();

router.get('/get', getProduct);
router.post('/add-to-cart/:productId', isAuthenticatedUser, addToCart);
router.delete('/remove-from-cart/:cartId', isAuthenticatedUser, removeFromCart);
router.patch('/update-cart-quantity/:cartId', isAuthenticatedUser, updateCartQuantity);
router.get('/get-cart', isAuthenticatedUser, getCart);
router.post('/checkout', isAuthenticatedUser, checkout);
router.get('/get-orders', isAuthenticatedUser, getOrders);


module.exports = router;