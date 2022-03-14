// external imports
const express = require("express");
// internal imports
const {login, logout,
} = require("../controllers/auth-controller");

//login-----
const {
    doLoginValidators,
    doLoginValidationHandler,
} = require("../middlewares/users/loginValidators");
const router = express.Router();


// process login
router.post(
    "/login",
    doLoginValidators,
    doLoginValidationHandler,
    login
);

// logout
router.post("/logout", logout); //.delete


module.exports = router;
