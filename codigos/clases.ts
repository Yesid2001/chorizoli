//Forma tradcional
/*class Circulo{
    //Atributo
    public radio : number;
    //Metodos
    public constructor(radio : number){
        this.radio = radio;
    }
    public area(): number{
        return Math.PI * this.radio * this.radio;
    }   
}*/
/*class Circulo {
    public constructor(public readonly radio: number) {}
    
    public area(): number {
        return Math.PI * this.radio * this.radio;
    }
    
    // Getter de radio
    public getRadio(): number {
        return this.radio;
    }
}
const circulo = new Circulo(1);
console.log(circulo.area());
console.log(circulo.getRadio());*/
/*
class CirculoS{
    
    //Metodos
    public constructor(public readonly radio:number){}
    public area(): number{
        return Math.PI * this.radio * this.radio;
    }   
}
const circulo = new Circulo(1);
console.log(circulo.area());
*/  
/*class Figura {
    constructor(public color: string) {}
}

class Circulo extends Figura {
    public constructor(public readonly radio: number, color: string) {
        super(color);
    }
    
    public area(): number {
        return Math.PI * this.radio * this.radio;
    }
    
    public getRadio(): number {
        return this.radio;
    }
}
const circulo = new Circulo(1, 'rojo');
console.log(circulo.area());
console.log(circulo.getRadio());
console.log(circulo.color);*/
class Figura {
    public color: string;              
    protected tipo: string;         
    private id: number;                 
    constructor(color: string) {
        this.color = color;
        this.tipo = "Figura";
        this.id = Math.random();
    }
    
    public getId(): number {
        return this.id;              
    }
}
class Circulo extends Figura {
    public readonly radio: number;
    
    constructor(radio: number, color: string) {
        super(color);
        this.radio = radio;
        this.tipo = "Círculo";              
    }
    public getRadio(): number {
        return this.radio;
    }
    public getTipo(): string {
        return this.tipo;
    }
}

const circulo = new Circulo(1, 'rojo');
console.log(circulo.getId());    
console.log(circulo.getTipo());  
console.log(circulo.getRadio());
