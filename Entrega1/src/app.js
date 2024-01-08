const express = require("express");
const app = express()
PUERTO = 8080
const productRouter = require("./routes/products.router.js");
const ProductManager = require("./controllers/product.js");


//Routing
app.use("/api/productos", productRouter); 

//testing 
const manager = new ProductManager

//testing get products
manager.getProducts()

//add products
manager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'sin imagen', 'abc123', 25)

manager.addProduct('testing 2', 'Este es un producto prueba', 250, 'sin imagen', 'abc124', 25)

manager.addProduct('testing 3', 'Este es un producto prueba', 300, 'sin imagen', 'abc125', 25)

//testing get products
manager.getProducts()

//testesar getID
manager.getProductsByID(1)


app.listen(PUERTO, async () => {
    try {
        // Esperar a que se resuelva la promesa antes de mostrar los productos
        let productos = await manager.getProducts();
        console.log(productos);
        console.log("Escuchando en el http://localhost:8080");
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
});