import "./style.css";
/*import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

import { name } from "./bases/01-types.ts";
import { usuario } from "./bases/02-objetosinterfaces";
import { user } from "./bases/02-objetosinterfaces";
import { userClass } from "./bases/04-class";*/
import { PokemonRenderer } from "./bases/ejercicio";
import { tipoEPA } from './tablas/tipoEpa.ts';
import{epa} from './tablas/epa.ts';


const appDiv = document.querySelector<HTMLDivElement>("#app")!;

appDiv.innerHTML = `
  <div class="sidebar">
    <button id="nav-home" class="nav-btn">Home</button>
    <button id="nav-epa" class="nav-btn">EPA</button>
    <button id="btn-tipoepa" class="nav-btn">Tipos EPA</button>
  </div>

  <div class="content">
    <div id="home-section">
      <h2>Home - Pokémon</h2>
      <div id="poke"></div>
    </div>

    <section id="epa-section" style="display: none;">
      <h2>EPA</h2>
      <div id="epa-botones"></div>
      <div id="formulario-epa"></div>
      <div id="resultado-epa"></div>
      <div id="tabla-epa"></div>
    </section>

    <section id="tipoepa-section" style="display: none;">
      <h2>Tipos EPA</h2>
      <div id="tipoepa-botones"></div>
      <div id="formulario"></div>
      <div id="resultado"></div>
      <div id="tabla-tipoepa"></div>
    </section>
  </div>
`;


const homeSection = document.getElementById("home-section")!;
const epaSection = document.getElementById("epa-section")!;
const tipoepaSection = document.getElementById("tipoepa-section")!;

const navHome = document.getElementById("nav-home")!;
const navEPA = document.getElementById("nav-epa")!;
const navTiposEPA = document.getElementById("btn-tipoepa")!;


navHome.addEventListener("click", () => {
  homeSection.style.display = "block";
  epaSection.style.display = "none";
  tipoepaSection.style.display = "none";
  epa();
});

navEPA.addEventListener("click", () => {
  homeSection.style.display = "none";
  epaSection.style.display = "block";
  tipoepaSection.style.display = "none";
  epa();
});

const pokemonRenderer = new PokemonRenderer("poke");
pokemonRenderer.PokemonData();


navTiposEPA.addEventListener("click", () => {
  homeSection.style.display = "none";
  epaSection.style.display = "none";
  tipoepaSection.style.display = "block";

  setTimeout(() => {
    tipoEPA();
  }, 0);
});


