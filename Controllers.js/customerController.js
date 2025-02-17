const productRepo = require("../Models/product");
const categoriesRepo = require("../Models/category");
const brandsRepo = require("../Models/brand");

exports.featureProduct = async (req, res) => {
    try {
      const result = await productRepo.find({isFeatured:true}, { __v: 0 });
  
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


  exports.getCategory = async(req,res)=>{
    try {
      const result = await categoriesRepo.find({}, { __v: 0 });
  
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
  }
  exports.getBrands = async(req,res)=>{
    try {
      const result = await brandsRepo.find({}, { __v: 0 });
  
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
  }

  async function getProductForListening1(searchTerm, categoryId, page, pagesize, sortBy, sortOrder, brandId) {
    if (!sortBy) {
        sortBy = 'price';
    }
    if (!sortOrder) {
        sortOrder = -1;
    }
    let queryFilter = {};
    if (searchTerm) {
        queryFilter.$or = [
            { name: { $regex: '.*' + searchTerm + '.*' } },
            { shortDescription: { $regex: '.*' + searchTerm + '.*' } }
        ];
    }
    if (categoryId) {
        queryFilter.categoryId = categoryId;
    }
    if (brandId) {
        queryFilter.brandId = brandId;
    }
    console.log("queryFilter",queryFilter);
    const products = await productRepo.find(queryFilter)
        .sort({ [sortBy]: +sortOrder })
        .skip((+page - 1) * +pagesize)
        .limit(+pagesize);
        console.log("products",products);
    return products.map(x => x.toObject());
}

exports.getProductForListening = async (req, res) => {
    const { searchTerm, categoryId, sortBy, sortOrder, brandId, pagesize, page } = req.query;
    const products = await getProductForListening1(searchTerm, categoryId, page, pagesize, sortBy, sortOrder, brandId);
    res.send(products);
    console.log("products1",products.searchTerm);
};


exports.newProduct = async (req, res) => {
    try {
      const result = await productRepo.find({isNeww:true}, { __v: 0 });
  
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


  exports.getProductById = async(req,res)=>{
    const id=req.params.id;
    try {
      const existingPost = await productRepo.findOne({ _id: id});
      if (!existingPost) {
        return res
          .status(404)
          .json({ success: false, message: "Product unavailable" });
      }
      res.send(existingPost)
    } catch (error) {
      console.log(error.message);
    }
  }