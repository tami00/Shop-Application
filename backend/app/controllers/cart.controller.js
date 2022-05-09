const Cart = require("../models/cart");
const Product = require("../models/product.model");

module.exports.get_cart_items = async (req, res) => {
  const userID = req.body.data;
  console.log('ID',userID)

  Cart.findOne({ userID: userID })
    .exec((err, products) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, products })
    })
};

module.exports.add_cart_item = async (req, res) => {
  const userID = req.body.id;
  const productID = req.body.productId;
  const quantity = req.body.quantity;
  const title = req.body.title

  console.log(userID);
  console.log(productID);

  try {
    let cart = await Cart.findOne({ userID: userID });
    let item = await Product.findOne({ prodID: productID });
    if (!item) {
      res.status(404).send("Item not found!");
    }
    const price = item.price;
    const name = item.title;
    const pid = item.prodID;

    if (cart) {
      let itemIndex = cart.items.findIndex((p) => p.prodID == productID);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ prodID: productID, title, quantity, price });
      }
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      const newCart = await Cart.create({
        userID: userID,
        items: [{ prodID: productID, title, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.delete_item = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};