const express = require("express");
const app = express();
const PUERTO = 8080;
const productRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

//const ProductManager = require("./controllers/product.js");

// Middleware para analizar el cuerpo JSON de las solicitudes
app.use(express.urlencoded( {extended:true}));
app.use(express.json());



// Routing
app.use("/api/productos", productRouter); 
app.use("/api/carts", cartsRouter); 


app.listen(PUERTO, async () => {
    try {
        console.log(`Escuchando en el http://localhost:${PUERTO}`);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
});
