//sintaxis de corchetes
let v: (number | string)[] = [1,2,3,4,5];
v.push(6);
v.push(7);
v.push('hola');
console.log(v);
//sintaxis de corchetes
let x: Array<number | string> = [1,2,3,4,5];
x.push(6);
x.push(7);

console.log(x);
// uso de genericos
let a:Array<number | string>=[1,2,3,4,5];
a.push(6);
a.push(7);
a.push("Hola");
let b=[...a]; //spread
b[0]=100;
console.log(b);
console.log(a);