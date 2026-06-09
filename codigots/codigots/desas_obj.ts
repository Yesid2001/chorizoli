
/*
interface Persona{
    id?: number; // opcional (puede tener o no id )
    nombre: string;
    apellido: string;
    edad: number 
}

const persona = {
    id: 10,
    nombre: 'Juan',
    apellido: 'Perez',
    edad:20 
}
    */
/*
const nombre = persona.nombre;
const apellido = persona.apellido;
const edad = persona.edad;
console.log(nombre, apellido, edad);
*/
 //DESESTRUCTRACIÓN DE OBJETOS 
/*
 const {nombre: a, apellido: b, edad} = persona;
 console.log(a, b, edad);
*/
/*
const miFuncion = (pers: Persona ) => {
    const {id, nombre} = pers; //para sacar los valores 
    return {
        id, // id: id  son lo mismo si tienen el mismo nombre
        nom: nombre  
    }
}
const {id, nom}= miFuncion(persona)
console.log(id,nom)
*/
/*
//OTRA FORMA
const miFuncion = (pers: Persona ) => {
    const {id, nombre} = pers; //para sacar los valores 
    return {
        id, // id: id  son lo mismo si tienen el mismo nombre
        usuario: {
            nombre: 'Maria',
            apellido: 'Paz'
        } 
    }
}
    */
/*
const {id, usuario }= miFuncion(persona)
console.log(id,usuario.nombre )
*/
/*
//otra forma 
const {id, usuario: {nombre} }= miFuncion(persona)
console.log(id,nombre )
//otra forma 
*/
// TAREA //
const estado = () => {
    let nombre1 = 'Juan';
    const setNombre = (nuevo: string) => {
        nombre1 = nuevo;
        console.log('Hola', nombre1);
    };
    return [nombre1, setNombre] as const;
};
const [nombre1, setNombre] = estado();
console.log(nombre1); 
setNombre('Maria');