import React, { useEffect, useState } from 'react';
import './FetchApi.css';
import PokemonCards from './PokemonCards';

export default function FetchApi() {
    const [apiData,setApiData] = useState([]);
    const [load,setLoad] = useState(true);
    const [error,setError] = useState(null);
    const [search,setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=1302";

    // const fetchAPI = () => {
    //     fetch(API)
    //     .then( (res) => res.json())
    //     .then( (data) => {
    //         setApiData(data);
    //         setLoad(false);
    //     })
    //     .catch( (error) => {
    //         console.log(error);
    //         setError(error);
    //         setLoad(false);
    //     });
        
    // }

    const fetchAPI = async () => {
        try{
            const response = await fetch(API);
            const data = await response.json();

            const pokemonData = data.results.map( async (curr) => {
                const res = await fetch(curr.url);
                const resData = await res.json();
                return resData;
            });

            const detailedData = await Promise.all(pokemonData);
            //console.log(detailedData);

            setApiData(detailedData);

            setLoad(false);
        }catch(error){
                console.log(error);
                setError(error);
                setLoad(false);
        }
    }

    useEffect( () => {
        fetchAPI();
    },[]);

    const searchData = apiData.filter( (curr) => 
        curr.name.toLowerCase().includes(search.toLowerCase())
    );

    if(load){
        return (
            <div className='display-1 text-center'>
                <h1>LOADING...</h1>
            </div>
        )
    }

    if(error){
        return(
            <div className='display-2 text-center'>
                <h1 className=''>{error.message}</h1>
            </div>
        )
    }

    return (
        <div className='container'>
            <header>
                <h1 className='display-1 text-center'>Catch Pokemon API</h1>
            </header>
            <div className='pokemon-search'>
                <input type="text" placeholder='Search Pokemon' value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div>
                <ul className='cards'>
                    {
                        searchData.map( (curr) => {
                            return (
                                <PokemonCards key={curr.id} data={curr}/>
                            )
                        })
                    }
                </ul>
            </div>
            
        </div>
      )
    }
