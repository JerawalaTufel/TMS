
const router = require("express").Router();
const apiRoute = require("./v1");

router.use(apiRoute);

module.exports = router