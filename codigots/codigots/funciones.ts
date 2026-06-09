/*
//funcion tradicional
function saludar(x: string): string {
    return `Hola ${x}`;
    //return 1;
}
console.log(saludar("Juan"))
*/
/*
//funciones anonimas
const saludar = function(x: string):string{
    return `Hola ${x}`;
}
console.log(saludar("Juan"));
*/
/*
//funcion flecha
const saludar =(x: string):string =>{
    return `Hola ${x}`;
}
console.log(saludar("Juan"));
*/
/*
//funcion flecha abreviada
const saludar =(x: string):string => `Hola ${x}`;

console.log(saludar("Juan"));
*/
/*
//funcion flecha
const obtPersona =() =>{
    return {
        nombre: "Juan",
        edad: 25
    }4
}
console.log(obtPersona());
*/
/*
//funcion flecha abreviada
const obtPersona =() =>({
    
        nombre: "Juan",
        edad: 25
    
})
console.log(obtPersona());
*/
/*
//funcion 
interface Persona{
    nombre: string;
    edad: number;
}
function obtPersona(): Persona{
    return {
        nombre: "Juna",
        edad: 25
    }

}
console.log(obtPersona());
*/
/*
// funcion anonima con interface
interface Persona{
    nombre: string;
    edad: number;
}

const saludar = function(nombre: string, edad: number):Persona{
    return `Hola ${nombre}, tu edad es ${edad}`;
}
console.log(saludar("Juan",25));
*/
/*
//funcion flecha con interface
interface Persona{
    nombre: string;
    edad: number;
}
const obtPersona = (): Persona => ({   
        nombre: "Juna",
        edad: 25
})
console.log(obtPersona());
*/
// buscar objeto persona en funcion flecha
interface Persona{
    nombre: string;
    edad: number;
} 
let persona: Persona[] = [
    {nombre: "Juan", edad: 25},
    {nombre: "Ana", edad: 16},
    {nombre: "Pepe", edad: 22}
];
console.log(persona);

let pv ={}
const buscarP = (nombre: string) => {
    for (let i = 0; i < persona.length; i++) {
        if (persona[i].nombre === nombre) {
            pv = persona[i];
        }
    }
    return pv;
};
console.log(buscarP("Pedro"));