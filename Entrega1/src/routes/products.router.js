const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product.js");

const productManager = new ProductManager("src/models/productos.json");
productManager.initialize();

// Listar todos los productos
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const products = await productManager.getProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send("Error al obtener productos");
    }
});

// Obtener un producto específico
router.get("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const products = await productManager.getProducts();
        const product = products.find(p => p.id === pid);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al obtener el producto");
    }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
    try {
        const newProductData = req.body;
        const result = await productManager.addProduct(newProductData);

        if (result.error) {
            res.status(400).send(result.error);
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).send("Error al agregar el producto");
    }
});

// Actualizar un producto existente
router.put("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const updateData = req.body;
        const result = await productManager.updateProduct(pid, updateData);

        if (result.error) {
            res.status(404).send(result.error);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).send("Error al actualizar el producto");
    }
});

// Eliminar un producto
router.delete("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const result = await productManager.deleteProduct(pid);

        if (result.error) {
            res.status(404).send(result.error);
        } else {
            res.status(200).send(result.message);
        }
    } catch (error) {
        res.status(500).send("Error al eliminar el producto");
    }
});

module.exports = router;
