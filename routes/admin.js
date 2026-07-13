const express = require('express');
const path = require('path');
const rootDir = require('../util/path');


const router = express.Router();

const products = [];

// /admin/add-product => GET

router.get('/add-product',(req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'})
});
// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');  // Aside Note: Both of the routes can have the same name if the type of the request is different one is post and another is get.
}); 

exports.routes = router;
exports.products = products;