const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();

async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/EWX/155,91/forecast");
  const weatherData = await weatherPromise.json();
  const ourTemperature = weatherData.properties.periods[0].temperature;

  console.log(ourTemperature);

  document.querySelector("#currentTemperature").textContent = ourTemperature;
}

start();

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
  const petsData = await petsPromise.json();

  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".pet-card").dataset.species = pet.species

    clone.querySelector(".pet-name").textContent = pet.name;
    clone.querySelector(".pet-description").textContent = pet.description;
    clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear);

    if (!pet.photo) pet.photo = "images/Fallback.jpg"

    clone.querySelector(".pet-card-photo img").src = pet.photo;
    clone.querySelector(".pet-card-photo img").alt = `${pet.species} name ${pet.name}`;

    wrapper.appendChild(clone)
  })

  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea();

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age == 1) return "1 year old";
  if (age < 1) return "less than a year old"

  return `${age} years old`
}

// pet filter button code 
const allFilterButton = document.querySelectorAll(".pet-filter button");

allFilterButton.forEach(el => {
  el.addEventListener("click", handleButtonClick)
})

function handleButtonClick(e) {
  // remove active class from any and all button
  allFilterButton.forEach(el => el.classList.remove("active"));

  // add active class to the specific button that just got clicked
  e.target.classList.add("active");

  // actually filter the pets down below
  const currentFilter = e.target.dataset.filter
  document.querySelectorAll(".pet-card").forEach(el => {
    if (currentFilter == el.dataset.species || currentFilter == "all") {
      el.style.display = "grid"
    } else {
      el.style.display = "none"
    }
  })
}