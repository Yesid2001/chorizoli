const v = [1, 2, 3, 4, 5];
// anterior
/*
const primero = v[0];
const segundo = v[1];
const tercero = v[2];
console.log(primero, segundo, tercero);
*/
/*
//DESESTRUCTURACIÓN DE ARREGLOS

const [primero, segundo, tercero] = v;
console.log(primero, segundo, tercero);
*/
// OTRA FORMA//
/*
const [,,tercero] = v;
console.log(tercero);

const [...todos] = v;
console.log(todos);
*/
/*
const [primero, ...resto] = v;
console.log(primero, resto);
*/
/*
const funcion = () => {
    return ['ABC', 123] as const;
}
const [primero, segundo] = funcion()
console.log(primero +1, segundo+1); // resultado: ABC1, 124
*/
/*
const funcion = () => {
    return [
        
        'ABC',
        (y: number ) => y % 2 ==0 // si es numero par devuelve true, si es impar devuelve false, esta es una funcion 
    ] as const;
}
const [primero, segundo] = funcion()
console.log(primero +1, segundo(6)); // resultado: ABC1, 
*/

// TAREA //
const useStete = (x: string) =>{
    return [
            x,
            (y: string) => {console.log(`Hola ${y}`)}
        ]as const;
}
const [nombre, setNombre] = useStete('Juan');
console.log(nombre);
setNombre('Maria');

