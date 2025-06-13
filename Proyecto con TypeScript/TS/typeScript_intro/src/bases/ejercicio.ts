import axios from "axios";

export class PokemonRenderer {
    private appDiv: HTMLDivElement;

    constructor(appDivId: string) {
        const element = document.querySelector<HTMLDivElement>(`#${appDivId}`);
        if (!element) {
            throw new Error(`Element with ID '${appDivId}' not found.`);
        }
        this.appDiv = element;
    }

    async PokemonData(): Promise<void> {

        const resp = await axios.get("https://api.pokemontcg.io/v2/cards/xy1-1");
        const datos = resp.data;
        const pokemonName = datos.data.name;
        const pokemonAttacks = datos.data.attacks
            .map((attack: any) => attack.name)
            .join(", ");
        const pokemonImage = datos.data.images.large;

        this.PokeInfo(pokemonName, pokemonAttacks, pokemonImage);
    }

    private PokeInfo(
        name: string,
        attacks: string,
        imageUrl: string
    ): void {
        const pokemonInfoDiv = document.createElement("div");
        pokemonInfoDiv.innerHTML = `
        <h2>Información del Pokémon</h2>
        <p>Nombre: ${name}</p>
        <p>Ataques: ${attacks}</p>
        <img src="${imageUrl}" alt="${name}"/>
    `;
        this.appDiv.appendChild(pokemonInfoDiv);
    }
}