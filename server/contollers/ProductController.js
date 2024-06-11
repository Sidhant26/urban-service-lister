const Product = require("../models/Product");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.uploadProduct = async (req, res) => {
  try {
    const productData = req.body;
    console.log(productData);
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Hardcoded Data
exports.addHardcodedData = async (req, res) => {
  try {
    // Hardcoded product data
    const hardcodedProducts = [
      {
        id: "08",
        productName: "Stone and Beam Westview",
        imgUrl: "productImg01",
        category: "sofa",
        price: 193,
        shortDesc:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
        reviews: [
          {
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ],
        avgRating: 4.5,
        location: {
          type: "Point",
          coordinates: [28.612962, 77.231236],
        },
        timesOrdered: 5,
      },
    ];

    const insertedProducts = await Product.insertMany(hardcodedProducts);

    res
      .status(201)
      .json({ message: "Hardcoded data added successfully", insertedProducts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.incrementTimesOrdered = async (req, res) => {
  const productId = req.params.productId;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId },
      { $inc: { timesOrdered: 1 } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.appendReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { username, rating, text } = req.body;

    const product = await Product.findOne({ id: productId });
    // console.log(req.body);
    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = {
      username,
      rating,
      text,
    };

    product.reviews.push(newReview);

    // let totalRating = 0;
    // product.reviews.forEach((review) => {
    //   totalRating += review.rating;
    // });
    // product.avgRating = totalRating / product.reviews.length;

    await product.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};