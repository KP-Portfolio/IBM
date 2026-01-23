const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const pino = require('pino');
const logger = pino({ level: 'info' });
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;

        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: email,
            password: hash,
            createdAt: new Date()
        };

        const result = await usersCollection.insertOne(newUser);

        const authtoken = jwt.sign(
            { userId: result.insertedId },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        logger.info('User registered successfully');
        res.json({ authtoken, email });

    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');
        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const authtoken = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        logger.info('User logged in successfully');
        res.json({
            authtoken,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        });

    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

router.post(
  "/update",
  [
    body("firstName")
      .optional()
      .isString()
      .withMessage("First name must be a string"),

    body("lastName")
      .optional()
      .isString()
      .withMessage("Last name must be a string"),

    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Invalid input",
          errors: errors.array()
        });
      }

      const email = req.headers.email;
      if (!email) {
        return res.status(400).json({ message: "Email header is required" });
      }

      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updateFields = {};
      if (req.body.firstName) updateFields.firstName = req.body.firstName;
      if (req.body.lastName) updateFields.lastName = req.body.lastName;

      if (req.body.password) {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        updateFields.password = hash;
      }

      await usersCollection.updateOne(
        { email },
        { $set: updateFields }
      );

      const authtoken = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      logger.info("User profile updated successfully");

      res.json({
        message: "Profile updated successfully",
        authtoken
      });

    } catch (e) {
      logger.error(e);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;