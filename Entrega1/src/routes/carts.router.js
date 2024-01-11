const express = require("express");
const router = express.Router(); 

const CartManager = require("../controllers/carts.js");
const cartManager = new CartManager("src/models/carts.json");

// Inicializar los carritos al cargar el router
cartManager.initializeCarts();

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const cartId = await cartManager.createCart();
        res.status(200).send({ cartId: cartId });
    } catch (error) {
        res.status(500).send("Error al crear carrito");
    }
});

// Ruta para agregar producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    try {
        const result = await cartManager.addProductToCart(cartId, productId);
        res.status(result === "Producto agregado al carrito" ? 200 : 404).send(result);
    } catch (error) {
        res.status(500).send("Error al agregar producto al carrito");
    }
});

// Ruta para listar productos en un carrito
router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);

    try {
        const products = await cartManager.getCartProducts(cartId);
        if (typeof products === "string") {
            res.status(404).send(products);
        } else {
            res.status(200).send({ products });
        }
    } catch (error) {
        res.status(500).send("Error al obtener productos del carrito");
    }
});

module.exports = router; 
