const fs = require("fs").promises;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.ultId = 0;
    }

    // Inicializar último ID y cargar productos
    async initialize() {
        try {
            const productos = await this.getProducts();
            this.ultId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) : 0;
        } catch (error) {
            console.error('Error al inicializar ProductManager:', error);
        }
    }

    // Obtener todos los productos
    async getProducts(limit = null) {
        try {
            const content = await fs.readFile(this.path, 'utf-8');
            const products = JSON.parse(content);
            return limit ? products.slice(0, limit) : products;
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            return [];
        }
    }

    // Agregar un nuevo producto
    async addProduct(productData) {
        console.log("Intentando agregar producto")
        const { title, description, code, price, stock, category, thumbnails = [] } = productData;
        console.log("productData", productData)
        if (!title || !description || !code || !price || typeof price !== 'number' || !stock || !category) {
            return { error: "Todos los campos son obligatorios y deben tener el formato correcto" };
        }

        const products = await this.getProducts();
        if (products.find(p => p.code === code)) {
            return { error: "El código del producto debe ser único" };
        }

        const newProduct = {
            id: ++this.ultId,
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails,
            status: true
        };
        console.log("newProduct", newProduct)
        products.push(newProduct);
        await this.guardarArchivo(products);
        return newProduct;
    }

    // Actualizar un producto
    async updateProduct(id, productData) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            return { error: "Producto no encontrado" };
        }

        // Evitar la actualización del ID y el código
        delete productData.id;
        delete productData.code;

        products[index] = { ...products[index], ...productData };
        await this.guardarArchivo(products);
        return products[index];
    }

    // Eliminar un producto
    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            return { error: "Producto no encontrado" };
        }

        products.splice(index, 1);
        await this.guardarArchivo(products);
        return { message: "Producto eliminado" };
    }

    // Guardar los productos en el archivo
    async guardarArchivo(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
            throw new Error('No se pudo guardar el archivo');
        }
    }
}

module.exports = ProductManager;
