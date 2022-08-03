function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
  
    if (!token)  res.status(401).send("Authentication Failure");
  
    next();
  }
  
  export { validateToken };
  