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

const buildPlanet = (planets) => {
  var buildPlanets = []
  planets.forEach(planet => {
    const stringUrl = planet.split('http').join('https')
    swapi.get(stringUrl)
      .then(response => {
        buildPlanets.push(setPlanet(response))
      })
      .catch(error => {
        console.log(error)
      })
  });
  if (buildPlanets.length > 0) {
    return buildPlanets
  }
}

swapi.get('https://swapi.dev/api/films')
  .then((response) => {
    if (response.results.length > 0) {
      var movies = []
      Object.values(response.results).map(movie => {
        let buildMovie = {
          name: movie.title,
          planets: buildPlanet(movie.planets)
        }
        console.log(buildMovie)
        // movies.push(buildMovie)
      })
    }
  });