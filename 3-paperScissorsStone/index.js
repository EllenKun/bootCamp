const startGame = document.querySelector("#start-game")
const gestureDialog = document.getElementById("gesture-dialog");
const outputBox = document.querySelector("output");
const selectEl = gestureDialog.querySelector("select");
const confirmBtn = gestureDialog.querySelector("#confirmBtn");
const roundText = document.querySelector('.round-text');
const robotScoreDiv = document.querySelector('#robot-score');
const myScoreDiv = document.querySelector('#my-score');

const parentDiv = document.querySelector('.gesture#my-gesture');

const finalRes = document.querySelector('.final-result');

const roundInfo = document.querySelector('#round-info');

const gestureImages = {
  paper: './paper.png',
  scissors: './scissor.png',
  stone: './rock.png'
}

const gestures = ['stone','scissors','paper']


let myGesture = '';
let robotGesture = '';


const myScore = {
  win: 0,
  lose: 0
};
const robotScore = {
  win: 0,
  lose: 0
};

let winText = '';

const maxRound = 3;
let curRound = 1;


// 弹窗展示
startGame.addEventListener("click", () => {
  startGame.textContent = '开始下一回合';
  myGesture = selectEl.value;
  gestureDialog.showModal();
})


selectEl.addEventListener("change", (e) => {
  myGesture = selectEl.value;
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); 
  gestureDialog.close(selectEl.value);
  drawMyGesture(myGesture)
  drawRobotGesture();
  pkResult();
});

function drawMyGesture(gesture) {
  const imgElemnt = document.createElement('img');
  const img = gestureImages[gesture];
  imgElemnt.className = 'imgMy';
  imgElemnt.src = img;
  const replaceNode = parentDiv.children[0];

  parentDiv.replaceChild(imgElemnt, replaceNode);
}

function drawRobotGesture() {
  const randomInt = Math.floor(Math.random() * 3);
  robotGesture = gestures[randomInt];

  const imgElemnt = document.createElement('img');
  const img = gestureImages[robotGesture];
  imgElemnt.className = 'imgRobot';
  
  
  imgElemnt.src = img;
  const parentDiv = document.querySelector('.gesture#robot-gesture');
  const replaceNode = parentDiv.children[0];

  parentDiv.replaceChild(imgElemnt, replaceNode);
}


function pkResult() {
  let res = 0; // 0 平局 1 myWin 2 robotWin
  if(robotGesture === myGesture) {
    res = 0;
  } else if(
    (robotGesture === 'stone' && myGesture === 'scissors') ||
    (robotGesture === 'scissors' && myGesture === 'paper') || 
    (robotGesture === 'paper' && myGesture === 'stone')
  ) {
    res = 2;
  } else {
    res = 1;
  }

  if(res === 0) {
    winText = '本回合平局';
  } else if (res === 1) {
    myScore.win++;
    robotScore.lose++;
    winText = '本回合你赢';
  } else {
    myScore.lose++;
    robotScore.win++;
    winText = '本回合机器人赢';
  }
  roundText.style.display = 'block';
  roundText.textContent = winText;
  robotScoreDiv.textContent = `胜${robotScore.win} | 负${robotScore.lose}`;
  myScoreDiv.textContent = `胜${myScore.win} | 负${myScore.lose}`;

  getRoundInfo(curRound, maxRound);

  if (curRound === maxRound) {
    if (robotScore.win > myScore.win) {
      finishGame('机器人');
    } else if (robotScore.win < myScore.win) {
      finishGame('你');
    } else {
      finishGame();
    }
  } else {
    if(robotScore.win === 2) {
      finishGame('机器人');
      return;
    } else if (myScore.win === 2) {
      finishGame('你');
      return;
    }
    curRound++;
  }
}

function getRoundInfo(curRound, maxRound) {
  roundInfo.textContent = `第${curRound}回合（共${maxRound}回合）`;
}

function finishGame(name) {
    startGame.style.display = 'none';
    finalRes.style.display = 'block';
    if (!name) {
      finalRes.textContent = '平局~';
      return;
    }
    finalRes.textContent = `恭喜${name}获胜~`;
}

function restartGame() {
  startGame.style.display = 'block';
  finalRes.style.display = 'none';
  roundText.style.display = 'none';
  roundInfo.textContent = '石头剪刀布';

  myGesture = '';
  robotGesture = '';

  myScore.win = 0;
  myScore.lose = 0;

  robotScore.win = 0;
  robotScore.lose = 0;

  robotScoreDiv.textContent = `胜${robotScore.win} | 负${robotScore.lose}`;
  myScoreDiv.textContent = `胜${myScore.win} | 负${myScore.lose}`;


  const pMy = document.createElement('p');
  pMy.className = 'pending';
  pMy.textContent = '?';
  const replaceNode = parentDiv.children[0];
  parentDiv.replaceChild(pMy, replaceNode);

  const pRobot = document.createElement('p');
  pRobot.className = 'pending';
  pRobot.textContent = '?';

  const parentDivRobot = document.querySelector('.gesture#robot-gesture');
  const replaceNodeRobot = parentDivRobot.children[0];
  parentDivRobot.replaceChild(pRobot,replaceNodeRobot);

   
  winText = '';

  curRound = 1;

}


const restartGameBtn = document.querySelector('#restart-game');

restartGameBtn.addEventListener("click", () => {
  restartGame();
})
