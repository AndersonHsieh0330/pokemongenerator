import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Axios from "axios";

function Pokemon(){
  const [pokemon, getPokemon] = useState(null)
  
  return 
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function App() {
  //state for "search button" click
  const [search, setSearch] = useState(false)

  //on Oct 20, 2021 the count is 1117, update the count after first request
  const [pokemonCount, setPokemonCount] = useState(1117)

  const [pokemon, setPokemon] = useState({})

 useEffect(()=>{
  Axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${1}`)
  .then(response => {
    console.log(`There are currently ${response.data.count} pokemons`)
    setPokemonCount(response.data.count)
    
    let pokemonURL = response.data.results[0].url
    console.log(`currnet pokemon found url: ${pokemonURL}`)
    
    if(pokemonURL!== null){
    getPokemon(pokemonURL)}
 })}, [search])


function getPokemon(url){
  Axios.get(url)
  .then(response =>{
    setPokemon({
      name:response.data.name,
      species:response.data.species,
      img:response.data.sprites.front_default,
      type:response.data.types
    })
    console.log(pokemon)
  })
}


  

  return (
    <div className = "App">
       <div className = "Title">
          <h1>Pokemon Generator</h1>
          <p>by Anderson Hsieh</p>
          <button onClick = {()=>setSearch(!search)}>Search</button>
       </div>
       <div className = "Data">
         data display
         
       </div>
    </div>
  );
}

export default App;
