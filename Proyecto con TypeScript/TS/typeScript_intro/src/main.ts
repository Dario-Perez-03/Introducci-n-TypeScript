import "./style.css";
/*import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

import { name } from "./bases/01-types.ts";
import { usuario } from "./bases/02-objetosinterfaces";
import { user } from "./bases/02-objetosinterfaces";
import { userClass } from "./bases/04-class";*/
import { PokemonRenderer } from "./bases/ejercicio";
import axios from "axios";
import { TablaEPAs, TablaTiposEPA } from "./tablas/cruds";

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

    <div id="epa-section" style="display: none;">
      <h2>Listado de EPAs</h2>
      <div id="tabla-epa"></div>
    </div>

    <div id="tipoepa-section" style="display: none;"> 
      <h2>Listado de Tipos de EPAs</h2>
      <div id="tabla-tipoepa"></div> 
    </div>
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
});

navEPA.addEventListener("click", () => {
  homeSection.style.display = "none";
  epaSection.style.display = "block";
  tipoepaSection.style.display = "none";
  getEPAs();
});

navTiposEPA.addEventListener("click", () => {
  homeSection.style.display = "none";
  epaSection.style.display = "none";
  tipoepaSection.style.display = "block";
  getTiposEPA();
});

const pokemonRenderer = new PokemonRenderer("poke");
pokemonRenderer.PokemonData();

function getEPAs() {
  axios.get("http://localhost:3000/epa/listar")
    .then(response => {
      const datos = response.data?.data ?? response.data;
      TablaEPAs(datos);
    })
    .catch(error => {
      console.error("Error al hacer la petición:", error);
    });
}

function getTiposEPA() {
  axios.get("http://localhost:3000/tipoepa/listar")
    .then(response => {
      const datos = response.data.data ?? response.data;
      TablaTiposEPA(datos);
    })
    .catch(error => {
      console.error("Error al listar tipos EPA:", error);
    });
}