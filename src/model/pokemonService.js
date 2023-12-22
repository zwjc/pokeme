import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/';

const getPokemons = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}pokemon?limit=${limit}&offset=${offset}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    return [];
  }
};

const getPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`${API_URL}pokemon/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    return null;
  }
};

const getPokemonSpecies = async (name) => {
  try {
    const response = await axios.get(`${API_URL}pokemon-species/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching species for ${name}:`, error);
    return null;
  }
};

export { getPokemons, getPokemonDetails, getPokemonSpecies };
