//Step 1 - Task 2: Import necessary packages
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const pino = require('pino');

//Step 1 - Task 3: Create a Pino logger instance
const logger = pino({ level: 'info' });

dotenv.config();

//Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
        const usersCollection = db.collection('users');

        // Task 3: Check for existing email
        const existingUser = await usersCollection.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;

        // Task 4: Save user details in database
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: email,
            password: hash,
            createdAt: new Date()
        };

        const result = await usersCollection.insertOne(newUser);

        // Task 5: Create JWT authentication with user._id as payload
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

module.exports = router;