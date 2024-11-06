
module.exports = (req, res, next) => {
    if (!req.user.isVerified) {
      return res.status(403).json({ message: "Please verify your identity before proceeding." });
    }
    next();
  };
  