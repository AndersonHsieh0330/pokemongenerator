import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Axios from "axios";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function InfoCell(props){
  return (<div className = "InfoCell">
  <h3>{props.cellName}:</h3><p >{props.cellData}</p></div>)
}

function App() {
  //empty dependency array for useEffect to only run once
  useEffect(()=>{
    document.title = "Pokemon Generator"
  },[])

  //state for "search button" click
  const [search, setSearch] = useState(false)

  //on Oct 20, 2021 the count is 1117, update the count after first request
  const [pokemonCount, setPokemonCount] = useState(1117)

  const [pokemon, setPokemon] = useState({typer:[]})

 useEffect(()=>{
  Axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${getRandomInt(0,pokemonCount)}`)
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
    console.log(response)
    setPokemon({
      name:response.data.name,
      img:response.data.sprites.front_default,
      typer:response.data.types,
      hp:response.data.stats[0].base_stat,
      attack:response.data.stats[1].base_stat,
      defense:response.data.stats[2].base_stat
    })
    console.log(pokemon)
  })

}

  return (
    
    <div className = "App">
      <title>Pokemon Generator</title>
       <div className = "TitleBox">
         <div style={{display:'flex',flexDirection:'column'}}>
          <h1> Pokemon Generator</h1>
          <h3>by Anderson Hsieh</h3>
          <button onClick = {()=>setSearch(!search)}>Search</button>
       </div>
       </div>
       <div className = "DataBox">
       <img className = "PokemonIMG" src={pokemon.img} style={{marginRight:100}}></img>
          <div className = "Info">
          <InfoCell cellName = "Name" cellData={pokemon.name}/>
          
          <div style={{display:'flex', flexDirection:'row', alignSelf:'flex-start', alignItems:'center'}}>
            <h3>Type: </h3>
          {pokemon.typer.map(i => <p style={{textIndent:10}}>{i.type.name}</p>)}
          </div>

            <InfoCell cellName = "HP" cellData={pokemon.hp}/>
          <InfoCell cellName = "Attack" cellData={pokemon.attack}/>
          <InfoCell cellName = "Defense" cellData={pokemon.defense}/>
       </div>
       </div>
    </div>

  );
}

export default App;
