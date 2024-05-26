import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Pokemon.module.css'
const Pokemon = ({detallePokemon}) => {
   
    return(
        <div className={styles.container}>
            {console.log({detallePokemon})}
         { detallePokemon.map((pokemon, index) => (
            <div className={styles.tarjetaPokemon} key={index}>
                <div className={styles.contenedorImg}>
                    <img className={styles.img} 
                   src= {pokemon.sprites.front_default} 
                   alt="pokemon"
                   onMouseOver={(e) => e.currentTarget.src = pokemon.sprites.back_default  } 
                   onMouseOut={(e) => e.currentTarget.src = pokemon.sprites.front_default}
                   />
                </div>
                <span className={styles.span}>#{pokemon.id}</span>
                <div className={styles.text}>
                <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                </div>
                <div className={styles.text}>
                <p>Weight: {pokemon.weight}</p>
                <p>Height: {pokemon.height}</p>
                </div>

                <ul className={styles.ul}>
                
                   
                </ul>
           </div>
         ))}
        </div>
    )
}

export default Pokemon;