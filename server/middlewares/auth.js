import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login again!",
      });
    }
    try {
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
      if (tokenDecode.id) {
        req.user = { id: tokenDecode.id }; // better practice
      } else {
        return res.json({
          success: false,
          message: "Not Authorized. Login Again",
        });
      }
      next();
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

export default userAuth;
