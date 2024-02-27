const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://alfoo1:coderhouse@cluster0.agciy3m.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Vamos a morir, tenemos un error"))
    