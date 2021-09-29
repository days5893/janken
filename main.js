const player = document.querySelector(".player"); //プレイヤーの画像
const playerBg = document.querySelector(".player1");

const enemy = document.querySelector(".enemy"); //相手側の画像
const enemyBg = document.querySelector(".player2");

const hands = document.querySelectorAll(".hand"); // 手を決めるボタン
const start = document.querySelector(".start");
const container = document.querySelector(".container");
const result = document.querySelector(".result");
const janken = ["gu", "choki", "pa"]; //　画像のファイル名の配列
let jankenCount = 0;
let winCount = 0;
let handIndex = 0;

// 相手側の手をランダムに出す関数
let interval = setInterval(timer, 50);

function timer() {
  if (result.textContent == "VS") {
    handIndex = Math.floor(Math.random() * janken.length);
  }
  enemy.src = `images/${janken[handIndex]}.png`;
}

//ゲームを初期化する関数
function gameInit() {
  clearInterval(interval);
  player.src = 'images/gu.png';
  enemy.src = 'images/gu.png';
  start.textContent = "開始";
  result.textContent = "";

  playerBg.classList = "janken default";
  enemyBg.classList = "janken default";

  //3回やったら結果を出力
  if (jankenCount == 3) {
    alert(`あなたが勝利した回数は${jankenCount}回中${winCount}回です。`);
    jankenCount = 0;
    winCount = 0;
  }
}
//初期化する
gameInit();

function resultStyle(player1, player2) {
  playerBg.classList.remove("default");
  enemyBg.classList.remove("default");
  playerBg.classList.add(player1);
  enemyBg.classList.add(player2);
}

// ボタンクリック時の処理
hands.forEach(hand => {
  hand.addEventListener('click', (e) => {
    let playerIndex = janken.indexOf(e.target.id); // 配列の番号を取得
    if (result.textContent == "VS") {
      // 勝敗判定
      switch ((playerIndex - handIndex + 3) % 3) {
        case 0:
          result.textContent = "あいこ";
          resultStyle("aiko", "aiko");
          break;

        case 2:
          result.textContent = "勝ち";
          resultStyle("win", "lose");
          winCount++;
          break;

        case 1:
          result.textContent = "負け";
          resultStyle("lose", "win");
          break;
      }
      // プレイヤーの手の画像を変更  
      player.src = `images/${janken[playerIndex]}.png`;
      start.textContent = "再挑戦";
      jankenCount++;
    }
  });
});



start.addEventListener('click', () => {
  if (!result.textContent) {
    result.textContent = "VS";
    container.style.background = "gray";
    player.src = `images/gu.png`;
    interval = setInterval(timer, 50);
  } else if (result.textContent != "VS") {
    gameInit();
  }
});