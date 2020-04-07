/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
window.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = "pok.mp3";


  // ---------------------------------- Wrapper and common view of page
  const divWrapper = document.createElement("div");
  divWrapper.classList.add("wrapper");
  divWrapper.setAttribute("style", "width: 100%; min-width: 100%; height: 100%; margin: 0 auto;");
  document.body.appendChild(divWrapper);

  const divBlock = document.createElement("div");
  divBlock.setAttribute("style", "max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; background-color: #fbdaae;");
  divWrapper.appendChild(divBlock);

  const divH = document.createElement("h1");
  divH.setAttribute("style", "color: #fff3f3; font-family: \"Baloo Chettan 2\", sans-serif; font-size: 56px; margin-bottom: 20px;"
    + "text-shadow: 0px 3px 0px #b36e5f, 0px 14px 10px rgba(0,0,0,0.15), 0px 24px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1);"
    + "text-align: center; letter-spacing: 4px;");
  divH.innerHTML = "SLIDER GEM PUZZLE";
  divBlock.appendChild(divH);

  const buttons = document.createElement("div");
  buttons.classList.add("buttons_container");
  buttons.style.cssText = "margin: 0 auto; display: flex; width: 100%; max-width: 500px; height: 50px; user-select: none;"
    + "border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 28px; margin-bottom: 10px; padding: 10px 0px;"
    + "box-shadow: 0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15), 0px 24px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1);";
  divBlock.appendChild(buttons);

  // ----------- BUTTONS: "START", "SAVE", "SCORE"

  const [buttonNames, buttonsWidth, buttonsValue] = [
    ["buttonStart", "buttonSave", "buttonScore"],
    [120, 100, 100],
    ["START", "SAVE", "SCORE"]];

  (function createButtons() {
    let btn;
    let text;
    for (let i = 0; i < buttonNames.length; i += 1) {
      btn = document.createElement("BUTTON");
      btn.classList.add(buttonNames[i]);
      btn.style.cssText = "margin: 0 auto; display: inline-block; user-select: none; border-radius: 30px; padding: 10px 10px; outline: none;"
        + "box-shadow: rgb(117, 117, 117) 3px 2px 3px, rgb(239, 235, 235) 2px 1px 2px inset; color: #fbf4e6; background-color: rgb(169, 115, 115);"
        + "font-family: \"Baloo Chettan 2\", sans-serif; font-size: 18px; font-weight: 700; line-height: 18px; cursor: pointer;"
        + "box-shadow: rgb(220, 220, 220) 3px 2px 3px, rgb(148, 148, 148) 2px 1px 2px inset;";
      btn.style.width = `${buttonsWidth[i]}px`;
      text = document.createTextNode(buttonsValue[i]);
      btn.appendChild(text);
      buttons.appendChild(btn);
    }
  }());

  // ----------- counting Time & moves block

  const countTime = document.createElement("div");
  countTime.classList.add("countTime");
  countTime.style.cssText = "margin: 0 auto; display: flex; width: 100%; max-width: 500px; height: 20px; user-select: none; font-size: 18px; font-weight: bold;"
    + "border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 28px; margin-bottom: 40px; padding: 10px 0px; align-items: center; justify-content: space-around; "
    + "box-shadow: 0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15), 0px 24px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1); font-family: \"Baloo Chettan 2\", sans-serif;";
  divBlock.appendChild(countTime);

  const pScore = document.createElement("p");
  pScore.innerHTML = "Moves: <span class=\"moveP\">0</span>";
  countTime.appendChild(pScore);
  const pTime = document.createElement("p");
  pTime.innerHTML = "Total time: <span class=\"timeP\">0</span>";
  countTime.appendChild(pTime);


  // ------- MAIN Field with chips

  const mainBox = document.createElement("div");
  mainBox.classList.add("puzzle_board");
  mainBox.style.cssText = "margin: 0 auto; text-align: center; width: 100%; max-width:528px; height: 530px; user-select: none;"
    + "background-color: rgb(82, 70, 70); border: 2px solid rgba(239, 230, 230, 0.69); margin-bottom: 40px; padding: 10px 0px;"
    + "border-radius: 28px; box-shadow: 3px 9px 3px #ceaba0, inset 2px 3px 2px #bf9494;";
  divBlock.appendChild(mainBox);

  const chipsContainer = document.createElement("div");
  chipsContainer.classList.add("chip_container");
  chipsContainer.style.cssText = "margin: 0 auto; max-width: 480px; width: 100%; height: 90%; max-height: 480px; user-select: none;"
    + "background-color: rgb(56, 48, 48); border-radius: 28px;  margin-top: 22px;"
    + "box-shadow: 2px 2px 3px rgba(255,255,255,0.1), rgba(255, 255, 255, 0.1) -2px -2px 5px; position: relative;";
  mainBox.appendChild(chipsContainer);

  // ------------- chips
  const width = chipsContainer.style.maxWidth.slice(0, 3) - 30;
  const height = width;
  const gridOfChips = [];
  let chipWidth = 1;
  let chipHeight = 1;

  function makeChips(size) {
    const chipN = size * size - 1;
    // -------------------------------------- shuffle values
    const arr = Array.from({ length: chipN }, (v, i) => i + 1);
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    chipWidth = (width - 8 * (size - 2)) / size;
    chipHeight = (height - 8 * (size - 2)) / size;
    for (let k = 0; k < size; k += 1) {
      gridOfChips.push([]);
    }
    for (let i = 0; i < chipN; i += 1) {
      const chipValue = arr[i];
      const chip = document.createElement("DIV");
      chip.classList.add("chip");
      chip.innerHTML = chipValue;

      chip.addEventListener("mousedown", (event) => {
        chip.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        // eslint-disable-next-line no-use-before-define
        clickedChip(event);
        audio.play();
        setTimeout(() => {
          chip.style.backgroundColor = "rgb(210, 147, 147)";
        }, 400);
      });
      chip.style.cssText = "user-select: none; color: #fbf4e6; background-color: rgb(210, 147, 147); cursor: grab; position: absolute;"
        + "font-family: \"Baloo Chettan 2\", sans-serif; text-shadow: -2px 2px 2px brown; font-weight: 700; border-radius: 10px;"
        + "box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);";
      chip.style.maxWidth = `${chipWidth}px`;
      chip.style.width = `${100 / size}%`;
      chip.style.height = `${100 / size}%`;
      chip.style.maxHeight = `${chipHeight}px`;
      chip.style.fontSize = `${chipWidth * 0.5}px`;
      chipsContainer.appendChild(chip);
      const col = i % size;
      const row = Math.floor(i / size);
      // eslint-disable-next-line no-use-before-define
      placeChip(chip, col, row);
      gridOfChips[row].push(chipValue);
    }
    gridOfChips[size - 1].push(0);
  }
  makeChips(localStorage.size || 4);
  // console.log(gridOfChips);

  function placeChip(chip, col, row) {
    const x = col * (chipWidth + 8) + 8;
    const y = row * (chipHeight + 8) + 8;
    chip.style.left = `${x}px`;
    chip.style.top = `${y}px`;
  }

  // ----------- change size of the CHIP field

  const changeSize = document.createElement("div");
  changeSize.classList.add("changeSize");
  changeSize.style.cssText = "margin: 0 auto; display: flex; width: 100%; max-width: 500px; height: 20px; user-select: none; font-size: 18px; font-weight: bold;"
    + " border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 28px; margin-bottom: 40px; padding: 10px 10px; align-items: center; justify-content: space-around; "
    + "box-shadow: 0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15), 0px 24px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1); font-family: \"Baloo Chettan 2\", sans-serif;";
  divBlock.appendChild(changeSize);

  const pSize = document.createElement("p");
  pSize.innerHTML = "Change size: ";
  changeSize.appendChild(pSize);
  (() => {
    let btn;
    let text;
    for (let i = 3; i < 9; i += 1) {
      btn = document.createElement("BUTTON");
      btn.classList.add("changeSizeBtn");
      text = document.createTextNode(i);
      btn.appendChild(text);
      btn.style.cssText = "margin: 0 auto;  width: 30px; height: 30px; user-select: none; font-size: 18px; font-weight: bold; cursor: pointer;"
        + "border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 50%; text-align: center; line-height: 18px; outline: none;"
        + "box-shadow: 0px 3px 0px #b2a98f, 0px 6px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1); font-family: \"Baloo Chettan 2\", sans-serif;";
      changeSize.appendChild(btn);
    }
  })();

  const changeSizeBtn = document.querySelectorAll(".changeSizeBtn");
  changeSizeBtn.forEach((btn) => {
    const innerSize = btn.innerHTML;
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      chipsContainer.innerHTML = "";
      localStorage.size = innerSize || 4; // --------------------------------------store the size
      document.location.reload(true);
      makeChips(innerSize);
    });
  });


  // -------------------------- Modal window score

  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modalWindow");
  modalWindow.style.cssText = "position: fixed; display: none; z-index: 10; width: 100%; height: 100%; overflow: auto;"
    + "margin: 0 auto; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.4);";
  document.body.appendChild(modalWindow);
  const modalWindowContent = document.createElement("div");
  modalWindowContent.classList.add("modalWindowContent");
  modalWindowContent.style.cssText = "position: absolute; z-index: 100; background-color: lavenderblush; border-radius: 10px;"
    + "margin: 0 auto; color: black; font-family: 'Arial', sans-serif; padding: 50px; max-width: 450px; text-align: center;"
    + "top: 50%; left: 50%; transform: translate(-50%, -50%);";
  modalWindow.appendChild(modalWindowContent);
  const modalWindowTitle = document.createElement("h2");
  modalWindowTitle.classList.add("modalWindowTitle");
  modalWindowTitle.style.cssText = "font-family: 'Arial', sans-serif; text-align: center; font-size: 28px";
  modalWindowTitle.innerText = "Your best score:";
  modalWindowContent.appendChild(modalWindowTitle);
  const modalWindowClose = document.createElement("button");
  modalWindowClose.classList.add("modalWindowClose");
  modalWindowClose.style.cssText = "color: white; background-color: #f48c8f; outline: none; cursor: pointer; padding:10px;"
    + "position: absolute; top: 10px; left: 10px; border-radius: 10px;";
  modalWindowClose.innerText = "X";
  modalWindowClose.addEventListener("click", () => {
    modalWindow.style.display = "none";
  });
  modalWindowContent.appendChild(modalWindowClose);


  // -------------- Storage of scores
  const p = document.createElement("p");
  for (let i = 0; i < localStorage.length; i += 1) {
    if (/sessionGame/.test(localStorage.key(i))) {
      const el = localStorage.getItem(localStorage.key(i));
      p.innerHTML += `${el} <br>`;
    }
  }
  modalWindowContent.appendChild(p);

  const scoreBtn = document.querySelector(".buttonScore");
  scoreBtn.addEventListener("click", () => {
    modalWindow.style.display = "block";
  });

  // -------------- Save score
  let timeCount = 0;
  let moves = 0;
  const saveBtn = document.querySelector(".buttonSave");
  saveBtn.addEventListener("click", () => {
    if (moves && timeCount) {
      const result = ` ${moves} moves & ${timeCount} seconds `;
      localStorage.setItem(`sessionGame ${moves}`, result);
    }
  });

  // -------------------------- Start game


  let time;
  const movesP = document.querySelector(".moveP");
  const startBtn = document.querySelector(".buttonStart");

  // eslint-disable-next-line consistent-return
  startBtn.addEventListener("click", () => {
    if (startBtn.innerHTML === "START") {
      startBtn.innerHTML = "PAUSE";
      time = setInterval(() => {
        timeCount += 1;
        document.querySelector(".timeP").innerText = timeCount;
      }, 1000);
      return time;
    }
    clearInterval(time);
    startBtn.innerHTML = "START";
  });


  // eslint-disable-next-line consistent-return
  function clickedChip(event) {
    const tile = event.currentTarget;
    let col;
    let row;
    const innertile = parseInt(tile.innerText, 10);
    // eslint-disable-next-line no-labels
    outerLoop:
    for (row = 0; row < gridOfChips.length; row += 1) {
      for (col = 0; col < gridOfChips.length; col += 1) {
        if (gridOfChips[row][col] === innertile) {
          // eslint-disable-next-line no-labels
          break outerLoop;
        }
      }
    }
    // eslint-disable-next-line no-use-before-define
    moveChip(tile, col, row);
    if (startBtn.innerHTML === "START") {
      startBtn.innerHTML = "PAUSE";
      time = setInterval(() => {
        timeCount += 1;
        document.querySelector(".timeP").innerText = timeCount;
      }, 1000);
      return time;
    }
    // ------------------------ check if it is a WIN move
    const need = gridOfChips.reduce((arr, el) => arr.concat(el), []);
    const l = gridOfChips.length;
    const resultedArr = Array.from({ length: l ** 2 - 1 }).fill(1).map((v, i) => i + 1);
    resultedArr.push(0);
    if (need.join("") === resultedArr.join("")) {
      // eslint-disable-next-line no-alert
      alert("💙 YOU WIN!! CONGRATULATIONS!!!!!! 💙");
    }
  }

  function moveChip(tile, col, row) {
    let x = 0;
    let y = 0;
    if (col > 0 && gridOfChips[row][col - 1] === 0) {
      x = -1; // --move up
    } else if (col < gridOfChips.length - 1 && gridOfChips[row][col + 1] === 0) {
      x = 1; // --move down
    } else if (row > 0 && gridOfChips[row - 1][col] === 0) {
      y = -1; // --move up
    } else if (row < gridOfChips.length - 1 && gridOfChips[row + 1][col] === 0) {
      y = 1; // --move down
    } else {
      return;
    }
    const tempValue = gridOfChips[row][col];
    gridOfChips[row + y][col + x] = tempValue;
    gridOfChips[row][col] = 0;
    placeChip(tile, col + x, row + y);
    moves += 1;
    movesP.innerText = moves;
  }
});
