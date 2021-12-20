const Router = require("express");

const router = new Router();

const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const dishRouter = require("./dishRouter");
const basketDishRouter = require("./basketDishRouter");

router.use("/user", userRouter);
router.use("/dish", dishRouter);
router.use("/basket", basketDishRouter);
router.use("/category", categoryRouter);


module.exports = router;