const Token = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = await Token.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}