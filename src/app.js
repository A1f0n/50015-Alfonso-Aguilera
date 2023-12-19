const express = require("express");
const ProductManager = require('./main.js');

const PUERTO = 8080

const app = express();

const manager = new ProductManager("./productos.json");

let productos = manager.getProducts();


//Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.

app.get("/products", async (req, res) => {
    try {
        let  limit = parseInt(req.query.limit);
        // Espera a que se resuelva la promesa antes de enviar la respuesta
        const productos = await manager.getProducts();
        if(!limit) return res.send(JSON.stringify(productos, null, 2));

        const productosLimitados = productos.slice(0, limit);
        return res.send(JSON.stringify(productosLimitados, null, 2));

    } catch (error) {
        console.error("Error al obtener productos:", error);
        // Enviar una respuesta de error al cliente
        res.status(500).send("Error al obtener productos");
    }
});

//ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y 
//devolver sólo el producto solicitado, en lugar de todos los productos. 

app.get("/products/:pid", async (req, res) => {
    try {
        // Espera a que se resuelva la promesa antes de enviar la respuesta
        let pid = req.params.pid;
        console.log("pid es:" +pid);

        let productoId = await manager.getProductById(pid);
        // Check if the product was found
        if (productoId) {
            return res.send({ productoId });
        } else {
            // If the product was not found, send a 404 response
            res.status(404).send("Product not found");        
        }

    } catch (error) {
        console.error("Error al obtener productos:", error);
        // Enviar una respuesta de error al cliente
        res.status(500).send("Error al obtener productos");
    }
});

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

/*
app.listen(PUERTO, () => {
    console.log(productos);
    console.log("Escuchando en el http://localhost:8080");
  });

  app.get("/testing", (req, res) => {
    res.send("testeando ruta");
})
*/