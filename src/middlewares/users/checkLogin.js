const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// auth guard to protect routes that need authentication
const checkLogin = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication failure!",
            },
          },
        });

    }
  } else {
      res.status(401).json({
        error: "Authetication failure!",
      });

  }
};


// guard to protect routes that need role based authorization
function requireRole(role) {
  return function (req, res, next) {
    if (req.user.role && role.includes(req.user.role)) { //req.user.role
      next();
    } else {
        res.status(401).json({
          errors: {
            common: {
              msg: "You are not authorized!",
            },
          },
        });

    }
  };
}

module.exports = {
  checkLogin,
  requireRole,
};
