//clase product manager 

class ProductManager {
    
    constructor() {
        this.products = [];
    }
    
    static Product = class {
    static id = 0;

        constructor(title, description, price, thumbnail, code, stock){
            this.id = ++ProductManager.Product.id;
            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnail = thumbnail;
            this.code = code;
            this.stock = stock;
        }
    }
    
    addProduct(title, description, price, thumbnail, code, stock){

        //verificamos que todos los parámetros sean proporcionados
        if (arguments.length < 6) {
            throw new Error('Todos los parámetros son obligatorios');
        }

        if (this.products.some(product => product.code === code)) {
            throw new Error('Ya existe un producto con el código: ' + code);
          }

        //creamos nuevo objeto producto y lo insertamos en el array. El constructor crea un id autoincremental
        const nuevoProducto = new ProductManager.Product(title, description, price, thumbnail, code, stock);

        this.products.push(nuevoProducto)

    }

    getProducts(propiedadesProducto){
        // devuelve un arreglo con todos los productos creados hasta el momento
        console.log(this.products)

    }

    // Función para buscar un producto por el id
    getProductsByID(id){
        // Utilizamos find para encontrar el primer elemento que cumple la condición
        const productoEncontrado = this.products.find(producto => producto.id === id);
  
        if (productoEncontrado) {
        console.log('Producto encontrado:', productoEncontrado);
        } else {
        console.error('Not found');
        }
    }


}

module.exports = ProductManager;