const User = require("../model/User");


exports.createUser = async (req, res) => {
    const { email } = req.body;
    try {
            const user = new User({
                email
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
