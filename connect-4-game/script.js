const grid = document.getElementById("grid");
const playerTurn = document.getElementById("player-turn");
const resetBtn = document.getElementById("reset-btn");
const modeRadios = document.querySelectorAll("input[name='mode']");
 
let board = Array(6).fill().map(()=> Array(7).fill(0));
let currentPlayer = 1; // 1=red, 2=yellow
let gameOver = false;
let gameMode = "2player";
 
// mode selection
modeRadios.forEach(radio => {
  radio.addEventListener("change", ()=>{
    gameMode = radio.value;
    resetGame();
  });
});
 
// create grid cells
for(let r=0; r<6; r++){
  for(let c=0; c<7; c++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = r;
    cell.dataset.col = c;
    cell.addEventListener("click", () => playerMove(c));
    grid.appendChild(cell);
  }
}
 
let lastRow;
 
// player move
function playerMove(col){
  if(gameOver) return;
  if(dropDisc(col, currentPlayer)){
    if(checkWinner(lastRow, col, currentPlayer)){
      setTimeout(()=> alert(`Player ${currentPlayer} wins! 🎉`),100);
      gameOver = true;
      return;
    }
    if(gameMode === "vscomputer" && currentPlayer===1){
      currentPlayer=2;
      playerTurn.textContent = "Computer's Turn (🟡)";
      setTimeout(computerMove, 500);
    } else {
      currentPlayer = currentPlayer===1 ? 2:1;
      playerTurn.textContent = `Player ${currentPlayer}'s Turn (${currentPlayer===1?"🔴":"🟡"})`;
    }
  }
}
 
// drop disc
function dropDisc(col, playerNum){
  for(let row=5; row>=0; row--){
    if(board[row][col]===0){
      board[row][col]=playerNum;
      const cell=document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
      cell.classList.add(playerNum===1?"red":"yellow");
      lastRow=row;
      return true;
    }
  }
  return false;
}
 
// computer move (random)
function computerMove(){
  if(gameOver) return;
  let availableCols = [];
  for(let c=0;c<7;c++) if(board[0][c]===0) availableCols.push(c);
  let col = availableCols[Math.floor(Math.random()*availableCols.length)];
  dropDisc(col,2);
  if(checkWinner(lastRow, col, 2)){
    setTimeout(()=> alert("Computer Wins! 😢"),100);
    gameOver=true;
    return;
  }
  currentPlayer=1;
  playerTurn.textContent = "Your Turn (🔴)";
}
 
// check winner
function checkWinner(r,c,p){
  const directions = [
    [[0,1],[0,-1]],
    [[1,0],[-1,0]],
    [[1,1],[-1,-1]],
    [[1,-1],[-1,1]]
  ];
 
  for(const dir of directions){
    let count=1;
    for(const [dr,dc] of dir){
      let nr=r+dr, nc=c+dc;
      while(nr>=0 && nr<6 && nc>=0 && nc<7 && board[nr][nc]===p){
        count++; nr+=dr; nc+=dc;
      }
    }
    if(count>=4) return true;
  }
  return false;
}
 
// reset game
resetBtn.addEventListener("click", resetGame);
 
function resetGame(){
  board = Array(6).fill().map(()=> Array(7).fill(0));
  gameOver=false;
  currentPlayer=1;
  document.querySelectorAll(".cell").forEach(cell=>cell.classList.remove("red","yellow"));
  playerTurn.textContent = gameMode==="vscomputer"?"Your Turn (🔴)":"Player 1's Turn (🔴)";
}
 
 