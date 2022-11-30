"use strict";

const wrapper = document.querySelector(".pokemonWrapper");
const footer = document.querySelector(".footer");

const fetchPokemonData = async () => {
  return await fetch(
    "https://api.pokemontcg.io/v2/cards?" +
      new URLSearchParams({
        pageSize: 50,
      })
  )
    .then((response) => response.json())
    .then((data) => generateCards(data));
};

const generateSingleCard = (singleCardData) => {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("src", singleCardData.images.small);
  cardImage.setAttribute("alt", singleCardData.name);
  cardImage.setAttribute("onerror", "this.style='display:none;'");
  wrapper.appendChild(cardImage);
};

const generateStrongestInfo = (data) => {
  let resString = "";
  data.forEach((e, i) => {
    resString +=
      i === data.length - 1
        ? `and ${e.name} with ${e.hp} hit points`
        : `${e.name} with ${e.hp} hit points, `;
  });
  footer.textContent = `Strongest Pokemons are: ${resString}`;
};

function generateCards(data) {
  //   data.data.forEach((el) => {
  //     console.log(el);
  //     generateSingleCard(el);
  //   });

  const strongPokemonsOnly = data.data.filter((el) => parseInt(el.hp) > 100);

  // SORT:
  strongPokemonsOnly.sort((a, b) => parseInt(a.hp) - parseInt(b.hp));

  // FILTER:
  strongPokemonsOnly.forEach((el) => {
    console.log(el);
    generateSingleCard(el);
  });

  // REDUCE:
  const newDataObjects = strongPokemonsOnly.reduce((acc, val) => {
    if (val.hp > 200) {
      const { name, types, hp } = val;
      acc.push({ name, types, hp });
    }
    return acc;
  }, []);

  generateStrongestInfo(newDataObjects);
}

// fetchPokemonData();

/* OOP vs FP */

//OOP:
class Note {
  #title;
  #data;

  constructor(title, data) {
    this.#title = title;
    this.#data = data;
  }

  set data(data) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }

  get title() {
    return this.#title;
  }

  getNoteLength() {
    return this.#data.length;
  }
}

const note1 = new Note("Notatka", "Tu jest ważny text");
const note2 = new Note("Notatka2", "Tu jest super ważny text");

console.log(note1.getNoteLength());
console.log(note2.getNoteLength());

//FP:

const note1Data = {
  title: "Notatka",
  data: "Tu jest ważny text",
};

const note2Data = {
  title: "Notatka2",
  data: "Tu jest super ważny text",
};

function getNoteLength(note) {
  return note.data.length;
}

console.log(getNoteLength(note1Data));
console.log(getNoteLength(note2Data));

// Use OOP if you’re going to create more than one or two of an item that has some shared properties.

// If many objects are based on one class - changes affect all of them. In FP you combine whatever methods are needed.
// It's called composition vs inheritance
// Check: https://www.youtube.com/watch?v=wfMtDGfHWpA&ab_channel=FunFunFunction

// Immutable objects in FP:
console.log(Object.getOwnPropertyDescriptors(note1Data));
// writable: false - cannot change its value
// configurable: false - read-only

note2Data.title = "Ważna notatka";
console.log(note2Data);

//Object.freeze
Object.freeze(note1Data);

//Check if object is frozen:
console.log(Object.isFrozen(note1Data));

//note1Data.title = "Altered title"; //TypeError !
//note1Data.author = "JKRowling"; // TypeError !
console.log(note1Data);

//Object.seal - modification is possible, but not adding and/or removing
Object.seal(note2Data);

// check if sealed:
console.log(Object.isSealed("sealed? ", note2Data));

note2Data.title = "Notatka ze zmienionym tytułem";
console.log(note2Data);

// note2Data.author = "JKRowling"; // TypeError
