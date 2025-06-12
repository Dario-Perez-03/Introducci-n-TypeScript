interface Usuario {
  nombre: string;
  edad: number;
  activo: boolean;
}

export const usuario: Usuario = {
  nombre: "juan",
  edad: 21,
  activo: true,
};

const perez: Usuario = {
  nombre: "perez",
  edad: 21,
  activo: true
};

export const user: Usuario[] = [];
user.push(perez);
console.log(user);
