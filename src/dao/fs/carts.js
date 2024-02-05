const fs = require("fs").promises;

class CartManager {
    static carts = []

    constructor(path) {
        this.path = path;
    }

    // Crear un nuevo carrito y agregarlo al archivo
    async createCart() {
        const newCart = {
            id: CartManager.carts.length + 1,
            products: []
        };

        CartManager.carts.push(newCart);
        await this.guardarArchivo(CartManager.carts);
        return newCart.id;
    }

    // Agregar producto a un carrito específico
    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = CartManager.carts.find(c => c.id === cartId);
        if (!cart) {
            return "Carrito no encontrado";
        }

        const productIndex = cart.products.findIndex(p => p.product === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await this.guardarArchivo(CartManager.carts);
        return "Producto agregado al carrito";
    }

    // Obtener productos de un carrito específico
    async getCartProducts(cartId) {
        const cart = CartManager.carts.find(c => c.id === cartId);
        return cart ? cart.products : "Carrito no encontrado";
    }

    async guardarArchivo(arrayCarts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayCarts, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    // Inicializar la carga de carritos desde el archivo
    async initializeCarts() {
        try {
            let jsonCarts = await fs.readFile(this.path, 'utf-8');
            CartManager.carts = JSON.parse(jsonCarts);
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            CartManager.carts = []; 
        }
    }
}

module.exports = CartManager;
