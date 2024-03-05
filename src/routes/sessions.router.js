const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { isValidPassword } = require("../utils/hashBcrypt.js");
const passport = require("passport");

//Login

router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin"}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: "error", message: "Credenciales invalidas"});

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };

    req.session.login = true;

    res.redirect("/profile");
})

router.get("/faillogin", async (req, res ) => {
    console.log("Fallo la estrategia")
    res.send({error: "error"});
})

//login con github
router.get("/github",passport.authenticate("github", {scope: ["user: email"]}) , async(req, res)=>{})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async(req, res) =>{
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
})


//Logout

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.status(200).send({message: "Login eliminado"});
})

module.exports = router;