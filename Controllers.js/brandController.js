const brandRepo = require('../Models/brand')

exports.CreateBrand=async(req,res)=>{
    const {name} = req.body;
    const result= await brandRepo.create({
        name:name
    })
    res.status(201).send({message:result})
}

exports.showBrandById = async(req,res)=>{
  try {
		const existingPost = await brandRepo.findOne({_id:req.params.id });
		if (!existingPost) {
			return res
				.status(404)
				.json({ success: false, message: 'Category unavailable' });
		}
		res
			.status(200)
			.json({ success: true, data: existingPost });
	} catch (error) {
		console.log(error.message);
	}
}

exports.showBrand = async (req, res) => {
	try {
    const result = await brandRepo.find(
      {},
      {  __v: 0 }
    );
  
    if (result) {
      res.status(200).send(result);
    } else {
      res.json({ result: "NOT Found" });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    })
  }
};

exports.updateBrand = async (req, res) => {
    const { name } = req.body;
    const existingPost = await brandRepo.findOne({ _id: req.params.id });

    if (!existingPost) {
        return res.status(404).json({ success: false, message: 'Post unavailable' });
    }

    existingPost.name = name; // Update the name
    try {
        const result = await existingPost.save();
        res.status(200).json({ success: true, message: 'Updated', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating category', error: error.message });
    }
};

exports.deleteBrand = async (req, res) => {
  const _id = req.params.id; // Directly assign req.params.id to _id

  try {
      const existingPost = await brandRepo.findOne({ _id });
      console.log(existingPost);
  
      if (!existingPost) {
          return res
              .status(404)
              .json({ success: false, message: 'Post already unavailable' });
      }

      const dltPost = await brandRepo.deleteOne({ _id });
      console.log(dltPost);

      res.status(200).json({ success: true, message: 'deleted', data: dltPost });
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: 'Server error' });
  }
}
