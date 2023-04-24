// Importamos file system
import { promises as fs } from "fs";
// Creamos la Class Product Manager
class ProductManager {
  constructor() {
    // En el constructor creamos el path que va a ser la ruta
    this.path = "./productos.txt";
    // products va a ser el array de productos donde vamos a pushear los productos
    this.products = [];
  }
  static id = 0;
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;
    let product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(product);

    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  getProduct = async () => {
    let product = await this.readProducts();
    return console.log(product);
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    return JSON.parse(respuesta);
  };

  getProductById = async (id) => {
    let productById = await this.readProducts();
    let filter = productById.find((product) => product.id === id);
    if (!filter) {
      console.log("Producto no encontrado");
    } else {
      console.log(filter);
    }
  };

  deleteProduct = async (id) => {
    let respuesta = await this.readProducts();
    let productFilter = respuesta.filter((products) => products.id != id);

    await fs.writeFile(this.path, JSON.stringify(productFilter));
    console.log(`El producto con el id:${id} ha sido eliminado`);
  };

  updateProduct = async ({ id, ...producto }) => {
    await this.deleteProduct(id);
    let productOld = await this.readProducts();
    let productUpdated = await [{ id, ...producto }, ...productOld];
    await fs.writeFile(this.path, JSON.stringify(productUpdated));
    console.log(productUpdated);
  };
}
const productos = new ProductManager();

/* productos.addProduct(
  "Titulo1",
  "Descriptcion1",
  100,
  "Sin Imagen",
  "abc123",
  5
);
productos.addProduct(
  "Titulo2",
  "Descriptcion2",
  200,
  "Sin Imagen2",
  "abc1234",
  6
);
 */
//productos.getProduct();
//productos.getProductById(8);
//productos.deleteProduct(2);

productos.updateProduct({
  title: "Titulo5",
  description: "Descriptcion5",
  price: 30000,
  thumbnail: "Sin Imagen5",
  code: "jahsd123",
  stock: 5,
  id: 1,
});
