const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      price: { type: Number },
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  paymentInfo: {
    method: String,
    paid: { type: Boolean, default: false },
    paidAt: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema); 