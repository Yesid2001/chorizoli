interface  Persona {
    nombre: string;
    nota: number;
}
const personas6: Persona[] =  [
    {
        nombre: 'Juan',
        nota: 50
    },
    {
        nombre: 'Maria',
        nota: 50
    }
] 
function funcion6(personas: Persona[]){
    return new Promise((resolve:any, reject:any) => {
        setTimeout(() => {
        let n = personas.length;
        for(let i = 0; i < n; i++){
            const {nota} = personas[i];
            console.log(nota);
           
            if(nota >= 51){ //aprobado
                resolve("Exito");                
            }
        }
        reject('No exito');
        
    },2000);
    });
}
funcion6(personas6)
    .then((mensaje) => {console.log('then:',mensaje)})//exito
    .catch((mensaje) => {console.log('cath:',mensaje)})//no exito
    .finally(() => {console.log('finalizo')})