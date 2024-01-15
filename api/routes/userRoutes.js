// Importing modules
const express = require('express');


const router = express.Router();
const userController = require('../controllers/userController');
const userAuth = require('../middleware/userAuth');




// Handle signup form submission
router.post('/signup', userAuth.saveUser, async (req, res, next) => {
    try {
        // Your existing signup logic
        //console.log(req.body);
        await userController.signup(req, res);
        // Send a JSON response for successful signup
        res.json({ success: true });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
        // res.status(500).json({msg:error});
    }
});


// Handle login form submission
router.post('/login', userController.login);


module.exports = router;

