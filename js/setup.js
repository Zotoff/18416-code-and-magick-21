"use strict";

const setupElement = document.querySelector(`.setup`);
const wizardTemplateElement = document.querySelector(`#similar-wizard-template`).content;
const similarListElement = document.querySelector(`.setup-similar-list`);
const setupSimilarElement = document.querySelector(`.setup-similar`);
const FRAGMENT = document.createDocumentFragment();

const generateRandomValue = (array) => {
  for (let i = 0; i < array.length; i++) {
    let getRandomArbitrary = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
    i = getRandomArbitrary(i, array.length);
    return array[i];
  }
};

const generateWizardFromObject = (wizard) => {
  const wizardTemplate = wizardTemplateElement.cloneNode(true);

  wizardTemplate.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardTemplate.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardTemplate.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardTemplate;
};

const fillDomWithBlocks = (data) => {
  for (let i = 0; i < data.length; i++) {
    FRAGMENT.appendChild(generateWizardFromObject(data[i]));
  }
};

const wizards = [];

const names = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const lastNames = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const coatColors = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const eyesColors = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

// Generate random values, generate object and push to wizard array

for (let i = 0; i < 4; i++) {
  const randomName = generateRandomValue(names);
  const randomLastName = generateRandomValue(lastNames);
  const randomColor = generateRandomValue(coatColors);
  const randomEyesColor = generateRandomValue(eyesColors);
  const fullName = randomName + ` ` + randomLastName;

  const wizard = {};

  wizard.name = fullName;
  wizard.coatColor = randomColor;
  wizard.eyesColor = randomEyesColor;
  wizards.push(wizard);
}

// Fill DOM with blocks
fillDomWithBlocks(wizards);

// Append the childs to fragments;
similarListElement.appendChild(FRAGMENT);

// Remove the hidden classes
setupElement.classList.remove(`hidden`);
setupSimilarElement.classList.remove(`hidden`);

