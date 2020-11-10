const express = require("express");
const superadminRoutes = require("../superadmin/routes/superadmin-routes");
const router = express();

//Superadmin
router.use("/api/superadmin", superadminRoutes);

module.exports = router;
