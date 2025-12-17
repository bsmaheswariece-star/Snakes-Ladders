const board = document.getElementById("board");

let p1 = 1, p2 = 1, turn = 1;

const snakes = {
  17: 7,
  54: 34,
  62: 19,
  98: 79
};

const ladders = {
  3: 22,
  6: 25,
  20: 41,
  57: 76
};

// CREATE BOARD
for (let i = 100; i >= 1; i--) {
  let cell = document.createElement("div");
  cell.className = "cell";
  cell.id = "cell-" + i;
  cell.innerHTML = `<span class="num">${i}</span>`;

  if (snakes[i]) {
    cell.classList.add("snake");
    cell.innerHTML += "<span class='icon'>🐍</span>";
  }

  if (ladders[i]) {
    cell.classList.add("ladder");
    cell.innerHTML += "<span class='icon'>🪜</span>";
  }

  board.appendChild(cell);
}

updatePlayers();

function rollDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice").innerText = "🎲 Dice: " + dice;

  if (turn === 1) {
    p1 += dice;
    if (snakes[p1]) p1 = snakes[p1];
    if (ladders[p1]) p1 = ladders[p1];
    if (p1 >= 100) return win(1);
    turn = 2;
  } else {
    p2 += dice;
    if (snakes[p2]) p2 = snakes[p2];
    if (ladders[p2]) p2 = ladders[p2];
    if (p2 >= 100) return win(2);
    turn = 1;
  }

  updatePlayers();
  document.getElementById("turn").innerText =
    turn === 1 ? "Player 1 Turn 🔴" : "Player 2 Turn 🔵";
}

function updatePlayers() {
  document.querySelectorAll(".p1,.p2").forEach(e => e.remove());

  let c1 = document.getElementById("cell-" + p1);
  let c2 = document.getElementById("cell-" + p2);

  let d1 = document.createElement("div");
  d1.className = "p1";

  let d2 = document.createElement("div");
  d2.className = "p2";

  c1.appendChild(d1);
  c2.appendChild(d2);
}

function win(player) {
  alert("🎉 Player " + player + " WON!");
  location.reload();
}
