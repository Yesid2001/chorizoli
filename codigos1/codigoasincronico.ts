//Codigo asincrónico
console.log('Paso 1');

function funcion1(){
    console.log('Paso 2');
    setTimeout(() => {
            console.log('Paso 3');
    }, 2000);
    console.log('Paso 4');

}
funcion1();
console.log('Paso 5');