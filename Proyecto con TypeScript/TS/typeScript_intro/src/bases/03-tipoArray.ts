// Definición de un array
export const user = [];

//tipo []
let numeros: number[] = [1, 2, 3, 4, 5];
let letras: string[] = ["a", "b", "c", "d", "e"];
let boolean: boolean[] = [true, false];

//tipo Array
let numbers: Array<number> = [1, 2, 3, 4, 5];
let letters: Array<string> = ["a", "b", "c", "d", "e"];
let booleans: Array<boolean> = [true, false];

//arry multiple tipos
const mezcla: (number | string)[] = [1, "hola", 2];

//array de objetos
interface Usuario {
  nombre: string;
  edad: number;
  activo: boolean;
}

let usuarios: Usuario[] = [
  {
    nombre: "juan",
    edad: 34,
    activo: true,
  },
  {
    nombre: "perez",
    edad: 21,
    activo: true,
  },
];

//arreglo solo leer datos
let usuario:readonly Usuario[] = [
  {
    nombre: "juan",
    edad: 34,
    activo: true,
  },
  {
    nombre: "perez",
    edad: 21,
    activo: true,
  },
];