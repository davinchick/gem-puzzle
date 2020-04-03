window.addEventListener("DOMContentLoaded", function () {
 

// ---------------------------------- Wrapper and common view of page

var divWrapper = document.createElement("div");
divWrapper.classList.add("wrapper");
divWrapper.setAttribute("style", "width: 100%; height: 100%; margin: 0 auto;");
document.body.appendChild(divWrapper);

var divBlock = document.createElement("div");
divBlock.setAttribute("style", "width: 900px; margin: 0 auto; display: flex; flex-direction: column; " +
    "background-color: #fbdaae;");
divWrapper.appendChild(divBlock);

var divH = document.createElement("h1");
divH.setAttribute("style", "color: #fff3f3; font-family: \"Baloo Chettan 2\", sans-serif; font-size: 56px; " +
    "text-shadow: 0px 3px 0px #b36e5f, 0px 14px 10px rgba(0,0,0,0.15), 0px 24px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1); "+
    "text-align: center; letter-spacing: 4px; margin-bottom: 20px;");
divH.innerHTML = "SLIDER GEM PUZZLE";
divBlock.appendChild(divH);

var buttons = document.createElement("div"); 
buttons.classList.add("buttons_container");
buttons.style.cssText = "margin: 0 auto; display: flex; width: 100%; max-width: 500px; height: 50px; user-select: none; "+
    " border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 28px; margin-bottom: 10px; padding: 10px 10px;  " +
    "box-shadow: 0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15), 0px 24px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1);"; 
divBlock.appendChild(buttons);

// ----------- BUTTONS

var [buttonNames, buttonsWidth, buttonsValue] = [
   ["buttonStart", "buttonStop", "buttonSave", "buttonScore"],
   [120, 100, 100, 100],
   ["START", "STOP", "SAVE", "SCORE"] ];

(function createButtons() { 
       var btn, text; 
       for (i=0; i < buttonNames.length; i++) { 
           btn=document.createElement("BUTTON"); 
           btn.classList.add(buttonNames[i]);
           btn.style.cssText = "margin: 0 auto; display: inline-block; user-select: none; "+
                 "box-shadow: rgb(117, 117, 117) 3px 2px 3px, rgb(239, 235, 235) 2px 1px 2px inset; color: #fbf4e6; background-color: rgb(169, 115, 115);" + 
                 "font-family: \"Baloo Chettan 2\", sans-serif; font-size: 18px; outline: none;" +
                 "font-weight: 700; border-radius: 30px; padding: 10px 10px;  line-height: 18px; cursor: pointer;" +
                 "box-shadow: rgb(220, 220, 220) 3px 2px 3px, rgb(148, 148, 148) 2px 1px 2px inset;";
           btn.style.width = buttonsWidth[i] +"px";
           text=document.createTextNode(buttonsValue[i]); 
           btn.appendChild(text);  
           buttons.appendChild(btn); 
       } 
})();
   
// ----------- counting Time & moves

var countTime = document.createElement("div"); 
countTime.classList.add("countTime");
countTime.style.cssText = "margin: 0 auto; display: flex; width: 100%; max-width: 500px; height: 20px; user-select: none; font-size: 18px; font-weight: bold;"+
    " border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 28px; margin-bottom: 40px; padding: 10px 10px; align-items: center; justify-content: space-around; " +
    "box-shadow: 0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15), 0px 24px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1); font-family: \"Baloo Chettan 2\", sans-serif;"; 
divBlock.appendChild(countTime);

var pScore = document.createElement("p");
pScore.innerHTML = "Moves: <span slass=\"scoreP\"></span>";
countTime.appendChild(pScore);
var pTime = document.createElement("p");
pTime.innerHTML = "Total time: <span slass=\"timeP\"></span>";
countTime.appendChild(pTime);




  // ------- Field with chips

var mainBox = document.createElement("div"); 
mainBox.classList.add("puzzle_board");
mainBox.style.cssText = "margin: 0 auto; text-align: center; min-width:528px; height: 530px; user-select: none; "+
    "background-color: rgb(82, 70, 70); border: 2px solid rgba(239, 230, 230, 0.69);" +
    "border-radius: 28px; margin-bottom: 40px; padding: 10px 10px;  " +
    "box-shadow: 3px 9px 3px #ceaba0, inset 2px 3px 2px #bf9494;"; 
divBlock.appendChild(mainBox);

var chipsContainer = document.createElement("div"); 
chipsContainer.classList.add("chip_container");
chipsContainer.style.cssText = "margin: 0 auto; width: 90%; height: 90%; user-select: none;   "+
    "background-color: rgb(56, 48, 48); border-radius: 28px;  margin-top: 22px;  " +
    "box-shadow: 2px 2px 3px rgba(255,255,255,0.1), rgba(255, 255, 255, 0.1) -2px -2px 5px;            position: relative;"; 
    mainBox.appendChild(chipsContainer);



//------------- chips
 
var width = 450;
var height = width;
var space = 8;
var gridOfChips = [];


function makeChips(size) {  
    var chipN = size*size -1;
    var chipWidth = (width - space*(size-2)) /size; 
    var chipHeight = (height - space*(size-2)) /size; 
      for (let k = 0; k < size; k+=1) {
         gridOfChips.push([]);
      }
      for (let i = 0; i < chipN; i+=1) {
            var chipValue = i + 1;
            var chip = document.createElement("DIV"); 
            chip.classList.add("chip");
            chip.innerHTML = chipValue; 
            chip.addEventListener("mousedown", () =>{
                chip.style.backgroundColor = "rgba(0, 0, 0, 0.4)"; 
            });
            chip.addEventListener("mouseup", () =>{
                chip.style.backgroundColor = "rgb(210, 147, 147)"; 
            }); 
            chip.style.cssText = " user-select: none; color: #fbf4e6; background-color: rgb(210, 147, 147); cursor: pointer; " + 
                "font-family: \"Baloo Chettan 2\", sans-serif; text-shadow: -2px 2px 2px brown; font-weight: 700;" +
                "border-radius: 10px; box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22); position: absolute;"; 
            chip.style.width = chipWidth+"px"; 
            chip.style.height = chipHeight+"px";
            chip.style.fontSize = chipWidth*0.5+"px"; 
            chipsContainer.appendChild(chip); 
            var col = i%size; 
            var row = Math.floor(i/size);
                    ( function() {
                            let x = col*(chipWidth + space) + space; 
                            let y = row*(chipHeight + space) + space;
                                chip.style.left = x +"px";
                                chip.style.top = y +"px";
                                // chip.style.animation = "chipy 1.5s linear";
                    }()); 
                     gridOfChips[row].push(chipValue);
      }
      gridOfChips[size-1].push(0);
        console.log(gridOfChips);
   }

 makeChips(4);
 

  
var allChips = document.querySelectorAll(".chip");

// allChips.forEach( (el) => {
//    function clickedChip(event){ 
//       var tile = event.currentTarget;
//       var x,y;
//       const innertile = parseInt(tile.innerHTML);
//          //   console.log(tile.innerHTML);
//          loop:
//          for (let x = 0; x < size; x+=1) {
//             for (let y = 0; y < size; y++) {
//                if(gridOfChips[x][y] == innertile){
//                   break loop;
//                }
//             }
//          }
//          moveTile(tile, x, y);
//    }  
// // });       

// // ------ how to move, options:
// function moveTile(tile, col, row) {
//    var x = 0; var y = 0; 
//    if(col>0 && gridOfChips[row][col-1] == 0){
//       x = -1;
//    } else if(col<size-1 && gridOfChips[row][col+1] == 0){
//       x = 1;
//    } else if(row >0 && gridOfChips[row-1][col] == 0){
//       y = -1;
//    } else if(row < size-1 && gridOfChips[row+1][col] == 0){
//       y = 1;
//    } else {
//       return;
//    }
//    const v = gridOfChips[row][col];
//    gridOfChips[row+y][col+x] = v;
//    gridOfChips[row][col] = 0;
//    positionChip(tile, col+x, row+y);
// }





 

// ----------- check another size

var changeSize = document.createElement("div"); 
changeSize.classList.add("changeSize");
changeSize.style.cssText = "margin: 0 auto; display: flex; width: 100%; max-width: 500px; height: 20px; user-select: none; font-size: 18px; font-weight: bold;"+
    " border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 28px; margin-bottom: 40px; padding: 10px 10px; align-items: center; justify-content: space-around; " +
    "box-shadow: 0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15), 0px 24px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1); font-family: \"Baloo Chettan 2\", sans-serif;"; 
 divBlock.appendChild(changeSize);

var pSize = document.createElement("p");
pSize.innerHTML = "Change size: ";
changeSize.appendChild(pSize); 
(function createButtonsSize() { 
    var btn, text; 
    for (let i = 3; i < 9; i+=1) { 
        btn=document.createElement("BUTTON"); 
        btn.classList.add("changeSizeBtn");
        text = document.createTextNode(i); 
        btn.appendChild(text);
        btn.style.cssText = "margin: 0 auto;  width: 30px; height: 30px; user-select: none; font-size: 18px; font-weight: bold; cursor: pointer;"+
              " border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 50%; text-align: center; line-height: 18px; outline: none;" +
              "box-shadow: 0px 3px 0px #b2a98f, 0px 6px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1); font-family: \"Baloo Chettan 2\", sans-serif;";  
        changeSize.appendChild(btn);
    } 
})();

var changeSizeBtn = document.querySelectorAll(".changeSizeBtn"); 
changeSizeBtn.forEach(  (btn) => {
    let innerSize = btn.innerHTML;
    btn.addEventListener("click", (event) => { 
        event.preventDefault(); 
        chipsContainer.innerHTML = "";
        makeChips(innerSize);
    });
});




// -------------------------- Modal window score

var scoreBtn = document.querySelector(".buttonScore");
scoreBtn.addEventListener("click", (e)=>{
    modalWindow.style.display = "block";
});


var modalWindow = document.createElement("div"); 
modalWindow.classList.add("modalWindow");
modalWindow.style.cssText = "position: fixed; display: none; z-index: 10; width: 100%; height: 100%; overflow: auto;"+
"margin: 0 auto; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.4);"; 
document.body.appendChild(modalWindow);
   var modalWindowContent = document.createElement("div"); 
modalWindowContent.classList.add("modalWindowContent");
modalWindowContent.style.cssText = "position: absolute; z-index: 100; background-color: lavenderblush; border-radius: 10px;"+
"margin: 0 auto; color: black; font-family: 'Arial', sans-serif; padding: 50px; max-width: 450px; text-align: center;" +
"top: 50%; left: 50%; transform: translate(-50%, -50%); animation-name: shownUp; animation-duration: 0.5s;"; 
modalWindow.appendChild(modalWindowContent);
   var modalWindowTitle = document.createElement("h2"); 
modalWindowTitle.classList.add("modalWindowTitle");
modalWindowTitle.style.cssText = "font-family: 'Arial', sans-serif; text-align: center; font-size: 28px"; 
modalWindowTitle.innerText = "Your best score:";
modalWindowContent.appendChild(modalWindowTitle);
  var modalWindowClose = document.createElement("button"); 
modalWindowClose.classList.add("modalWindowClose");
modalWindowClose.style.cssText = "color: white; background-color: #f48c8f; outline: none; cursor: pointer; padding:10px; "+
"position: absolute; top: 10px; left: 10px;"; 
modalWindowClose.innerText = "X";
modalWindowClose.addEventListener("click", (e)=>{
    modalWindow.style.display = "none";
});
modalWindowContent.appendChild(modalWindowClose);

  var scoreArray = [ [19,200], [13,90], [150,950], [20,550], [30,200], [28,500], [10,80] ].sort( (a, b)=> a[0]-b[0] ); 
  var modalWindowScore = document.createElement("p"); 
modalWindowScore.classList.add("modalWindowScore");
modalWindowScore.style.cssText = "text-align: center; font-size: 18px"; 
scoreArray.forEach( el => { 
    let p = document.createElement("p");
    p.innerText += ` ${el[0]} moves && ${el[1]} total Time `;
    modalWindowContent.appendChild(p);
});
modalWindowContent.appendChild(modalWindowScore);

 

// -------------- Save score

var saveBtn = document.querySelector(".buttonSave");
saveBtn.addEventListener("click", (e)=>{
     if(moves && totalTime){
        scoreArray.pop();
        scoreArray.push( [moves, totalTime] );
     }
});



});

