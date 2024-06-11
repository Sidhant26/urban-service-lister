const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Hardcoded Users
exports.addHardcodedUsers = async (req, res) => {
  try {
    // Hardcoded user data
    const hardcodedUsers = [
      {
        user_name: "John Doe",
        email_id: "john@example.com",
        phone_no: 1234567890,
        address: "123 Street, City",
        isAdmin: true,
        profileImage: "https://example.com/profile1.jpg",
        password: "123",
      },
      {
        user_name: "Jane Smith",
        email_id: "jane@example.com",
        phone_no: 9876543210,
        address: "456 Avenue, Town",
        isAdmin: false,
        profileImage: "https://example.com/profile2.jpg",
        password: "123",
      },
      {
        user_name: "Alice Johnson",
        email_id: "alice@example.com",
        phone_no: 5551234567,
        address: "789 Road, Village",
        isAdmin: false,
        profileImage: "https://example.com/profile3.jpg",
        password: "123",
      },
    ];

    // Insert the hardcoded users into the User collection
    const insertedUsers = await User.insertMany(hardcodedUsers);

    res
      .status(201)
      .json({ message: "Hardcoded users added successfully", insertedUsers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
