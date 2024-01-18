const express = require("express");
const app = express();
const PUERTO = 8080;
const productRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const socket = require("socket.io");
const exphbs = require("express-handlebars");
//const http = require('http').Server(app);

const server = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

const io = socket(server);

//middlewares
app.use(express.static("./src/public"));
app.use(express.urlencoded( {extended:true}));
app.use(express.json());

//Configuramos handlebars: 
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Routing
app.use("/api/productos", productRouter); 
app.use("/api/carts", cartsRouter); 

//Obtengo el array de productos:
const ProductManager = require("./controllers/product.js");
const productManager = new ProductManager("./src/models/productos.json");


io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");

    //Enviamos el array de productos al cliente que se conectó:
    socket.emit("productos", await productManager.getProducts());    
    
    //Recibimos el evento "eliminarProducto" desde el cliente:
    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
        //Enviamos el array de productos actualizado a todos los productos:
        io.sockets.emit("productos", await productManager.getProducts());
    });


    //Recibimos el evento "agregarProducto" desde el cliente:
    socket.on("agregarProducto", async (producto) => {
        console.log("Producto en socket", producto)
        try {
            await productManager.addProduct(producto);
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }  
        //Enviamos el array de productos actualizado a todos los productos:
        console.log("Actualiza lista")
        io.sockets.emit("productos", await productManager.getProducts());
    });
});



/*

// Configuración de Socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('deleteProduct', async (pid) => {
        await productManager.deleteProduct(pid);
        io.emit('updateProducts', await productManager.getProducts());
    });

    socket.on('addProduct', async (newProductData) => {
        await productManager.addProduct(newProductData);
        io.emit('updateProducts', await productManager.getProducts());
    });
});


const httpServer = app.listen(PUERTO, async () => {
    try {
        console.log(`Escuchando en el http://localhost:${PUERTO}`);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
});

//configurar socket
//const io = new socket.Server(httpServer);
*/
/*
//configurar evento 1, conection
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");
})*/