const Router = require("express");

const router = new Router();
const basketDishController = require("../controllers/basketDishController");

router.get("/", basketDishController.getAllBaskets);
router.post("/", basketDishController.create);

module.exports = router;