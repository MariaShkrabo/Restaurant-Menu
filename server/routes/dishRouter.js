const Router = require("express");

const router = new Router();
const dishController = require("../controllers/dishController");

router.get("/", dishController.getAll);
router.post("/", dishController.create);

module.exports = router;
