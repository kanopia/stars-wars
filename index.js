const swapi = require('swapi-node');

const setMovie = (data) => {
  return {
    name: data.title,
    planets: data.planets,
    people: data.characters,
    starships: data.starships
  }
}

const setPlanet = (data) => {
  return {
    name: data.name,
    terrain: data.terrain,
    gravity: data.gravity,
    diameter: data.diameter,
    population: data.population
  }
}

const setPoeple = (data) => {
  return {
    name: data.name,
    gender: data.gender,
    hair_color: data.hair_color,
    skin_color: data.skin_color,
    eye_color: data.eye_color,
    height: data.height,
    homeworld: data.homeworld,
    species: {
      name: data.species.name,
      lenguage: data.species.lenguage,
      average_height: data.species.average_height,
    }
  }
}

const setStarship = (data) => {
  return {
    name: data.name,
    model: data.model,
    manufacturer: data.manufacturer,
    passengers: data.passengers
  }
}

swapi.get('https://swapi.dev/api/films')
  .then((response) => {
    var movies = []
    Object.values(response.results).map(movie => {
      let buildMovie = {
        name: setMovie(movie)
      }
      console.log(buildMovie)
      // movies.push(buildMovie)
    })
  });