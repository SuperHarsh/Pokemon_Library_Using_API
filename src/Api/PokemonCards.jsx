import React from 'react'

export default function PokemonCards({key, data}) {
  return (
    <li className='pokemon-card' key={key}>
        <figure>
            <img src={data.sprites.other.dream_world.front_default} alt={data.name} className='pokemon-image' />
        </figure>

        <h1 className='pokemon-name'>{data.name}</h1>

        <div className='pokemon-info pokemon-highlight'>
            <p>{data.types.map( (curr) => curr.type.name).join(", ")}</p>
        </div>

        <div className='grid-three-cols'>
            <div className='pokemon-info'>
                <p>{data.height}</p>
                <span>Height: </span>
            </div>
            <div className='pokemon-info'>
                <p>{data.weight}</p>
                <span>Weight: </span>
            </div>
            <div className='pokemon-info'>
                <p>{data.stats[5].base_stat}</p>
                <span>Speed: </span>
            </div>
        </div>

        <div className='grid-three-cols'>
            <div className='pokemon-info'>
                <p>{data.base_experience}</p>
                <span>Experience:</span>
            </div>
            <div className='pokemon-info'>
                <p>{data.stats[1].base_stat}</p>
                <span>Attack:</span>
            </div>
            <div className='pokemon-info'>
                <p>{data.abilities.map( (abi) => abi.ability.name).slice(0,1).join(", ")}</p>
                <span>Abilities:</span>
            </div>
        </div>
    </li>
  )
}
