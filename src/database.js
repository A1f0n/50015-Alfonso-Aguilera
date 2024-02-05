const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://alfoo1:coderhouse@cluster0.agciy3m.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then(() => console.log("conexión exitosa"))
    .catch(()=> console.log("error"))