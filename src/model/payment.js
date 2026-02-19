const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: String,
      price: Number,
    },

    cardDetails: {
      cardNumber: String,
      cardName: String,
      expiry: String,
      cvv: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "SUCCESS",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
