const router = require("express").Router();
const getControllers = require("../controllers/get-controllers");
const postControllers = require("../controllers/post-controllers");

//GET ROUTES
router.get("/test", getControllers.testGetRoute);

//POST ROUTES
router.post("/register", postControllers.registerAdmin);

module.exports = router;
