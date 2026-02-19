const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: Number,
    comment: String,
    date: Date,
    reviewerName: String,
    reviewerEmail: String,
  },
  { _id: false },
);

const dimensionSchema = new mongoose.Schema(
  {
    width: Number,
    height: Number,
    depth: Number,
  },
  { _id: false },
);

const metaSchema = new mongoose.Schema(
  {
    createdAt: Date,
    updatedAt: Date,
    barcode: String,
    qrCode: String,
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    productId: Number, // your "id"
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: dimensionSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [reviewSchema],
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: metaSchema,
    images: [String],
    thumbnail: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
