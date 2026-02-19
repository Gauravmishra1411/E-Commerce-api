const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = require("../model/user.detail");
const Auth = require("../middelwere/Auth");
const Product = require("../model/product");
const Contact = require("../model/contact");

const Payment = require("../model/payment");

// post create



route.post("/user-reg", async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    // 1️⃣ Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Normalize email
    email = email.toLowerCase().trim();

    // 2️⃣ Check if user exists
    const isUser = await UserSchema.findOne({ email });
    if (isUser) {
      return res.status(409).json({
        message: "User already registered with this email",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const user = await UserSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Success response (no password)
    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    // Duplicate email fallback
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await UserSchema.findOne({ email: email });
    if (!isUser) {
      return res.status(409).json({
        message: `this email${email} are not registered `,
        error: error.message,
      });
    }
    const user = await bcrypt.compare(password, isUser.password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRAT, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true, // 🔐 not accessible via JS
      secure: false, // true in production (HTTPS)
      sameSite: "strict", // 🛡 CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      message: `${isUser.firstName} login successful`,
      token: token,
      user: isUser._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

route.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout successful",
  });
});

route.post("/seed-products", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        message: "Products array is required",
      });
    }

    await Product.deleteMany({});

    const formattedProducts = products.map((p) => ({
      ...p,
      productId: p.id,
    }));

    const savedProducts = await Product.insertMany(formattedProducts);

    res.status(201).json({
      message: "Products inserted successfully",
      count: savedProducts.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

route.post("/payment/pay", Auth, async (req, res) => {
  try {
    const { product, cardDetails } = req.body;

    const payment = await Payment.create({
      user: req.user.id,
      product: {
        productId: product._id,
        title: product.title,
        price: product.price,
      },
      cardDetails,
      amount: product.price,
    });

    res.status(201).json({
      message: "Payment successful",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment failed",
      error: error.message,
    });
  }
});
 

// POST /api/contact
route.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// GET /api/contact (optional - admin)
route.get("/contact", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

 

module.exports = route;
