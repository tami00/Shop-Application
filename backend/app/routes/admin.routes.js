const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authJwt } = require('../middlewares');

const Product = require("../models/product.model")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadImage", (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
            console.log(err)
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/addStock", (req, res) => {

    const product = new Product(req.body)

    product.save((err, product) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true 
        })
    })

});

router.post("/getStock", (req, res) => {
    Product.find({}) 
    .exec((err, products) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, products})
    })
    
    
})

router.post("/updateStock", (req, res) => {
    const prodID = req.body.prodID


    Product.findOneAndUpdate(prodID, { new: true }, {returnOriginal: false}, function(err, products) {
        if (err) {
          console.log("err", err);
          res.status(500).send(err);
        } else {
            Product.save()
          console.log("success");
          res.send(product);
        }
    });

});

module.exports = router;
