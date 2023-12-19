//const clear = require("console").clear;
const fs = require("fs");

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    // Agrega productos
    async addProduct(nuevoObjeto) {
        let { title, description, price, img, code, stock } = nuevoObjeto;

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(item => item.code == code)) {
            console.log("El código debe ser único");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        };

        this.products.push(newProduct);

        await this.guardarArchivo(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.getProducts();
            
            const buscado = arrayProductos.find(item => {
                return item.id === parseInt(id);
            });
            if (!buscado) {
                console.log("Producto no encontrado");
            } else {
                console.log("Sí, lo encontramos!");
                return buscado;
            }
        } catch (error) {
            console.log("Error al leer el archivo ", error);
        }
    }

    getProducts = () => {
        try {
            // Leer archivo y devolver los productos en un array
            let jsonProducts = fs.readFileSync(this.path, 'utf-8');
            let arrayProductos = JSON.parse(jsonProducts);
            return arrayProductos;
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            return []; 
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    // Actualizamos algún producto:
    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.getProducts();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("No se encontró el producto");
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

    async deleteProduct(id) {
try{
    const arrayProductos = await this.getProducts();
    const nuevoArray = arrayProductos.filter(item => item.id !== id);
    await this.guardarArchivo(nuevoArray);
}catch(error){

    console.log("error al eliminar producto", error);
}

    }
}

// Testing:


const manager = new ProductManager("./productos.json");

const producto1 = {
    title: "producto1",
    description: "los mas ricos",
    price: 150,
    img: "sin imagen",
    code: 1143,
    stock: 30
}

const producto2 = {
    title: "producto2",
    description: "los mas ricos",
    price: 150,
    img: "imagen.link",
    code: 11433,
    stock: 30
}

const producto3 = {
    title: "producto3",
    description: "barato y dulce",
    price: 150,
    img: "imagen.link",
    code: 11434,
    stock: 34
}

const producto4 = {
    title: "producto4",
    description: "Otro producto",
    price: 150,
    img: "imagen.link",
    code: 11423,
    stock: 30
}


manager.addProduct(producto1);
manager.addProduct(producto2);
manager.addProduct(producto3);
manager.addProduct(producto4);

manager.getProducts();

//testeamos con un código nuevo
//manager.addProduct(producto2);

//buscarporID
async function testingID() {
    const result = await manager.getProductById(2);
    console.log("Resultado de getProductById:", result);
}

testingID();


module.exports = ProductManager;
