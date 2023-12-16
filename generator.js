function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function passwordGenerator({
  addNumbers,
  addSpecial,
  length,
  addUpperCase,
  addLowerCase,
}) {
  const abcUper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const abcLower = abcUper.map((c) => c.toLocaleLowerCase());
  const numbers = "0123456789".split("");
  const specialChars = "!@#$%&*()+_?/{}[]<>".split("");

  const constraints = Object.entries({
    addNumbers,
    addSpecial,
    addLowerCase,
    addUpperCase,
  }).filter((cons) => cons[1] === true);

  if (!constraints.length) return "";

  const amountOfCharsForEachConstraint =
    Math.floor(length / constraints.length) <= 0
      ? length
      : Math.floor(length / constraints.length);

  const result = [];

  const addChars = (charArray) => {
    const resultArray = shuffle(charArray);

    const pushNewChars = (charArray) => {
      const shuffled = shuffle(charArray);

      resultArray.push(...shuffled.slice(0, amountOfCharsForEachConstraint));
    };

    if (addNumbers) pushNewChars(numbers);

    if (addSpecial) pushNewChars(specialChars);

    if (addUpperCase) pushNewChars(abcUper);

    if (addLowerCase) pushNewChars(abcLower);

    if (resultArray.length < length) addChars(resultArray);

    if (resultArray.length >= length) return resultArray.slice(0, length);

    return resultArray;
  };

  const charsArray = addChars(result);

  const shuffledFinalArray = shuffle(charsArray);

  return shuffledFinalArray.join("");
}

const passwordInput = document.getElementById("passwordInput");
const generateButton = document.getElementById("generateBtn");
const copyButton = document.getElementById("copyBtn");
const lengthValueSpan = document.getElementById("lengthValue");

// inputs
const specialCharsInput = document.getElementById("special");
const upperCaseInput = document.getElementById("upperCase");
const lowerCaseInput = document.getElementById("lowerCase");
const numbersInput = document.getElementById("numbers");
const rangeInput = document.getElementById("range");

// variables

let hasSpecialChars = specialCharsInput.checked;
let hasUpperCase = upperCaseInput.checked;
let hasLowerCase = lowerCaseInput.checked;
let hasNumbers = numbersInput.checked;
let length = rangeInput.value;

const generateNewPassword = () => {
  passwordInput.value = passwordGenerator({
    addLowerCase: hasLowerCase,
    addNumbers: hasNumbers,
    addSpecial: hasSpecialChars,
    addUpperCase: hasUpperCase,
    length,
  });
};

// Event Listeners
specialCharsInput.addEventListener("click", () => {
  hasSpecialChars = !hasSpecialChars;
  generateNewPassword();
});

upperCaseInput.addEventListener("click", () => {
  hasUpperCase = !hasUpperCase;
  generateNewPassword();
});

lowerCaseInput.addEventListener("click", () => {
  hasLowerCase = !hasLowerCase;
  generateNewPassword();
});

numbersInput.addEventListener("click", () => {
  hasNumbers = !hasNumbers;
  generateNewPassword();
});

rangeInput.addEventListener("input", (e) => {
  length = e.target.value;
  lengthValueSpan.innerHTML = e.target.value;
  generateNewPassword();
});

generateButton.addEventListener("click", () => {
  generateNewPassword();
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
});

window.addEventListener("load", () => {
  generateNewPassword();
});
