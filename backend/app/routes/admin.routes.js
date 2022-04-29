const express = require('express');
const router = express.Router();

const Product = require("../models/product.model")

router.post("/addStock", (req, res) => {

    const product = new Product(req.body)

    product.save((err, product) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true 
        })
    })

});

module.exports = router;
