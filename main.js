async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/EWX/155,91/forecast");
  const weatherData = await weatherPromise.json();
  const ourTemperature = weatherData.properties.periods[0].temperature

  console.log(ourTemperature);

  document.querySelector("#currentTemperature").textContent = ourTemperature;
}

start();

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()

  petsData.forEach((pet) => {
    console.log(pet.name)
  })
}

petsArea();