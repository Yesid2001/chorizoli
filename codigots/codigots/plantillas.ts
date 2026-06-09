const nombre: string = 'Juan';
let edad: number = 20;
let texto: string = `Hola, mi nombre es ${nombre} y el año siguiente cumplire ${edad + 1}`
console.log(nombre, edad);
console.log(texto);

function saludo(nom: string): string{
    return `Hola ${nom}`;
}
const cad: string = `Saludo: ${saludo(nombre)}`;
console.log(cad);

