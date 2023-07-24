const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const startContainer = document.getElementById("startContainer");
const startButton = document.getElementById("startButton");
const gameContainer = document.getElementById("game-container");
const resultContainer = document.getElementById("result-container");

// Options values for buttons
let options = {
  continent: ["Europa", "Asia", "Oceania", "America", "Africa"],
  countries: ["Japon", "France", "Canada", "Senegal", "Australia"],
  cities: ["Amsterdam", "Berlin", "Barcelona", "Madrid", "New York"],
};

// count
let winCount = 0;
let count = 0;

let chosenWord = "";

// Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Do you know the world?</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

// Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  // Disable all options buttons
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  // Disable all letters buttons
  letterButtons.forEach((button) => {
    button.disabled = true;
  });

  resultText.style.display = "block";
  newGameButton.style.display = "block";

  gameContainer.style.display = "none";

  // Show the "new-game-container" to display the result
  newGameContainer.classList.remove("hide");
  resultContainer.style.display = "block"; // Mostrar el resultContainer
  // Hide the "game-container" to hide the game content
};

// Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  // If optionValue matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  // Initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  // Choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  // Replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  // Display each element as span
  userInputSection.innerHTML = displayItem;
};

// Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;
  chosenWord = "";

  // Initially erase all content and hide letters and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  resultText.style.display = "none";
  newGameButton.style.display = "none";

  // For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    // Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    // Character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      // If array contains clicked value, replace the matched dash with the letter; otherwise, draw on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          // If character in array is the same as the clicked button
          if (char === button.innerText) {
            // Replace dash with letter
            dashes[index].innerText = char;
            // Increment counter
            winCount += 1;
            // If winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              // Block all buttons
              blocker();
            }
          }
        });
      } else {
        // Lose count
        count += 1;
        // For drawing the man
        drawMan(count);
        // Count==6 because head, body, left arm, right arm, left leg, right leg
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Sorry You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      // Disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  
  // Show the "game-container" to start a new game
  gameContainer.classList.remove("hide");

  // Call to canvasCreator (for clearing the previous canvas and creating the initial canvas)
  let { initialDrawing } = canvasCreator();
  // initialDrawing would draw the frame
  initialDrawing();

  newGameButton.style.display = "block";
};



// Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  // For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  const initialDrawing = () => {
   
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    drawLine(10, 130, 130, 130);
   
    drawLine(10, 10, 10, 131);
   
    drawLine(10, 10, 70, 10);
    
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// Draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

newGameButton.addEventListener("click", () => {
  event.preventDefault(); // Prevent form submission
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter a valid username!");
    return;
  }

  startContainer.style.display = "none"; 
  gameContainer.style.display = "block"; 
  initializer();

  gameContainer.style.display = "block";
  resultContainer.style.display = "none";

});


startButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter a valid username!");
    return;
  }

  startContainer.style.display = "none"; 
  gameContainer.style.display = "block"; 
  initializer();
});

window.onload = () => {
  // Show the "startContainer" and hide the "gameContainer" and "resultContainer" on page load
  startContainer.style.display = "block";
  gameContainer.style.display = "none";
  resultContainer.style.display = "none";
};