/*
let persona: {nombre: string; apellido: string} = { // {nombre: string para definir que tipo de datos se deben usar asi no permitira otro tipo}
    nombre: 'Juan',
    apellido: 'Perez'
}
*/

// otra forma de hacer 

/*
interface Persona {
    nombre: string;
    apellido: string
}
 let persona: Persona = {
    nombre: 'Juan',
    apellido: 'Perez'
 }
console.log(persona);
console.table(persona);
console.table({persona});
*/
// direccion debe tener ciudad calle y numero  dentro del objeto persona
interface Persona {
    nombre: string;
    apellido: string;
    direccion: Direccion;
}
interface Direccion {
    ciudad: string;
    calle: string;
    numero: number;
}
let persona: Persona = {
    nombre: 'Juan',
    apellido: 'Perez',
    direccion: {
        ciudad: 'La Paz',
        calle: 'Av. Busch',
        numero: 123
    }
}
//console.log(persona);
//console.table(persona);
//console.table({persona});

// para la tarea, clonar el objeto y que no se puedan cambiar los datos del original solo del p1, hacer una clonación correcta 
let p1 = {...persona}; // ... spread, esto no es lo correcto
p1.nombre = 'Maria';
p1.direccion.ciudad = 'Oruro'; 
console.log(persona);
console.log(p1);
