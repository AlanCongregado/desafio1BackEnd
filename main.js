class ProductManager {
  #id = 0;
  constructor() {
    this.products = [];
  }
  getProducts() {
    return this.products;
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    //agrego el id
    product.id = this.#getId();
    // Validar que los parametros sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("todos los parametros son obligatorios");
      return;
    }

    // Validar si el producto ya se encuentra en la lista
    for (const product of this.products) {
      if (product.code === code) {
        console.log("El producto ya se encuentra agregado");
        return;
      }
    }
    this.products.push(product);

    // Si el producto NO se encuentra en la lista de productos entonces lo agrego
  }
  // Metodo para generar ID
  #getId() {
    this.#id++;
    return this.#id;
  }
  getProductById(idProduct) {
    const productId = this.products.findIndex(
      (product) => product.id === idProduct
    );
    if (productId === -1) {
      console.log("Producto No encontrado");
      return;
    } else {
      console.log(this.products[productId]);
    }
  }
}

// Pruebas

const productManager = new ProductManager();

productManager.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
productManager.addProduct(
  "otro producto de prueba",
  "Producto de prueba 2",
  400,
  "Sin imagen",
  "abc123",
  20
);
productManager.addProduct("description", 250, "Sin", "123abc", 50);
console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
