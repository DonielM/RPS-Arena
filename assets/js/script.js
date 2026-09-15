//DARK / LIGHT MODE code is in theme.js, which is loaded on every page

// SOUND ON / OFF
const soundToggle = document.getElementById("sound-toggle");

// Sound files are stored in assets/audio/
const playerWinSound = new Audio("assets/audio/player-win.mp3");
const computerWinSound = new Audio("assets/audio/computer-win.mp3");
const drawSound = new Audio("assets/audio/draw.mp3");
const matchWinSound = new Audio("assets/audio/match-win.mp3");
const matchLoseSound = new Audio("assets/audio/match-lose.mp3");

let soundEnabled = true;

// Update the button text
// Update the icon, text and pressed state without removing the spans
function updateSoundButton() {
  if (!soundToggle) {
    return;
  }

  const icon = soundToggle.querySelector(".toggle-icon");
  const text = soundToggle.querySelector(".toggle-text");

  icon.textContent = soundEnabled ? "🔊" : "🔇";
  text.textContent = soundEnabled ? "Sound On" : "Sound Off";

  // Tells screen readers whether sound is currently on
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
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
  //Arena is unlocked after both Fire and Dragon have been unlocked
  arena: false,
};
//Older saved data may not contain Arena, so this checks if arena is unlocked based on the unlocked moves
unlockedAbilities.arena = Boolean(
  unlockedAbilities.arena || (unlockedAbilities.fire && unlockedAbilities.dragon),
);
//Load the saved value so refreshing the page does not make Dragon available again.
let dragonUsed = localStorage.getItem("rps-dragon-used") === "true";
//Store the player's Arena moves so each move remains unavailable after a refresh
let arenaMovesUsed = JSON.parse(
  localStorage.getItem("rps-arena-moves-used"),
) || [];
//Store the computer's Arena special moves so Fire and Dragon can each be used only once
let computerArenaMovesUsed = JSON.parse(
  localStorage.getItem("rps-computer-arena-moves-used"),
) || [];
let matchComplete = false;

//Gives the game two different options best of 5 means the first player to reach 3 wins and the best of 9 requires 5
//Also stores the chosen gamemode so the selected option stays even on page refresh
//Restore Arena only when the player has already unlocked it
const savedMatchMode = localStorage.getItem("rps-match-mode");
if (savedMatchMode === "arena" && !unlockedAbilities.arena) {
  localStorage.removeItem("rps-match-mode");
}
let matchMode =
  savedMatchMode === "arena" && unlockedAbilities.arena ? "arena" : "standard";
let matchTarget = Number(localStorage.getItem("rps-match-target")) || 3;
//Select the saved mode and mark an Arena match complete when all five moves were used
matchLength.value = matchMode === "arena" ? "arena" : matchTarget === 5 ? "9" : "5";
matchComplete =
  score.wins >= matchTarget ||
  score.losses >= matchTarget ||
  (matchMode === "arena" && arenaMovesUsed.length === 5);

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
  //Arena uses the Best of 9 target while keeping the one-use move rule
  matchMode = matchLength.value === "arena" ? "arena" : "standard";
  //This event listener changes the number of wins need to finish the game based on the option chosen
  matchTarget = matchMode === "arena" || matchLength.value === "9" ? 5 : 3;
  localStorage.setItem("rps-match-mode", matchMode);
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
  //Arena adds each unlocked move to the computer's pool until that move has been used
  const availableMoves = ["Rock", "Paper", "Scissors"];

  if (matchMode === "arena") {
    if (!computerArenaMovesUsed.includes("Fire")) {
      availableMoves.push("Fire");
    }
    if (!computerArenaMovesUsed.includes("Dragon")) {
      availableMoves.push("Dragon");
    }
  }

  const computerPick =
    availableMoves[Math.floor(Math.random() * availableMoves.length)];

  //Record a computer unlocked move immediately so it cannot be selected again this match
  if (
    matchMode === "arena" &&
    (computerPick === "Fire" || computerPick === "Dragon")
  ) {
    computerArenaMovesUsed.push(computerPick);
    saveComputerArenaMovesUsed();
  }

  return computerPick;
}

//This functions lets the player pick which move they want and compares it to the computers move to determine the result
function playerMove(playerPick) {
  //Ignores locked abilities, used Dragon move, and moves made after the match ends
  if (
    matchComplete ||
    //Arena prevents the player from selecting any move more than once
    (matchMode === "arena" && arenaMovesUsed.includes(playerPick)) ||
    (playerPick === "Fire" && !unlockedAbilities.fire) ||
    (playerPick === "Dragon" && (!unlockedAbilities.dragon || dragonUsed))
  ) {
    return;
  }

  //Marks Dragon as used before finishing the round so it cannot be picked again
  if (playerPick === "Dragon") {
    dragonUsed = true;
    saveDragonUsed();
  }
  if (matchMode === "arena") {
    //Save the player's Arena move before the round is resolved
    arenaMovesUsed.push(playerPick);
    saveArenaMovesUsed();
  }

  const computerPick = computersMove();
  let result = "";

  if (playerPick === computerPick) {
    result = "It's a tie!";
    playSound(drawSound);
    score.ties++;
  } else if (beats(playerPick, computerPick)) {
    result = "You win!";
    playSound(playerWinSound);
    score.wins++;
  } else {
    result = "You lose!";
    playSound(computerWinSound);
    score.losses++;
  }

  displayScore();
  displayResult(playerPick, computerPick, result);
  updateMatchStatus();

  const arenaComplete =
    matchMode === "arena" && arenaMovesUsed.length === 5;
  //Arena can end when all five player moves are exhausted, even without five wins
  if (score.wins === matchTarget || score.losses === matchTarget || arenaComplete) {
    const playerWon =
      score.wins === matchTarget ||
      (arenaComplete && score.wins > score.losses);
    matchComplete = true;

    //A best of 5 win unlocks Fire, a best of 9 win unlocks Dragon permanently across sessions
    if (playerWon && matchTarget === 3) {
      unlockedAbilities.fire = true;
    }
    if (playerWon && matchTarget === 5 && matchMode === "standard") {
      unlockedAbilities.dragon = true;
    }
    //Arena becomes permanently available once both fire and dragon moves are unlocked
    unlockedAbilities.arena = unlockedAbilities.fire && unlockedAbilities.dragon;
    saveUnlockedAbilities();

    displayResult(
      playerPick,
      computerPick,
      playerWon
        ? "You win the match!"
        : score.wins === score.losses
          ? "The match is a draw!"
          : "Computer wins the match!",
    );

    if (playerWon) {
      playSound(matchWinSound);
    } else if (score.wins === score.losses) {
      playSound(drawSound);
    } else {
      //If the computer wins, play the lose sound again to highlight the match loss
      playSound(matchLoseSound);
    }

    updateMatchStatus();
  }
  updateAbilityButtons();
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
  //Arena also reports completion when all five unique player moves have been used
  if (matchMode === "arena" && matchComplete && arenaMovesUsed.length === 5) {
    matchStatus.innerHTML = "Arena complete: all five moves have been used.";
    return;
  }
  const winner = score.wins >= matchTarget || score.losses >= matchTarget;

  if (winner) {
    matchStatus.innerHTML = `Match complete: first to ${matchTarget} wins.`;
    return;
  }

  matchStatus.innerHTML = `First to ${matchTarget} wins the match.`;
}

function saveDragonUsed() {
  //Store whether Dragon has been used in the current match
  localStorage.setItem("rps-dragon-used", dragonUsed);
}

function saveArenaMovesUsed() {
  //Persist the player's used Arena moves for refresh-safe one-use rule enforcement
  localStorage.setItem("rps-arena-moves-used", JSON.stringify(arenaMovesUsed));
}

function saveComputerArenaMovesUsed() {
  //Persist the computer's used Arena special moves for the current match
  localStorage.setItem(
    "rps-computer-arena-moves-used",
    JSON.stringify(computerArenaMovesUsed),
  );
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

  fireButton.disabled =
    //In Arena, Fire is disabled after the player uses it once.
    !fireUnlocked ||
    matchComplete ||
    (matchMode === "arena" && arenaMovesUsed.includes("Fire"));
  dragonButton.disabled =
    //Dragon keeps its normal one-use rule and also follows Arena's move tracking
    !dragonUnlocked ||
    dragonUsed ||
    matchComplete ||
    (matchMode === "arena" && arenaMovesUsed.includes("Dragon"));
  fireButton.innerHTML =
    fireUnlocked
      ? matchMode === "arena" && arenaMovesUsed.includes("Fire")
        ? "Fire <span>(used)</span>"
        : "Fire"
      : "Fire <span>(locked)</span>";
  dragonButton.innerHTML = dragonUnlocked
    ? dragonUsed
      ? "Dragon <span>(used)</span>"
      : "Dragon"
    : "Dragon <span>(locked)</span>";

  const unlocked = [];
  if (fireUnlocked) unlocked.push("Fire");
  if (dragonUnlocked) unlocked.push("Dragon");
  if (unlockedAbilities.arena) {
    abilitiesStatus.innerHTML =
      "Arena unlocked: Best of 9 with each move available once.";
  } else {
    abilitiesStatus.innerHTML = unlocked.length
      ? `${unlocked.join(" and ")} unlocked. Win Best of 9 to unlock Arena.`
      : "Win Best of 5 to unlock Fire. Win Best of 9 to unlock Dragon and Arena.";
  }

  const arenaOption = matchLength.querySelector('option[value="arena"]');
  //Keep the mode selector locked or unlocked as the permanent Arena status changes
  arenaOption.disabled = !unlockedAbilities.arena;
  arenaOption.textContent = unlockedAbilities.arena
    ? "Arena (Best of 9)"
    : "Arena (locked)";

  rockButton.disabled =
    //Base moves also become locked after one use in Arena
    matchComplete ||
    (matchMode === "arena" && arenaMovesUsed.includes("Rock"));
  paperButton.disabled =
    matchComplete ||
    (matchMode === "arena" && arenaMovesUsed.includes("Paper"));
  scissorsButton.disabled =
    matchComplete ||
    (matchMode === "arena" && arenaMovesUsed.includes("Scissors"));
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
  saveDragonUsed();
  arenaMovesUsed = [];
  saveArenaMovesUsed();
  //Resets the computer's Arena special-move history for the new match
  computerArenaMovesUsed = [];
  saveComputerArenaMovesUsed();
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
