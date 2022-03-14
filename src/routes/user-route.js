// external imports
const express = require("express");
// internal imports
const {
    getHandler, postHandler, deleteHandler,   login,
    logout,
} = require("../controllers/user-controller");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
    addUserValidators, addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const {checkLogin, requireRole} = require("../middlewares/users/checkLogin");
//login-----
const {
    doLoginValidators,
    doLoginValidationHandler,
} = require("../middlewares/users/loginValidators");
const { redirectLoggedIn } = require("../middlewares/users/checkLogin");
const router = express.Router();




// users page
router.get("/",
    checkLogin,
    requireRole(["admin"]),
    getHandler);
// add user
router.post("/",
    // checkLogin,
    // requireRole(["admin"]),
    avatarUpload,
    // addUserValidators,
    // addUserValidationHandler,
    postHandler);
// remove user
router.delete("/:id", checkLogin, requireRole(["admin"]), deleteHandler);

module.exports = router;
