window.addEventListener("DOMContentLoaded", function () {
 

// ---------------------------------- Wrapper and common view of page

var divWrapper = document.createElement("div");
divWrapper.classList.add("wrapper");
divWrapper.setAttribute("style", "width: 100%; height: 100%; margin: 0 auto;");
document.body.appendChild(divWrapper);

var divBlock = document.createElement("div");
divBlock.setAttribute("style", "width: 700px; margin: 0 auto; display: flex; flex-direction: column; " +
    "background-color: #fbdaae; height: 100vh;");
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
   
// ----------- counting Time & score

var countTime = document.createElement("div"); 
countTime.classList.add("countTime");
countTime.style.cssText = "margin: 0 auto; display: flex; width: 100%; max-width: 500px; height: 20px; user-select: none; font-size: 18px; font-weight: bold;"+
    " border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 28px; margin-bottom: 40px; padding: 10px 10px; align-items: center; justify-content: space-around; " +
    "box-shadow: 0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15), 0px 24px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1); font-family: \"Baloo Chettan 2\", sans-serif;"; 
divBlock.appendChild(countTime);

var pScore = document.createElement("p");
pScore.innerHTML = "Score: <span slass=\"scoreP\"></span>";
countTime.appendChild(pScore);
var pTime = document.createElement("p");
pTime.innerHTML = "Total time: <span slass=\"timeP\"></span>";
countTime.appendChild(pTime);




  // ------- Field with chips

var mainBox = document.createElement("div"); 
mainBox.classList.add("puzzle_board");
mainBox.style.cssText = "margin: 0 auto; text-align: center; width: 100%; max-width: 500px; height: 500px; user-select: none; "+
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

var size = 4;
var width = 400;
var height = width;
var space = 10;
var chipWidth = (width - space/size) /size;
var chipHeight = (height - space/size) /size; 
var data = [];
  
function makeChips() { 
      var chipN = size*size -1;
      for (let k = 0; k < size; k+=1) {
         data.push([]);
         
      }
      for (let i = 0; i < chipN; i+=1) {
            var chipValue = i + 1;
            var chip = document.createElement("DIV"); 
            chip.classList.add("chip");
            chip.innerHTML = chipValue; 
            // chip.style.cssText = "margin: 8px; display: flex; user-select: none; color: #fbf4e6; background-color: rgb(210, 147, 147);" + 
            //     "font-family: \"Baloo Chettan 2\", sans-serif; font-size: 38px; text-shadow: -2px 2px 2px brown;" +
            //     "font-weight: 700; border-radius: 10px; align-items: center; cursor: pointer; justify-content: center;" +
            //     "box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);"; 
            chip.style.cssText = " user-select: none; color: #fbf4e6; background-color: rgb(210, 147, 147);" + 
                "font-family: \"Baloo Chettan 2\", sans-serif; font-size: 38px; text-shadow: -2px 2px 2px brown;" +
                "font-weight: 700; border-radius: 10px; cursor: pointer; box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);" +
                "position: absolute; line-height: 240%; "; 
            chip.style.width = chipWidth+"px";
            chip.style.height = chipHeight+"px";
            chipsContainer.appendChild(chip); 
                     var col = i%size;
                     var row = Math.floor(i/size);
                     positionChip(chip, col, row); 
                     data[row].push(chipValue);
      }
      data[size-1].push(0);
      // console.log(data);
   }
   makeChips();

function positionChip(chip, col, row, smooth) {
   var x = col*(chipWidth + space) + space;
   var y = row*(chipHeight + space) + space;
   if(!smooth){
      chip.style.left = x +"px";
      chip.style.top = y +"px";
   } else {
      chip.style.animation = "chipy 1.5s linear";
   }
   
}







// chip.style.box-shadow =  "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";

// var allChips = document.querySelectorAll(".chip");
// allChips.forEach( (el) => {
//    function clickedChip(event){ 
//       var tile = event.currentTarget;
//       var x,y;
//       const innertile = parseInt(tile.innerHTML);
//          //   console.log(tile.innerHTML);
//          loop:
//          for (let x = 0; x < size; x+=1) {
//             for (let y = 0; y < size; y++) {
//                if(data[x][y] == innertile){
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
//    if(col>0 && data[row][col-1] == 0){
//       x = -1;
//    } else if(col<size-1 && data[row][col+1] == 0){
//       x = 1;
//    } else if(row >0 && data[row-1][col] == 0){
//       y = -1;
//    } else if(row < size-1 && data[row+1][col] == 0){
//       y = 1;
//    } else {
//       return;
//    }
//    const v = data[row][col];
//    data[row+y][col+x] = v;
//    data[row][col] = 0;
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
  for (let i = 3; i < 9; i+=1) { 
      var btn = document.createElement("button");
      var num = document.createTextNode(i); 
      btn.appendChild(num);  
      btn.style.cssText = "margin: 0 auto;  width: 30px; height: 30px; user-select: none; font-size: 18px; font-weight: bold; cursor: pointer;"+
      " border: 2px solid rgba(239, 230, 230, 0.69); border-radius: 50%; text-align: center; line-height: 18px; outline: none;" +
      "box-shadow: 0px 3px 0px #b2a98f, 0px 6px 2px rgba(0,0,0,0.1), 0px 34px 30px rgba(0,0,0,0.1); font-family: \"Baloo Chettan 2\", sans-serif;"; 
      changeSize.appendChild(btn);
         btn.addEventListener("click", changeFieldSize(num));
  }
});

 function changeFieldSize(i) {
    size = i;
 }