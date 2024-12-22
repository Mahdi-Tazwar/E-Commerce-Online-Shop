const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    shippingAddress: String,
    contactNumber: String,
    email: String,
    totalPrice: Number,
    orderStatus: {type: String, enum: ["placed", "shipping", "shipped", "delivering", "delivered"], default: "placed"}
  }, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;