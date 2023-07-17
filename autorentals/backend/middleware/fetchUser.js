var jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodb$oy"


const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    console.log(token); // Check if token is received
    if (!token) {
      res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
      const data = jwt.verify(token, JWT_SECRET);
      console.log(data); // Check the data object and user property
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
  };
  


module.exports = fetchUser;
