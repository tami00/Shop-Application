const { Router } = require("express");
const cartController = require("../controllers/cart.controller");
const router = Router();

router.post("/getCart", cartController.get_cart_items);
router.post("/cart", cartController.add_cart_item);
router.delete("/cart/:userId/:itemId", cartController.delete_item);

module.exports = router;