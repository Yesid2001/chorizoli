/*type Color = 'rojo' | 'verde' | 'azul';*/
enum Colores{
    rojo="rojo",
    verde= "verde",
    azul = "azul"
};
interface Persona {
    id : number;
    nombre : string;
    color: Color;
};
const personas: Persona  []=[
    {
        id: 1,
        nombre: 'Juan',
        color: Colores.rojo
    },
    {
        id: 2,
        nombre: 'Maria',
        color: Colores.azul
    },
];
console.log(personas);
enum Colores{
    rojo="rojo", 
    verde= "verde", 
    azul = "azul" 
}console.log(Colores.rojo); 