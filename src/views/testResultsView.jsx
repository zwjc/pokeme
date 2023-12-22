import React, { useState, useEffect } from "react";
import { getPokemonDetails, getPokemonSpecies } from "../model/pokemonService";
import Banner from "./components/banner";
import PokeItem from "./components/pokeItem";
import { Image } from '@chakra-ui/react'
import Icon1 from "../assets/images/icon_1.png";
import Icon2 from "../assets/images/icon_2.png";
import Icon3 from "../assets/images/insignia.png";
import "/src/style.css";

function TestResultsView(props) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    if (props.testResult && props.testResult.pokemon) {
      const fetchPokemonData = async () => {
        try {
          const pokemonData = await getPokemonDetails(props.testResult.pokemon.toLowerCase());
          setPokemon(pokemonData);

          const speciesData = await getPokemonSpecies(props.testResult.pokemon.toLowerCase());
          setSpecies(speciesData);
        } catch (error) {
          console.error("Error fetching Pokémon data:", error);
        }
      };

      fetchPokemonData();
    }
  }, [props.testResult]);

  return (
    <div>
      <Banner text="Your Pokemon is here!" />
      <div className="columnContainer_1">
        {pokemon && species ? (
          <>
            <Image
            borderRadius='full'
            boxSize='200px'
            src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
            alt={pokemon.name}
            />
            <div className="textBox">
              <div className="introText">
                <p className="pokemonName">{pokemon.name.toUpperCase()}</p>
                <p>Reason: {props.testResult.reason}</p>
                <p>Height: {pokemon.height * 10} cm</p>
                <p>Weight: {pokemon.weight / 10} kg</p>
                <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
                <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
                <p>Fact: {species.flavor_text_entries.find((entry) => entry.language.name === "en").flavor_text}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading Pokémon details...</p>
        )}
        <div className="flextRowParent">
          <button className="button_2" onClick={props.handleTryAgain}>
            <img src={Icon1} alt="Try Again" width={58} height={58} />
            <div style={{ fontSize: "2.5vh" }}>Try Again!</div>
          </button>
          <button className="button_2" onClick={props.handleSaveResult}>
            <img src={Icon2} alt="Save My Result" width={58} height={58} />
            <div style={{ fontSize: "2.5vh" }}>Save My Result!</div>
          </button>
        </div>
        <div className="flextRowParent">
          <button className="button_2" onClick={props.handleShare}>
            <img src={Icon3} alt="Share" width={58} height={58} />
            <div style={{ fontSize: "2.5vh" }}>Share to FaceBook</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestResultsView;
