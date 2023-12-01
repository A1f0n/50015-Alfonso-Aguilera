//Clase 1 - Principios Básicos de JS. 

//Temas de hoy: 

// - Plantillas literales. 
// - Funciones. 
// - Scope. 
// - Clouseres. 
// - POO / Clases.

//1) Plantillas literales: 

//antes: 

let mascota = "Fatiga";

let edadMascota = 5;

console.log("Nuestro perro " + mascota + " tiene " + edadMascota + " años");

//backsticks ` (alt + 96) // Alt } en mac

//ahora: 

console.log(` ${mascota} tiene ${edadMascota} años`);

//En este espacio tambien podemos ejecutar  cualquier código de JS. 

console.log(`Mi amigo ${mascota} tiene ${edadMascota + 1}`);


//2) Funciones: las funciones son bloques de código que podemos reutilizar en nuestro programa. Deben tener una responsabilidad. 
//CODEMETRICS extensión que me ayuda con la complejidad de las funciones.

//2 tipos de funciones: Funciones declarativas y las funciones expresivas. 

//FUNCIONES DECLARATIVAS: 
saludar("backend");

//1) Paso, las vamos a declarar. 

function saludar(curso) {
    //Cuerpo de la función: 
    console.log("hola comisión " + curso);
}

//2) Paso, las tengo que invocar. 

saludar("js");

//Esto se puede hacer gracias al "hoisting", es un proceso interno que realiza el lenguaje durante la lectura del código. (ojota! solo con las funciones declarativas!)

//Otro tipo de funciones que tenemos son las expresivas: 

//Las trabajamos asignadolas a variables: 

//Funciones anonimas: 


let nuevoSaludo = function(curso) {
    console.log("La mejor comisión del mundo " + curso);
}

nuevoSaludo("Backendo!");

//Las funciones anonimas siempre estuvieron en JS. 

//Funciones Flechas: son una forma más corta de escribir funciones expresivas. 

//¿Por que se llaman flecha? => 

let ultimoSaludo = (curso) => {
    console.log("Hola grupo " + curso + " ya nos vamos de breke");
}

ultimoSaludo("Backend!!!");


//Incluso las pueden escribir de forma más resumida: 

let chau = curso => console.log("Chauuu " + curso);

chau("backendiño");

//4) Scope: 
//El alcance que tienen las variables dentro de nuestro programa. 
//En JS tenemos dos tipos de scope: global y el local. 

//Global: las variables declaradas en este scope pueden ser accedidas desde cualquier parte del programa. 
//Local: las variables declaradas solo pueden ser accedidas desde el bloque en donde fueron declaradas. 

//Ejemplo: 

let global = 2023; 

function saludito() {
    console.log("Hola, estamos en el año " + global);
    let curso = "Backend";
    console.log("Curso de " + curso);
}

saludito();
//console.log("Curso de " + curso);

//5) Closures: 
//Las clausulas o cierres. 

//Una función padre. 
//Una variable. 
//Una función anidada. 

function padre() {
    let deuda = 150000;

    function anidada() {
        console.log(deuda);
    }
    return anidada;
}

let clausula = padre();
clausula();


//POO 

//6) Clases: 
//Las clases como moldes que nos permiten crear objetos con caracteristicas similares. 

//Sintaxis: 

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        //La palabrita reservada "this" hace referencia al objeto que se esta creando. 
    }

    //Podemos agregar métodos a la clase: 

    saludar() {
        console.log("Hola, soy  " + this.nombre);
    }

    despedir() {
        console.log("Chau, me fui, soy " + this.nombre);
    }
}

const coky = new Persona("Coky", 15); 

console.log(coky);

coky.saludar();
coky.despedir();

//HERENCIA: 

class Empleado extends Persona {
    constructor(nombre, edad, sueldo) {
        super(nombre, edad);
        this.sueldo = sueldo;
        //super significa que estamos llamando al constructor de la clase padre. 
    }
}


const empleado = new Empleado("Pepe", 50, 500000);

console.log(empleado);

empleado.saludar();

//JS ES UN SISTEMA BASADO EN PROTOTIPOS: 
//¿Que es un prototipo? 
//Es un objeto del cual otro objeto hereda sus propiedades y métodos. 

const animal = {
    especie: "Animal", 
    comer: function() {
        console.log("Comiendo");
    }
}

const gato = {
    raza: "Gato", 
    maullar: function() {
        console.log("Miau");
    }
}

//Ojota esto es en forma educativa: !!

gato.__proto__= animal;

//De esta forma el objeto gato hereda las propiedades y los metodos de animal: 

gato.comer();
gato.maullar();

//Incluso lo puedo sobre escribir: 
gato.maullar= function() {
    console.log("Miau Miau");
}

//Aclaramos que __proto__es una propiedad que tiene todos los objetos y que nos permite acceder al prototipo. No es muy recomendable usarla, ya que es una propiedad privada del lenguaje. 

//En su lugar se puede crear con Object.create();

//Ejemplo: 

const perro = Object.create(animal); 

perro.raza = "Perro";
perro.ladrar = function() {
    console.log("Guau");
}


