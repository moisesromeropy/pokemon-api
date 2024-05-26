import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styles from './App.css';
import Pokemon from './Pokemon/Pokemon';
import pokeball from "./pokeball.png";

function App() {
  const [recargarDatos, setRecargarDatos] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [detallePokemon, setDetallePokemon] = useState([]);
  const [paginacion, setPaginacion] = useState({next:null , previous: null});
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  useEffect(() => {   
    if (recargarDatos) {
      obtenerDatos(url); // Llama a obtenerDatos solo si recargarDatos es true
      setRecargarDatos(false); // Establece recargarDatos a false después de llamar a obtenerDatos
    }
}, []);
const obtenerDatos = (url) => {
  axios.get(url)
  .then(({data}) => {
      console.log(data)
      setPokemonData(data.results);
      setPaginacion({next: data.next, previous: data.previous});
      
      // Llama a obtenerDetalles para cada URL de Pokémon
      data.results.forEach(pokemon => {
          obtenerDetalles(pokemon.url);
      });
  })
  .catch(err => {
      console.log(err);
  });
}

const obtenerDetalles = (url) => {
  axios.get(url)
  .then(({data}) => {
      setDetallePokemon(prevState => [...prevState, data]); 

  })
  .catch(err => {
      console.log(err);
  });
}
      
      const actualizarPagina = (url) => {

            axios.get(url)
      .then(({data}) => {
          console.log(data)
          setPokemonData(data.results);
          setPaginacion({next: data.next, previous: data.previous});
          setDetallePokemon([])
          // Llama a obtenerDetalles para cada URL de Pokémon
          data.results.forEach(pokemon => {
            axios.get(pokemon.url)
            .then(({data}) => {
              
                setDetallePokemon(prevState => [...prevState, data]); 
          
            })
            .catch(err => {
                console.log(err);
            });
          });
      })
      .catch(err => {
          console.log(err);
      });
          }
      const mostrarPokemon = () => {
        setLoading(true);
      } 
  return(
      <div className="app">
        <div className='title'>
        <h1 className='textoPrincipal'>Pokémon</h1>
        <img className="pokebola" src={pokeball} />
        </div>
        {(loading !==  true ) ? 
          <button className="botonObtenerPokemon" onClick={(e) => mostrarPokemon()}>
              Buscar Pokemon
          </button>:
          ""}
         
            { detallePokemon !== null && loading !==false &&(
          <Pokemon detallePokemon={detallePokemon}/>
        )} 
     <ul className='ul'>
            
            {(paginacion.previous !== null ) ? 
            <button className="botonesNavigation" onClick={(e)=> actualizarPagina(paginacion.previous)}>Anterior</button>:
            ""
            }
            {(paginacion.next !== null && loading ===true) ?
            <button className="botonesNavigation" onClick={(e)=> actualizarPagina(paginacion.next)}>Next</button> :
            ""
          } 

       </ul>
      </div>
  )
}

export default App;
