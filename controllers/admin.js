const Product = require('../models/product');

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
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
  .then( () => {
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
  Product.FindProduct(prodID)
  .then(([product]) => {
    if(!product[0]) return res.redirect('/');
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0],
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  })
  .catch((err) => console.log(err)); 
}

exports.postEditProducts = (req,res,next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const id = req.body.productId;
  const product = new Product(id, title, imageUrl, description, price);
  
  product.update()
  .then(() => res.redirect('/'))
  .catch(err => console.log(err));
}

exports.deleteProduct = (req,res,next) => {
  const prodID = req.params.prdId;
  console.log(prodID);

  Product.delete(prodID)
  .then(() => res.redirect('/'))
  .catch((err) => console.log(err));

}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  } )
  .catch(err => console.log(err));
};

