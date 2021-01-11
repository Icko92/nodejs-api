const router = require("express").Router();
const { authenticateToken } = require("../../middleware/authentication");
const getControllers = require("../controllers/get-controllers");
const postControllers = require("../controllers/post-controllers");

//GET ROUTES
router.get("/test", authenticateToken, getControllers.testGetRoute);

//POST ROUTES
router.post("/register", postControllers.registerAdmin);
router.post("/login", postControllers.loginAdmin);

module.exports = router;
