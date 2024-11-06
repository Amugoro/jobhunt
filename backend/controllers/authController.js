exports.registerUser = async (req, res) => {
    // Existing signup logic
    const { fullName, email, password } = req.body;

    // Validation and hashing password logic
    // ...
    await newUser.save();
    res.status(201).json({ message: `Welcome, ${fullName}`, user: { fullName, email } });
};

exports.loginUser = async (req, res) => {
    // Existing login logic
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // JWT generation logic
    res.json({ message: `Welcome back, ${user.fullName}`, user: { fullName: user.fullName, email: user.email } });
};
