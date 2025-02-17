const userRepo = require('../Models/user');
const jwt = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs'); // Assuming you're using bcrypt for hashing

exports.signup = async (req, res) => {
	const { email, password, name ,isAdmin} = req.body;
	try {
		const existingUser = await userRepo.findOne({ email });

		if (existingUser) {
			return res
				.status(401)
				.json({ success: false, message: 'User already exists!' });
		}

		const hashedPassword = await hash(password, 12);

		const newUser = new userRepo({
			name,
			email,
			password: hashedPassword,
			isAdmin:isAdmin
		});
		const result = await newUser.save();
		result.password = undefined;
		res.status(201).json({
			success: true,
			message: 'Your account has been created successfully',
			result,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};//


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userRepo.findOne({ email });
    
        if (!existingUser) {
            return res
                .status(401)
                .json({ success: false, message: 'User does not exist!' });
        }
        const result = await compare(password, existingUser.password);
        
        if (!result) {
            return res
                .status(401)
                .json({ success: false, message: 'Invalid credentials!' });
        }
        const token = jwt.sign(
            {
                name: existingUser.name,
                userId: existingUser._id,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            },
            "demoKey",
            {
                expiresIn: '1h',
            }
        );
        
        res
            .cookie('Authorization', 'Bearer ' + token, {
                expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
            })
            .json({
                success: true,
                token,
                user: {
                    name: existingUser.name,
                    email: existingUser.email,
                    isAdmin: existingUser.isAdmin,
                },
                message: 'Logged in successfully',
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// const jwtVerified = jwt.verify(token, process.env.TOKEN_SECRET);
// 			console.log("Name",jwtVerified.name);