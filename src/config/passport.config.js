const passport = require("passport");
const local = require("passport-local");
const UserModel = require("../models/user.model.js");
const { createHash, isValidPassword } = require("../utils/hashBcrypt.js");

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true, 
        usernameField: "email"
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body;
        console.log("Registrando usuario:", email); // Log para depuración
        try {
            let user = await UserModel.findOne({ email });
            if(user) {
                console.log("Usuario ya existe:", email); // Log para depuración
                return done(null, false);
            }
            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser);
            console.log("Usuario creado exitosamente:", result); // Log para depuración
            return done(null, result);        
        } catch (error) {
            console.log("Error en el registro:", error); // Log para depuración
            return done(error);
        }
    }))

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            //Primero verifico si existe un usuario con ese mail.
            const user = await UserModel.findOne({ email });
            if(!user) {
                console.log("Este usuario no existe");
                return done(null, false);
            }
            // Aquí agregamos los logs antes de llamar a isValidPassword
            console.log("Password ingresada:", password);
            console.log("Password hasheada en DB:", user.password);
    
            //Si existe verifico la contraseña: 
            if(!isValidPassword(password, user)) {
                console.log("Contraseña incorrecta");
                return done(null, false);
            }
            return done(null, user);
    
        } catch (error) {
            console.log("Error en el proceso de login:", error);
            return done(error);
        }
    }))
    

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id: id});
        done(null, user);
    })
}

module.exports = initializePassport;
