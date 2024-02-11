const asyncHandler = require('express-async-handler');
const { Category, validateCreateCategory } = require('../models/Category');




/**---------------------------------------
 * @desc Create New Category
 * @route /api/categories
 * @method POST
 * @access private (only admin)
 ----------------------------------------*/
const createCategoryCtrl = asyncHandler(async(req, res)=> {
    const {error} = validateCreateCategory(req.body);
    // console.log('category');
    console.log(req.body);
    console.log(req.user);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    const category = await Category.create({
        title: req.body.title,
        user: req.user.id
    });
    res.status(201).json(category);

});

/**---------------------------------------
 * @desc Get all categories
 * @route /api/categories
 * @method GET
 * @access public
 ----------------------------------------*/
const getAllCategoriesCtrl = asyncHandler(async(req, res)=> {
   const categories = await Category.find();
    res.status(200).json(categories);

});

/**---------------------------------------
 * @desc Delete category
 * @route /api/categories/:id
 * @method DELETE
 * @access private (only admin)
 ----------------------------------------*/
const deleteCategoryCtrl = asyncHandler(async(req, res)=> {
   const category = await Category.findById(req.params.id);
   if(!category) {
    return res.status(403).json({message: 'category not found'})
   }

   await Category.findByIdAndDelete(req.params.id);

    res.status(200).json(
        {
            message: 'Category has been deleted successfully',
            categoryId: category._id
        });

});




module.exports = {
    createCategoryCtrl,
    getAllCategoriesCtrl,
    deleteCategoryCtrl
}