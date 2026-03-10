const generateBtn = document.getElementById('generateBtn');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const searchBox = document.getElementById('searchBox');
const typeDropdown = document.getElementById('typeDropdown');
const traitDropdown = document.getElementById('traitDropdown');
const container = document.getElementById('characterContainer');


generateBtn.addEventListener('click', async () => {
  const response = await fetch('/api/characters/random', {
    method: 'POST'
  });
  const character = await response.json();

  // add new character to the top
  container.prepend(createCharacterCard(character));
});

searchBtn.addEventListener('click', async () => {
  const text = searchBox.value;
  const response = await fetch(`/api/characters?search=${text}`);
  const characters = await response.json();

  renderCharacters(characters);
});

clearBtn.addEventListener('click', async () => {
  const response = await fetch(`/api/characters`);
  const characters = await response.json();
  searchBox.value = "";
  renderCharacters(characters);
});

typeDropdown.addEventListener('click', async () => {
  const charType = typeDropdown.value;
  // alert(charType);
  const response = await fetch(`/api/characters?type=${charType}`);
  const characters = await response.json();
  searchBox.value = "";
  renderCharacters(characters);
});

traitDropdown.addEventListener('click', async () => {
  const charTrait = traitDropdown.value;
  // alert(charType);
  const response = await fetch(`/api/characters?trait=${charTrait}`);
  const characters = await response.json();
  searchBox.value = "";
  renderCharacters(characters);
});

async function loadCharacters() {
  const response = await fetch('/api/characters');
  const characters = await response.json();

  renderCharacters(characters);
}


function renderCharacters(characters) {
  container.innerHTML = '';

  characters.forEach(character => {
    container.appendChild(createCharacterCard(character));
  });
}

function createCharacterCard(character) {
  const div = document.createElement('div');

  div.innerHTML = `
    <h3>${character.name}</h3>
    <p>${character.type} • ${character.trait}</p>
    <hr>
  `;

  return div;
}

loadCharacters();