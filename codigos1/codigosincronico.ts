//Codigo sincrónico
console.log('Paso 1');

function funcion(){
    console.log('Paso 2');
    let s = 0;
    for(let i = 0; i < 1000000000; i++)
        s += i;
    console.log('Paso 3');
    return s;
}
let s = funcion();
console.log('Paso 4');
console.log('Paso 5');

