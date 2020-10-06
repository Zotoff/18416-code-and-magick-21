"use strict";

const setupElement = document.querySelector(`.setup`);
const wizardTemplateElement = document.querySelector(`#similar-wizard-template`).content;
const similarListElement = document.querySelector(`.setup-similar-list`);
const setupSimilarElement = document.querySelector(`.setup-similar`);
const setupOpenElement = document.querySelector(`.setup-open`);
const setupOpenIcon = setupOpenElement.querySelector(`.setup-open-icon`);
const setupCloseElement = setupElement.querySelector(`.setup-close`);
const setupSubmitForm = document.forms[0];
const setupSubmitElement = setupSubmitForm.querySelector(`.setup-submit`);
const setupWizardNameInput = document.querySelector(`.setup-user-name`);
const setupWizardCoat = document.querySelector(`.setup-wizard .wizard-coat`);
const setupWizardEye = document.querySelector(`.setup-wizard .wizard-eyes`);
const setupWizardFireball = document.querySelector(`.setup-fireball-wrap`);
const FRAGMENT = document.createDocumentFragment();
const MAX_WIZARDS = 4;

const WIZARD_NAME_MAX = 25;
const WIZARD_NAME_MIN = 2;

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

const fireballColors = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

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

const checkFormValidation = (form) => {
  if (form.reportValidity()) {
    submitForm();
  } else {
    return false;
  }
};

const submitForm = () => {
  setupSubmitForm.submit();
};

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupEnterPress = (evt, handler) => {
  if (evt.key === `Enter`) {
    handler();
  }
};

const openPopup = () => {
  setupElement.classList.remove(`hidden`);
  setupSubmitElement.addEventListener(`keydown`, onPopupEnterPress(`keydown`, checkFormValidation(submitForm)));
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  setupElement.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress(`keydown`, checkFormValidation(submitForm)));
  setupSubmitElement.removeEventListener(`keydown`, onPopupEnterPress(`keydown`, submitForm));
};


// Generate random values, generate object and push to wizard array

for (let i = 0; i < MAX_WIZARDS; i++) {
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
setupSimilarElement.classList.remove(`hidden`);

// Open Setup Window
setupOpenElement.addEventListener(`click`, () => {
  openPopup();
});

setupOpenIcon.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

// Close the setup window
setupCloseElement.addEventListener(`click`, () => {
  closePopup();
});

setupCloseElement.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

// Handle wizard name input
setupWizardNameInput.addEventListener(`input`, () => {

  let inputValueLength = setupWizardNameInput.value.length;

  if (inputValueLength < WIZARD_NAME_MIN) {
    setupWizardNameInput.setCustomValidity(`Ещё ` + (WIZARD_NAME_MAX - inputValueLength) + ` симв.`);
  } else if (inputValueLength > WIZARD_NAME_MAX) {
    setupWizardNameInput.setCustomValidity(`Имя не должно превышать 25 символов`);
  } else {
    setupWizardNameInput.setCustomValidity(``);
  }
});

// Change coat color
setupWizardCoat.addEventListener(`click`, (e) => {
  e.preventDefault();
  const coatColor = generateRandomValue(coatColors);
  setupWizardCoat.style.fill = coatColor;

  const coatColorInputElement = document.querySelector(`input[name=coat-color]`);
  coatColorInputElement.value = coatColor;
});

// Change wizard eye color
setupWizardEye.addEventListener(`click`, (e) => {
  e.preventDefault();
  const eyesColor = generateRandomValue(eyesColors);
  setupWizardEye.style.fill = eyesColor;

  const eyesColorInputElement = document.querySelector(`input[name=eyes-color]`);
  eyesColorInputElement.value = eyesColor;
});

// Change wizard fireball color
setupWizardFireball.addEventListener(`click`, (e) => {
  e.preventDefault();
  const fireballColor = generateRandomValue(fireballColors);
  setupWizardFireball.style.backgroundColor = fireballColor;

  const fireballColorInputElement = document.querySelector(`input[name=fireball-color]`);
  fireballColorInputElement.value = fireballColor;
});

// Click on submit btn
setupSubmitElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  checkFormValidation(setupSubmitForm);
});
