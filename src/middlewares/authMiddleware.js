import jwt from 'jsonwebtoken';

const authMiddleware = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies?.jwt) {
        token = req.cookies.jwt
    }

    if(!token) {
        return res.status(401).json({error: "Token not found"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch(error) {
      res.status(401).json({ error: "Token not verified"});
    }
}


export default authMiddleware;