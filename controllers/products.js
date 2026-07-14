const Product = require('../models/product');

exports.getAddProduct= (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'})
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save();
    res.redirect('/');  // Aside Note: Both of the routes can have the same name if the type of the request is different one is post and another is get.
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) =>{
        res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/',  
    });
    });
    
}