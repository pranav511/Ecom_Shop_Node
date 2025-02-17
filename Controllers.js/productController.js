const productRepo = require("../Models/product");

exports.CreateProduct = async (req, res) => {
  const {
    name,
    shortDescription,
    description,
    price,
    discount,
    images,
    categoryId,
    brandId,
    isFeatured,
    isNeww
  } = req.body;
  const result = await productRepo.create({
    name,
    shortDescription,
    description,
    price,
    discount,
    images,
    categoryId,
    brandId,
    isFeatured,
    isNeww
  });
  res.status(201).send({ message: result });
}; //

exports.showProductById = async (req, res) => {
  try {
    const existingPost = await productRepo.findOne({ _id: req.params.id });
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Product unavailable" });
    }
    res.send(existingPost)
  } catch (error) {
    console.log(error.message);
  }
};

exports.showProduct = async (req, res) => {
  try {
    const result = await productRepo.find({}, { __v: 0 });

    if (result) {
      res.status(200).send(result);
    } else {
      res.json({ result: "NOT Found" });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};//


exports.updateProduct = async (req, res) => {
  const {
    name,
    shortDescription,
    description,
    price,
    discount,
    images,
    categoryId,
    brandId,
    isFeatured,
    isNeww
  } = req.body;
  const existingPost = await productRepo.findOne({ _id: req.params.id });

  if (!existingPost) {
    return res
      .status(404)
      .json({ success: false, message: "Post unavailable" });
  }

  existingPost.name = name; // Update the name
  existingPost.shortDescription = shortDescription; // Update the name
  existingPost.description = description; // Update the name
  existingPost.price = price; // Update the name
  existingPost.discount = discount; // Update the name
  existingPost.images = images; // Update the name
  existingPost.categoryId = categoryId; // Update the name
  existingPost.brandId = brandId; // Update the name
  existingPost.isFeatured = isFeatured; // Update the name
  existingPost.isNeww = isNeww; // Update the name
  try {
    const result = await existingPost.save();
    res.status(200).json({ success: true, message: "Updated", data: result });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating category",
        error: error.message,
      });
  }
}; //

exports.deleteProduct = async (req, res) => {
  const _id = req.params.id; // Directly assign req.params.id to _id

  try {
    const existingPost = await productRepo.findOne({ _id });
    console.log(existingPost);

    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post already unavailable" });
    }

    const dltPost = await productRepo.deleteOne({ _id });
    console.log(dltPost);

    res.status(200).json({ success: true, message: "deleted", data: dltPost });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}; //


// http://localhost:8000/product/show-product
// http://localhost:8000/product/show-product
// http://localhost:8000/product/show-product
// http://localhost:8000/product/show-product/
// http://localhost:8000/product/show-product/