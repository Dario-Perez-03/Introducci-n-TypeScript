import axios from "axios";

export class Usuario {
  constructor(public id: number, public nombre: string, public edad: number) { }
  //methods
  saludar(): string {
    const mensaje = `Hola, soy ${this.nombre}`;
    return mensaje;
  }

  cambiarNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }

  //   get imagenUrl(): string {
  //     return `https://rifaEnBubba_bubbletea.com/${this.id}`;
  //   }

  async getMoves() {
    const resp = await axios.get("https://api.pokemontcg.io/v2/cards/xy1-1");
    return resp.data;
  }
  async mostrarImagen(): Promise<string> {
    const movesData = await this.getMoves();
    return movesData.data.images.large;
  }
}

export const userClass = new Usuario(1, "Juan", 25);
userClass.saludar();

userClass.cambiarNombre("Pedro");
console.log(userClass);
const datos = await userClass.getMoves();
console.log("Nombre del Pokémon:", datos.data.name);
console.log("Ataques:", datos.data.attacks);
console.log("Imagen", datos.data.images.large);



