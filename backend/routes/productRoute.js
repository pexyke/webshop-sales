import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/id/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.find({id: req.params.id});
    console.log(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/new",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const productName = req.body.name;
    if(!productName) res.status(404).send({ message: "error, no data"})
    const product = await Product.findOne({ productName });
    console.log(productName);
    if (product) {
      res.status(400).send({ message: "Product name has already exists" });
    } else {
      let newProduct = new Product({
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        countInstock: req.body.countInstock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        description: req.body.description,
      });
      newProduct.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send({ message: "New product added to the database"})
        }
      });
    }
  })
);

productRouter.post(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const filter = { id: req.params.id };
    const update = { 
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        countInstock: req.body.countInstock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        description: req.body.description,
     };
    const product = await Product.findOneAndUpdate(filter, update);
    console.log(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
