interface  Persona {
    nombre: string;
    nota: number;
}
const personas: Persona[] =  [
    {
        nombre: 'Juan',
        nota: 50
    },
    {
        nombre: 'Maria',
        nota: 50
    }
] 
function funcion5(personas: Persona[],callback1:any, callback2:any){
    setTimeout(() => {
        let n = personas.length;
        for(let i = 0; i < n; i++){
            const {nota} = personas[i];
            console.log(nota);
           
            if(nota >= 51){ //aprobado
                callback1();
                return
            }
        }
        callback2();
        
    },2000);
}

const exito = () => console.log("Exito");
const noexito = () => console.log("No exito");
funcion5(personas, exito, noexito);
