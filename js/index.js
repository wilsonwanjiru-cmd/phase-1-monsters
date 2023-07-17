// Code for the solution
const URL_PREFIX = 'http://localhost:3000/';
let page = 1;

const getMonsters = (page) => {
  fetch(`${URL_PREFIX}monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
      document.querySelector('#monster-container').innerHTML = '';
      monsters.forEach(monster => {
        createMonsterCard(monster);
      });
    });
};

const createMonsterCard = (monster) => {
  let div = document.createElement('div');
  let nameHeader = document.createElement('h2');
  let ageHeader = document.createElement('h4');
  let descriptionPara = document.createElement('p');

  nameHeader.innerHTML = monster.name;
  ageHeader.innerHTML = `Age: ${monster.age}`;
  descriptionPara.innerHTML = `Bio: ${monster.description}`;

  div.appendChild(nameHeader);
  div.appendChild(ageHeader);
  div.appendChild(descriptionPara);

  document.querySelector('#monster-container').appendChild(div);
};

const createMonsterForm = () => {
  const form = document.createElement('form');
  const nameInput = document.createElement('input');
  const ageInput = document.createElement('input');
  const descriptionInput = document.createElement('input');
  const createButton = document.createElement('button');

  form.id = 'monster-form';
  nameInput.id = 'name';
  ageInput.id = 'age';
  descriptionInput.id = 'description';
  nameInput.placeholder = 'name...';
  ageInput.placeholder = 'age...';
  descriptionInput.placeholder = 'description...';
  createButton.innerHTML = 'Create';

  form.appendChild(nameInput);
  form.appendChild(ageInput);
  form.appendChild(descriptionInput);
  form.appendChild(createButton);

  document.getElementById('create-monster').appendChild(form);
  addSubmitEventListener();
};

const addSubmitEventListener = () => {
  document.querySelector('#monster-form').addEventListener('submit', event => {
    event.preventDefault();
    postNewMonster(getFormData());
    clearForm();
  });
};

const getFormData = () => {
  let nameInput = document.querySelector('#name');
  let ageInput = document.querySelector('#age');
  let descriptionInput = document.querySelector('#description');

  return {
    name: nameInput.value,
    age: parseFloat(ageInput.value),
    description: descriptionInput.value
  };
};

const postNewMonster = (monsterData) => {
  let url = `${URL_PREFIX}monsters`;
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(monsterData)
  };

  fetch(url, options)
    .then(response => response.json())
    .then(newMonster => {
      // Update the DOM with the newly created monster
      createMonsterCard(newMonster);
    });
};

const clearForm = () => {
  document.querySelector('#monster-form').reset();
};

const addNavListeners = () => {
  let backButton = document.querySelector('#back');
  let forwardButton = document.querySelector('#forward');

  backButton.addEventListener('click', () => {
    pageDown();
  });

  forwardButton.addEventListener('click', () => {
    pageUp();
  });
};

const pageUp = () => {
  page++;
  getMonsters(page);
};

const pageDown = () => {
  if (page > 1) {
    page--;
    getMonsters(page);
  } else {
    alert("Ain't no monsters here");
  }
};

const init = () => {
  getMonsters(page);
  createMonsterForm();
  addNavListeners();
};

document.addEventListener('DOMContentLoaded', init);

// Execute the solution
init();
