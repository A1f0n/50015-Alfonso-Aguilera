//Clase 2 - Nuevas funcionalidades de EcmaScript 

//ES6: 

// 1 . Desestructuración. 
// 2 . Valores por defecto. 
// 3 . Trabajo por modulos. 
// 4 . Agregamos algunas funciones a las Clases. 

//1) Desestructuración: 

const pelicula = {
    titulo: "El Padrino", 
    director: "Francis Ford Coppola",
    genero: "Drama", 
    lanzamiento: 1972,
    protagonista: {
        nombre: "Al",
        apellido: "Pacino",
        edad: 18
    }
};

//Antes de ES6

let titulo = pelicula.titulo; 

console.log(titulo);

//Ahora con ES6:

let {titulo:tituloPeli, director, genero, lanzamiento} =  pelicula; 

console.log(tituloPeli);

//Si quiero desestructurar el objeto anidado: 

let {protagonista: {nombre}} = pelicula;

console.log(nombre);

//Ejemplo con los Arrays: 

const numeros = [1,2,3,4,5];

//Antes de ES6: 

let uno = numeros[0];
let dos = numeros[1];

console.log(uno, dos);

//Ahora con ES6: 

let [,, indiceDos, indiceTres, indiceCuatro] = numeros;

console.log(indiceDos, indiceTres, indiceCuatro);

//2) Valores por defecto: 
//Nos permite asignar valores por defecto a los parámetros de una función. 

function saludar(nombre = "Invitado") {
    console.log(`Hola ${nombre}`);
}

saludar(); 

saludar("Tinki Winki");


//3) Trabajo por modulos. 
//Si quisiera importar el array de productosMarolio lo hago de la siguiente manera:

import productosMarolio from "./datos.js";

console.log(productosMarolio);


//4) Clases: 

class Persona {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    saludar(){
        console.log(`Hola, soy ${this.nombre} ${this.apellido}`);
    }
}

const personita = new Persona("Doble", "LuisMi", 18);

console.log(personita);

personita.saludar();

//Herencia. 

class Estudiante extends Persona {
    #promedio;
    constructor(nombre, apellido, edad, carrera, promedio) {
        super(nombre, apellido, edad); 
        this.carrera = carrera; 
        this.#promedio = promedio;
    }

    saludar() {
        console.log(`Hola, soy el estudiante ${this.nombre} y estudio ${this.carrera}`);
    }

    get getPromedio() {
        return this.#promedio;
    }
}

const estudiante = new Estudiante("Juancito", "Perez", 18, "Ingenieria en Sistemas", 10);

estudiante.saludar();


//Trabajamos con variables privadas: 

console.log(estudiante.promedio); //undefined

//Para poder acceder al promedio uso el get: 
console.log(estudiante.getPromedio);

//ES7: esta versión fue lanzada en el año 2016. 
// - Operador de exponenciación: **
// - Includes: me permite saber si hay un determinado elemnto adentro de un array o string

//Antes de ES7:

let base = 4;
let exponente = 3;

let resultado = Math.pow(base, exponente);
console.log(resultado);

//Con ES7: 

let resultadoDos = base ** exponente;
console.log(resultadoDos);

//Includes: 

const losSimpsons = ["Homero", "Marge", "Bart", "Lisa", "Maggie"];

console.log(losSimpsons.includes("Lionel")); 
//Esto me retorna true o falsete. 

//Antes ES7: usabamos el indexOf. Entonces si me retornaba -1 es porque no lo encontraba. 

console.log(losSimpsons.indexOf("Maggie") > -1 ); 
//Que me retorne true. 

//ES8: Version del año 2017. 
//Principales cambios: async / await. (lo vemos la clase que viene). 
//Variables y métodos estaticos: 

class Contador {
    static cantidad = 0;

    constructor() {
        Contador.cantidad++;
    }

    obtenerCantidad() {
        return Contador.cantidad;
    }
}

const contador1 = new Contador();
const contador2 = new Contador();
const contador3 = new Contador();

//console.log(Contador.obtenerCantidad());
console.log(contador3.obtenerCantidad());


//Object.values: devolver un array con los valores de las propiedades de un objeto: 

const pepe = {
    nombre: "Pepe",
    apellido: "Argento",
    edad: 18,
    puesto: "Vendedor de Zapatos"
}

const resultadoPepeValores = Object.values(pepe);
console.log(resultadoPepeValores);

//Object.keys: Devuelve las claves de un objeto a un arreglo. 

const resultadoPepeKeys = Object.keys(pepe);
console.log(resultadoPepeKeys);

//Object.entries: devuelve un array de arrays, donde cada sub-array tiene la clave y valor: 

const resultadoPepeEntries = Object.entries(pepe);
console.log(resultadoPepeEntries);

//ES9: version que fue lanzada en el 2018
//principales cambios: finally, recuerden que se ejecuta siempre, tanto si la promesa se cumple o no. 

//Spread Operator: operador de propagación. Nos permite desparramar los elementos de un objeto iterable (array, objeto) de forma indivual. 

const arrayNombres = ["Samuel", "Federico", "Luciana", "Maria"]; 

console.log(...arrayNombres);

//Es lo mismo a que yo haga esto: 

console.log(arrayNombres[0], arrayNombres[1], arrayNombres[2], arrayNombres[3]);

//Ejemplo: 

const coky = {
    nombre: "Coky",
    apellido: "Argento",
    edad: 18
};

const coky2 = coky; 
//Esto esta mal! Guarda! Ojota! 

coky2.nombre = "Paola";
console.log(coky);

//Si yo quiero copiar un objeto tengo que usar el operador spread: 

const coky3 = {...coky};
//De esta forma si estoy copiando los datos y no estoy igualando las referencias en memoria. 