const User = require("../model/User");
var jwt = require("jsonwebtoken");



exports.createUser = async (req, res) => {
    const { email, notionId, accessToken, refreshToken } = req.body;
    try {
        const user = new User({
            email,
            notionId,
            accessToken,
            refreshToken
        });

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


exports.updateAccessToken = async (req, res) => {
    const { email, accessToken } = req.body;
    try {
        const user = await User.findOne({ email });
        user.accessToken = accessToken;

        //Approach 2
        // const user = await User.findOneAndUpdate(email, { $set: { accessToken } }, { new: true });

        res.status(200).json({
            success: true,
            message: "Access token updated!",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to update access token."
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
