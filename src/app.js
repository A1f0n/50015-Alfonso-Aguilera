const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const PUERTO = 8080;
require("./database.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser());

app.use(session({
    secret:"secretCoder",
    resave: true, 
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://alfoo1:coderhouse@cluster0.agciy3m.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })

}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//Login de usuario con Session: 
app.get("/login", (req, res) => {
    let usuario = req.query.usuario; 

    req.session.usuario = usuario; 
    res.send("Guardamos el usuario por medio de query");
})

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

