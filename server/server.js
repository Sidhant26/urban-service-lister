const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserController = require("./contollers/UserController");
const GenderController = require("./contollers/GenderController");
const ServiceController = require("./contollers/ServiceController");
const BookingController = require("./contollers/BookingController");
const FeedbackController = require("./contollers/FeedbackController");
const ServiceTypeController = require("./contollers/ServiceTypeController");
const PaymentMethodController = require("./contollers/PaymentMethodController");
const ProductController = require("./contollers/ProductController");
const User = require("./models/User");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { log } = require("console");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://yash:123@cluster0.vo3rnei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server running on port 5000");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required.",
        user: false,
      });
    }

    const user = await User.findOne({ email_id: email });
    // console.log(user);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password.",
        user: false,
      });
    }

    const passwordMatch = password == user.password;

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      "your_secret_key",
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({ status: "ok", user: token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(500)
      .json({ status: "error", message: "An error occurred during login." });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_ugzJxtO0k8gmGI",
      key_secret: "0TcFvDnMk3NPl3xJ6b7DZgq0",
    });
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    console.log("CALLED");
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
});

app.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "0TcFvDnMk3NPl3xJ6b7DZgq0")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

app.post("/users", UserController.createUser);
app.get("/users", UserController.getAllUsers);
app.post("/add-hardcoded", UserController.addHardcodedUsers);

app.post("/genders", GenderController.createGender);
app.get("/genders", GenderController.getAllGenders);

app.post("/services", ServiceController.createService);
app.get("/services", ServiceController.getAllServices);

app.post("/bookings", BookingController.createBooking);
app.get("/bookings", BookingController.getAllBookings);

app.post("/feedbacks", FeedbackController.createFeedback);
app.get("/feedbacks", FeedbackController.getAllFeedbacks);

app.post("/service-types", ServiceTypeController.createServiceType);
app.get("/service-types", ServiceTypeController.getAllServiceTypes);

app.post("/payment-methods", PaymentMethodController.createPaymentMethod);
app.get("/payment-methods", PaymentMethodController.getAllPaymentMethods);

app.post("/products/add-hardcoded-data", ProductController.addHardcodedData);
app.get("/products/getAllProducts", ProductController.getAllProducts);
app.get("/products/:productId/order", ProductController.incrementTimesOrdered);
app.post("/products/uploadProduct", ProductController.uploadProduct);
app.post("/products/:productId/AddReview", ProductController.appendReview);

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});