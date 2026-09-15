//DARK / LIGHT MODE code is in theme.js, which is loaded on every page

// SOUND ON / OFF
const soundToggle = document.getElementById("sound-toggle");

// Sound files are stored in assets/audio/
const playerWinSound = new Audio("assets/audio/player-win.mp3");
const computerWinSound = new Audio("assets/audio/computer-win.mp3");
const drawSound = new Audio("assets/audio/draw.mp3");
const matchWinSound = new Audio("assets/audio/match-win.mp3");

let soundEnabled = true;

// Update the button text
function updateSoundButton() {
  if (soundEnabled) {
    soundToggle.textContent = "🔊 Sound On";
    soundToggle.setAttribute("aria-label", "Mute sound effects");
  } else {
    soundToggle.textContent = "🔇 Sound Off";
    soundToggle.setAttribute("aria-label", "Enable sound effects");
  }
}

// Turn sound on/off
function toggleSound() {
  soundEnabled = !soundEnabled;

  // Remember the setting
  localStorage.setItem("rps-sound", soundEnabled);

  updateSoundButton();
}

// Load saved setting
function loadSoundSetting() {
  const savedSound = localStorage.getItem("rps-sound");

  if (savedSound !== null) {
    soundEnabled = savedSound === "true";
  }

  updateSoundButton();
}

// Button click
if (soundToggle) {
  soundToggle.addEventListener("click", toggleSound);
}

// Start with saved setting
loadSoundSetting();

// PLAY SOUND
function playSound(sound) {
  if (!soundEnabled) {
    return;
  }

  sound.currentTime = 0;

  sound.play().catch(() => {
    console.log("Audio is unavailable.");
  });
}

//Game Logic below

//Retrieve the score from local storage if its available if not it sets the score to zero
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

//Query selecting the buttons so i can use them to make the game run
const rockButton = document.getElementById("rock-button");
const paperButton = document.getElementById("paper-button");
const scissorsButton = document.getElementById("scissors-button");
const fireButton = document.getElementById("fire-button");
const dragonButton = document.getElementById("dragon-button");
const resetButton = document.getElementById("reset-button");
const matchLength = document.getElementById("match-length");
const matchStatus = document.getElementById("match-status");
const abilitiesStatus = document.getElementById("abilities-status");

//Keeps ability unlocks after the page is refreshed
let unlockedAbilities = JSON.parse(
  localStorage.getItem("rps-unlocked-abilities"),
) || {
  fire: false,
  dragon: false,
};
//Dragon beats everything but can only used once during the current match
let dragonUsed = false;
let matchComplete = false;

//Gives the game two different options best of 5 means the first player to reach 3 wins and the best of 9 requires 5
//Also stores the chosen gamemode so the selected option stays even on page refresh
let matchTarget = Number(localStorage.getItem("rps-match-target")) || 3;
matchLength.value = matchTarget === 5 ? "9" : "5";
matchComplete = score.wins >= matchTarget || score.losses >= matchTarget;

//Query selecting the result display so i can change it when the game starts
const resultDisplay = document.getElementById("round-result");
const playerDisplay = document.getElementById("player-choice");
const computerDisplay = document.getElementById("computer-choice");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const tiesScore = document.getElementById("ties-score");

//Display the scores by default so it shows previously saved scores if there is one
displayScore();
updateMatchStatus();
updateAbilityButtons();

matchLength.addEventListener("change", () => {
  //This event listener changes the number of wins need to finish the game based on the option chosen
  matchTarget = matchLength.value === "9" ? 5 : 3;
  localStorage.setItem("rps-match-target", matchTarget);

  //Picking a different game mode resets the score
  resetScore();
});

//Added event listener on the move buttons so when clicked it picks the corresponding move.
//I used arrow functions because its easier to read than regular functions when inside another function
rockButton.addEventListener("click", () => {
  playerMove("Rock");
});
paperButton.addEventListener("click", () => {
  playerMove("Paper");
});
scissorsButton.addEventListener("click", () => {
  playerMove("Scissors");
});
fireButton.addEventListener("click", () => {
  playerMove("Fire");
});
dragonButton.addEventListener("click", () => {
  playerMove("Dragon");
});

//The following function picks a random number between 0-1 and gives the computer a coressponding move
//I use return here so i dont have to write else if and else making the code shorter
function computersMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) return "Rock";
  if (randomNumber < 2 / 3) return "Paper";
  return "Scissors";
}

//This functions lets the player pick which move they want and compares it to the computers move to determine the result
function playerMove(playerPick) {
  //Ignores locked abilities, used Dragon move, and moves made after the match ends
  if (
    matchComplete ||
    (playerPick === "Fire" && !unlockedAbilities.fire) ||
    (playerPick === "Dragon" && (!unlockedAbilities.dragon || dragonUsed))
  ) {
    return;
  }

  //Marks Dragon as used before finishing the round so it cannot be picked again
  if (playerPick === "Dragon") {
    dragonUsed = true;
  }

  const computerPick = computersMove();
  let result = "";

  if (playerPick === computerPick) {
    result = "You, tie";
    playSound(drawSound);
    score.ties++;
  } else if (beats(playerPick, computerPick)) {
    result = "You, win!";
    playSound(playerWinSound);
    score.wins++;
  } else {
    result = "You, lose";
    playSound(computerWinSound);
    score.losses++;
  }

  displayScore();
  displayResult(playerPick, computerPick, result);
  updateMatchStatus();

  if (score.wins === matchTarget || score.losses === matchTarget) {
    const playerWon = score.wins === matchTarget;
    matchComplete = true;

    //A best of 5 win unlocks Fire, a best of 9 win unlocks Dragon permanently across sessions
    if (playerWon && matchTarget === 3) {
      unlockedAbilities.fire = true;
    }
    if (playerWon && matchTarget === 5) {
      unlockedAbilities.dragon = true;
    }
    saveUnlockedAbilities();

    displayResult(
      playerPick,
      computerPick,
      playerWon ? "You win the match!" : "Computer wins the match!",
    );
    playSound(matchWinSound);

    //This stops another round from starting after the match is complete
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
  }
  updateAbilityButtons();
  console.log(result);
}

function beats(playerPick, computerPick) {
  //Each move lists the computer moves that it defeats
  const winningMoves = {
    Rock: ["Scissors"],
    Paper: ["Rock"],
    Scissors: ["Paper"],
    Fire: ["Paper", "Scissors"],
    Dragon: ["Rock", "Paper", "Scissors"],
  };

  return winningMoves[playerPick]?.includes(computerPick) || false;
}

//This shows what the result was and what pick you and the computer made via string interpolation
function displayResult(playerPick, computerPick, result) {
  resultDisplay.innerHTML = `Result: ${result}`;
  playerDisplay.innerHTML = `You picked: ${playerPick}`;
  computerDisplay.innerHTML = `Computer picked: ${computerPick}`;
}

//This displays the score count in the score section
//also saves the scores in local storage
function displayScore() {
  playerScore.innerHTML = `${score.wins}`;
  computerScore.innerHTML = `${score.losses}`;
  tiesScore.innerHTML = `${score.ties}`;

  localStorage.setItem("score", JSON.stringify(score));
}

function updateMatchStatus() {
  //Ties do not count toward the gamemode target so only wins or losses end a match
  const winner = score.wins >= matchTarget || score.losses >= matchTarget;

  if (winner) {
    matchStatus.innerHTML = `Match complete: first to ${matchTarget} wins.`;
    return;
  }

  matchStatus.innerHTML = `First to ${matchTarget} wins the match.`;
}

function saveUnlockedAbilities() {
  //Store unlocks separately from the current match score
  localStorage.setItem(
    "rps-unlocked-abilities",
    JSON.stringify(unlockedAbilities),
  );
}

function updateAbilityButtons() {
  //Keep button availability and the player-facing unlock message in sync
  const fireUnlocked = unlockedAbilities.fire;
  const dragonUnlocked = unlockedAbilities.dragon;

  fireButton.disabled = !fireUnlocked || matchComplete;
  dragonButton.disabled = !dragonUnlocked || dragonUsed || matchComplete;
  fireButton.innerHTML = fireUnlocked ? "Fire" : "Fire <span>(locked)</span>";
  dragonButton.innerHTML = dragonUnlocked
    ? dragonUsed
      ? "Dragon <span>(used)</span>"
      : "Dragon"
    : "Dragon <span>(locked)</span>";

  const unlocked = [];
  if (fireUnlocked) unlocked.push("Fire");
  if (dragonUnlocked) unlocked.push("Dragon");
  abilitiesStatus.innerHTML = unlocked.length
    ? `${unlocked.join(" and ")} unlocked. Dragon can be used once per match.`
    : "Win Best of 5 to unlock Fire. Win Best of 9 to unlock Dragon.";
}
//Added event listener on the reset button so when clicked it resets the score
resetButton.addEventListener("click", () => {
  resetScore();
});

//Resets the scores and clears the result and picks displayed
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  //Reset match-only state while keeping permanently unlocked abilities
  dragonUsed = false;
  matchComplete = false;
  displayScore();
  resultDisplay.innerHTML = "Make a choice to begin.";
  matchStatus.innerHTML = `First to ${matchTarget} wins the match.`;
  playerDisplay.innerHTML = "Your choice: Not selected";
  computerDisplay.innerHTML = "Computer choice: Not selected";
  rockButton.disabled = false;
  paperButton.disabled = false;
  scissorsButton.disabled = false;
  updateAbilityButtons();
}
