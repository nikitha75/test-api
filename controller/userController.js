const User = require("../model/User");
var jwt = require("jsonwebtoken");



exports.createUser = async (req, res) => {
    const { email } = req.body;
    try {

        const user = new User({
            email
        });

        const accessToken = jwt.sign({ _id: user._id, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
        user.accessToken = accessToken;

        const refreshToken = jwt.sign({_id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
        res.cookie("token", refreshToken, {  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true });

        //To store the same token as refresh token in the cookie
        // res.cookie("token", accessToken, {  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true });

        await user.save();

        res.status(200).json({
            success: true,
            message: "User created!",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to create user."
        });
    }
}


//without using cookie
exports.generateRefreshToken = async (req, res) => {
    // const { userId } = req.params;
    const { email } = req.body;
    try {
        // const user = await User.findById(userId);
        const user = await User.findOne({ email });
        
        const refreshToken = jwt.sign({_id: user._id, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
        user.refreshToken = refreshToken;
 
        res.status(200).json({
            success: true,
            message: "Refresh token generated!",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to generate refresh token."
        });
    }
}



exports.fetchUserEmail = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        const email = user.email;

        res.status(200).json({
            success: true,
            message: "Fetched user's email!",
            email,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to fetch user's email."
        });
    }
}



exports.fetchUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Fetched all users!",
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to fetch users"
        });
    }
}
