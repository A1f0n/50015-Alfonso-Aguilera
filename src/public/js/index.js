// index.js
const socket = io();

socket.on("productos", (data) => {
    renderProductos(data);
}); 

//Función para renderizar la tabla de productos:
const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";


    productos.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        //Agregamos boton para eliminar: 
        card.innerHTML = `
                <p>Id ${item.id} </p>
                <p>Titulo ${item.title} </p>
                <p>Precio ${item.price} </p>
                <button> Eliminar Producto </button>
        
        `;
        contenedorProductos.appendChild(card);

        //Agregamos el evento eliminar producto:
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        });
    });
}

function deleteProduct(pid) {
    socket.emit('deleteProduct', pid);
}

//Agregar producto:

/*document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto();
});
*/

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("btnEnviar").addEventListener("click", () => {
        agregarProducto();
    });
});


const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: parseInt(document.getElementById("price").value),
        thumbnails: document.getElementById("thumbnails").value,
        code: document.getElementById("code").value,
        stock: parseInt(document.getElementById("stock").value),
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };
    console.log("producto en cliente", producto)
    socket.emit("agregarProducto", producto);
};
