const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
//   console.log("Authorization Header:",authHeader);

  if (!authHeader) {
      return res.status(401).send({
          error: "Access denied",
      });
  }

  
  const token = authHeader.split(' ')[1];
  console.log("Extracted Token:", token);

  if (!token) {
      return res.status(401).send({
          error: "Access denied",
      });
  }

  try {
    if(token){
      const decode = jwt.verify(token, "demoKey");
      console.log("Decoded Token:", decode);
      req.user = decode;
      next();
    }
    else if(authHeader){
        const decode = jwt.verify(authHeader, "demoKey");
        console.log("Decoded Token:", decode);
        req.user = decode;
        next();
    }
  } catch (error) {
      console.log("Token Verification Error:", error.message);
      res.status(400).send({
          error: "Invalid token",
      });
  }
}




module.exports= {verifyToken}