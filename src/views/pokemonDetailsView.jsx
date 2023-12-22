import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails, getPokemonSpecies } from '../model/pokemonService';
import Banner from './components/banner';
// import PokeItem from './components/pokeItem';
import { Image } from '@chakra-ui/react'

function PokemonDetailsView() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokemonData = await getPokemonDetails(name);
      setPokemon(pokemonData);
      const speciesData = await getPokemonSpecies(name);
      setSpecies(speciesData);
    };

    fetchPokemonData();
  }, [name]);

  const pokemonImageURL = pokemon
    ? `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
    : "";

  return (
    <div>
      <Banner text={name} />
      <div className="columnContainer_1">
        {pokemon ? (
          <Image
          borderRadius='full'
          boxSize='200px'
          src={pokemonImageURL}
          alt={pokemon.name}
          />
        ) : (
          <p>Loading...</p>
        )}
        <div className="textBox">
          <div className="introText">
            {pokemon && species ? (
              <div>
                <p>Name: {pokemon.name}</p>
                <p>Height: {pokemon.height * 10} cm</p>
                <p>Weight: {pokemon.weight / 10} kg</p>
                <p>
                  Type: {pokemon.types.map((type) => type.type.name).join(", ")}
                </p>
                <p>
                  Abilities:{" "}
                  {pokemon.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </p>
                <p>
                  Fact:{" "}
                  {
                    species.flavor_text_entries.find(
                      (entry) => entry.language.name === "en"
                    ).flavor_text
                  }
                </p>
              </div>
            ) : (
              "Loading Pokémon details..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default PokemonDetailsView;
