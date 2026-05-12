const passwordContent = document.getElementById("passwordContent");
const copyButton = document.getElementById("copyButton");
const characterLength = document.getElementById("characterLength");
const rangeInput = document.getElementById("rangeInput");
const upperInput = document.getElementById("upperInput");
const lowerInput = document.getElementById("lowerInput");
const numberInput = document.getElementById("numberInput");
const symbolInput = document.getElementById("symbolInput");
const generateButton = document.getElementById("generateButton");

function mixerArray(arr) {
  let newArr = [];
  let randomIndexList = [];
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    if (!randomIndexList.includes(randomIndex)) {
      randomIndexList.push(randomIndex);
    } else {
      let tempIndex = randomIndex;
      while (randomIndexList.includes(tempIndex)) {
        tempIndex = Math.floor(Math.random() * arr.length);
      }
      randomIndexList.push(tempIndex);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[randomIndexList[i]]);
  }

  newArr = newArr.join("");
  passwordContent.innerText = newArr;
}

const symbols = [
  " ",
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
];
let passwordLength = 0;
let password = [];
let checkedLength = 0;
let generatorObject = {
  numbers: () => {
    for (
      let i = Math.floor(Number(passwordLength) / checkedLength);
      i > 0;
      i--
    ) {
      password.push(Math.floor(Math.random() * 9 + 1));
    }
  },

  uppers: () => {
    for (
      let i = Math.floor(Number(passwordLength) / checkedLength);
      i > 0;
      i--
    ) {
      let temp = Math.floor(Math.random() * 25);
      temp += 65;
      password.push(String.fromCharCode(temp));
    }
  },
  lowers: () => {
    for (
      let i = Math.floor(Number(passwordLength) / checkedLength);
      i > 0;
      i--
    ) {
      let temp = Math.floor(Math.random() * 25);
      temp += 97;
      password.push(String.fromCharCode(temp));
    }
  },

  symbols: () => {
    for (
      let i = Math.floor(Number(passwordLength) / checkedLength);
      i > 0;
      i--
    ) {
      password.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
  },
};

generateButton.addEventListener("click", (evt) => {
  passwordLength = rangeInput.value;

  if (numberInput.checked) {
    checkedLength += 1;
  }
  if (lowerInput.checked) {
    checkedLength += 1;
  }
  if (upperInput.checked) {
    checkedLength += 1;
  }
  if (symbolInput.checked) {
    checkedLength += 1;
  }

  if (numberInput.checked) {
    generatorObject["numbers"]();
  }
  if (upperInput.checked) {
    generatorObject["uppers"]();
  }
  if (upperInput.checked) {
    generatorObject["lowers"]();
  }
  if (symbolInput.checked) {
    generatorObject["symbols"]();
  }

  mixerArray(password);
});
