//array to keep track of the original sequence of tile clicks and a second array for the player sequence
let sequence: string | any[] = [];
let humanSequence: any[] = [];

//to keep track of the numbers of rounds that have been played
let level = 0;

const startButton = document.querySelector('.js-start')!;
const info = document.querySelector('.js-info')!;
const heading = document.querySelector('.js-heading')!;
const boardContainer = document.querySelector('.js-container')!;

function resetGame(text: string) {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Memory Game';
    info.classList.add('hidden');
    boardContainer.classList.add('unclickable');
}
  
function humanTurn(level: number) {
    boardContainer.classList.remove('unclickable');
    info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}

function activateCard(color: any) {
    const card = document.querySelector(`[data-card='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    card.classList.add('activated');
    sound.play();

    setTimeout(() => {
    card.classList.remove('activated');
    }, 300);
}
  
function playRound(nextSequence: any[]) {
    nextSequence.forEach((color: any, index: number) => {
      setTimeout(() => {
        activateCard(color);
      }, (index + 1) * 600);
    });
}

function nextStep() {
    const cards = ['pink', 'teal', 'orange', 'yellow', 'red', 'blue'];
    const random = cards[Math.floor(Math.random() * cards.length)];
    return random;
}

function nextRound() {
    level += 1;

    boardContainer.classList.add('unclickable');
    info.textContent = 'Wait for the computer';
    heading.textContent = `Level ${level} of 15`;

    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}


function handleClick(tile: any) {
    const index = humanSequence.push(tile) - 1;
  
    const remainingTaps = sequence.length - humanSequence.length;
  
    if (humanSequence[index] !== sequence[index]) {
      resetGame('Oops! Game over, you pressed the wrong tile');
      return;
    }
  
    if (humanSequence.length === sequence.length) {
      if (humanSequence.length === 15) {
        resetGame('Congrats! You completed all the levels');
        return
}
  
    humanSequence = [];
    info.textContent = 'Success! Keep going!';
    setTimeout(() => {
        nextRound();
    }, 1000);
    return;
    }
  
    info.textContent = `Your turn: ${remainingTaps} Tap${
      remainingTaps > 1 ? 's' : ''
    }`;
}
    
function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = 'Wait for the computer';
    nextRound();
}

startButton.addEventListener('click', startGame);
boardContainer.addEventListener('click', event => {
  const { card } = event.target.dataset;

  if (card) handleClick(card);
});