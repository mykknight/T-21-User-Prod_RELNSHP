const Product = require('../models/product');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
  .createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result => {
    //console.log(result);
    console.log('Created Product');
    res.redirect('/');
  })
  .catch(err => console.log(err));
};

exports.getEditProduct = (req,res,next) => {
  const editMode = req.query.edit;
  if(editMode != 'true') {
    console.log('it false');
    return res.redirect('/');
  }
  const prodID = req.params.pId;
  req.user
  .getProducts({ where: {id: prodID }})
  .then(products =>{
    const product = products[0];
    if(!product) return res.redirect('/');
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  })
}

exports.postEditProducts = (req,res,next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const id = req.body.productId;
  Product.findByPk(id)
  .then(product => {
    product.title = title;
    product.imageUrl = imageUrl;
    product.price = price;
    product.description = description;
    return product.save();
  })
  .then(result => {
    console.log('Product Updated');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
}

exports.deleteProduct = (req,res,next) => {
  const prodID = req.params.prdId;
  console.log(prodID);

  Product.findByPk(prodID)
  .then(product => {
    return product.destroy();
  })
  .then(() => {
    console.log('Product deleted');
    res.redirect('/admin/products');
  })
  .catch((err) => console.log(err));

}

exports.getProducts = (req, res, next) => {
  req.user
  .getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
};

