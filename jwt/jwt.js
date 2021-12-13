app.post("api/refresh", (req, res) => {
  const refreshtekon = req.body.tekon;
  if (!refreshtekon)
    return res.status(401).json({ message: "you aren't authorize" });
});

// role of this function is a middleware to check authorization (roles and premissions)
const verify = (req, res, next) => {
  const authHeader = req.header.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mysecretkey", (error, user) => {
      if (error) return res.status(403).json({ message: "invalid token !" });
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "you aren't authorize" });
  }
};
