
/*let persona :{nombre: string ; apellido: string}= {
    nombre:'Juan',
    apellido: 'Perez'
};
*/
interface Direccion {
    ciudad: string;
    calle: string;
    numero: number;
}

interface Persona {
    nombre: string;
    apellido: string;
    direccion: Direccion;
}

let persona: Persona = {
    nombre: 'Juan',
    apellido: 'Perez',
    direccion: {
        ciudad: 'La Paz',
        calle: 'Av Bolivia',
        numero: 742
    }
};

//console.log(persona);
//console.table(persona);
//console.table({persona});
let p1 = JSON.parse(JSON.stringify(persona));
p1.nombre = 'Carlos';
p1.direccion.ciudad = 'Oruro';

console.log(persona);
console.log(p1);
//hay que buscar una clonacion correcta 