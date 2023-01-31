const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES(?,?,?,?)',
    [this.title, this.price, this.description, this.imageUrl]
    );
  }

  update() {
     const prodID = this.id;
     return db.execute(`UPDATE products SET title = '${this.title}', price = '${this.price}', description = '${this.description}', imageUrl = '${this.imageUrl}' WHERE products.id = ${prodID}`);
  }

  static delete(id) {
    return db.execute(`DELETE FROM products WHERE products.id = ${id}`);
  }

  static fetchAll() {
   return db.execute('SELECT * FROM products');
  }

  static FindProduct(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
  }
};
