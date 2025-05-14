import jwt from "jsonwebtoken";

export default (req, res, next) => {
       const token = req.cookies.token;
       if (!token) return res.status(401).json({ msg: "Unauthorized, no token" });
       try {
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
              req.user = decoded;
              next();
       } catch (error) {
              res.status(401).json({ msg: "Invalid Token" });
       }
};
