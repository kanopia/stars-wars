const swapi = require('swapi-node');

const cachePlanets = []
const cachePeoples = []

const setPlanet = (data) => {
  return {
    name: data.name,
    terrain: data.terrain,
    gravity: data.gravity,
    diameter: data.diameter,
    population: data.population
  }
}

const setPeople = (data) => {
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
    passengers: data.passengers,
    length: data.length
  }
}

const buildPlanet = async (planets) => {
  let fillPlanets = []
  await Promise.all(
    planets.map(async planet => {
      const stringUrl = planet.split('http').join('https')
      if (typeof cachePlanets[stringUrl] === 'undefined') {
        cachePlanets[stringUrl] = await swapi.get(stringUrl)
      }
      fillPlanets.push(setPlanet(cachePlanets[stringUrl]))
    })
  )
  return fillPlanets
}

const buildPeople = async (peoples) => {
  let fillPeople = []
  await Promise.all(
    peoples.map(async people => {
      const stringUrl = people.split('http').join('https')
      if (typeof cachePeoples[stringUrl] === 'undefined') {
        cachePeoples[stringUrl] = await swapi.get(stringUrl)
      }
      fillPeople.push(setPeople(cachePeoples[stringUrl]))
    })
  )
  return fillPeople
}

const processMovies = () => {
  swapi.get('https://swapi.dev/api/films')
    .then(response => {
      if (response.results.length > 0) {
        const movies = []
        Object.values(response.results).map(async movie => {
          let buildMovie = {
            name: movie.title,
            planets: await buildPlanet(movie.planets),
            people: await buildPeople(movie.characters)
          }
          console.log('---------------------------')
          console.log(buildMovie)
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const biggerShip = () => {
  let superShip = null
  swapi.get('https://swapi.dev/api/vehicles')
    .then(response => {
      response.results.sort(function(shipA, shipB) {
        if (!superShip) {
          superShip = shipA
        }
        if (parseInt(superShip.length) > parseInt(shipB.length)) {
          superShip = superShip;
        } else {
          superShip = shipB;
        }
      })
      console.log('--------------------------------------')
      console.log('Nave mas grande!')
      console.log(setStarship(superShip))
    })
    .catch(error => {
      console.log(error)
    })
}

processMovies()
biggerShip()