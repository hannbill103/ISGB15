'use strict';

/*
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};
let start = true; //boolean för undantagshantering i validateGame();
var drag = false; //boolean för timerfunkion
var intervalID; //interval ID

/*
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');

    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'O', '', 'O', '', 'O', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O');

    //DRAW:
    //oGameData.gameField = Array('X', 'O', 'X','O', 'O', 'X', 'X', 'X', 'O');
    //No Win:
    //oGameData.gameField = Array('', '', '', '', '', '', '', '', '');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = 'X';

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = 'O';

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin 'bricka'.
    oGameData.currentPlayer = '';

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = '';

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = '';

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = '';

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = '';

    //'Flagga' som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen.
    oGameData.timerId = null;

}

/*
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkHorizontal() {

  if(((oGameData.gameField[0] === 'X')
    && (oGameData.gameField[1] === 'X')
    && (oGameData.gameField[2] === 'X'))
    || ((oGameData.gameField[3] === 'X')
    && (oGameData.gameField[4] === 'X')
    && (oGameData.gameField[5] === 'X'))
    || ((oGameData.gameField[6] === 'X')
    && (oGameData.gameField[7] === 'X')
    && (oGameData.gameField[8] === 'X'))) {

    console.log('Horizontal');
    return 1;
  }

  else if(((oGameData.gameField[0] === 'O')
    && (oGameData.gameField[1] === 'O')
    && (oGameData.gameField[2] === 'O'))
    || ((oGameData.gameField[3] === 'O')
    && (oGameData.gameField[4] === 'O')
    && (oGameData.gameField[5] === 'O'))
    || ((oGameData.gameField[6] === 'O')
    && (oGameData.gameField[7] === 'O')
    && (oGameData.gameField[8] === 'O'))) {

    console.log('Horizontal');
    return 2;
  }

}

function checkVertical() {

  if(((oGameData.gameField[0] === 'X')
    && (oGameData.gameField[3] === 'X')
    && (oGameData.gameField[6] === 'X'))
    || ((oGameData.gameField[1] === 'X')
    && (oGameData.gameField[4] === 'X')
    && (oGameData.gameField[7] === 'X'))
    || ((oGameData.gameField[2] === 'X')
    && (oGameData.gameField[5] === 'X')
    && (oGameData.gameField[8] === 'X'))) {

    console.log('Vertical');
    return 1;
  }

  else if(((oGameData.gameField[0] === 'O')
    && (oGameData.gameField[3] === 'O')
    && (oGameData.gameField[6] === 'O'))
    || ((oGameData.gameField[1] === 'O')
    && (oGameData.gameField[4] === 'O')
    && (oGameData.gameField[7] === 'O'))
    || ((oGameData.gameField[2] === 'O')
    && (oGameData.gameField[5] === 'O')
    && (oGameData.gameField[8] === 'O'))) {

    console.log('Vertical');
    return 2;
  }

}

function checkDiagonalLeftToRight() {

  if((oGameData.gameField[0] === 'X')
    && (oGameData.gameField[4] === 'X')
    && (oGameData.gameField[8] === 'X')) {

    console.log('Left to Right');
    return 1;
  }

  else if((oGameData.gameField[0] === 'O')
    && (oGameData.gameField[4] === 'O')
    && (oGameData.gameField[8] === 'O')) {

    console.log('Left to Right');
    return 2;
  }

}

function checkDiagonalRightToLeft() {

  if((oGameData.gameField[2] === 'X')
    && (oGameData.gameField[4] === 'X')
    && (oGameData.gameField[6]) === 'X') {

    console.log('Right to Left');
    return 1;
  }

  else if((oGameData.gameField[2] === 'O')
    && (oGameData.gameField[4] === 'O')
    && (oGameData.gameField[6]) === 'O') {

    console.log('Right to Left');
    return 2;
  }

}

function checkForDraw() {

  let check = oGameData.gameField;
  if(check.includes('') === false) {

    return 3;
  }

  else if(check.includes('') === true) {

    return 0;
  }

}

oGameData.checkForGameOver = function() {

 

  let horizontal = checkHorizontal();
  let vertical = checkVertical();
  let diagonalLTR = checkDiagonalLeftToRight();
  let diagonalRTL = checkDiagonalRightToLeft();
  let draw = checkForDraw();

    if((horizontal === 1)
      || (vertical === 1)
      || (diagonalLTR === 1)
      || (diagonalRTL === 1)) {

        console.log('Win för X.');
        return 1;
    }

    else if((horizontal === 2)
      || (vertical === 2)
      || (diagonalLTR === 2)
      || (diagonalRTL === 2)) {

        console.log('Win för O.');
        return 2;
    }

    else {

      if(draw == 3) {

        console.log('Draw.');
        return 3;

      } else if(draw == 0) {

        console.log('No winner.');
        return 0;
      }
    }

}

// Laboration 2
window.addEventListener("load", () => {

  timer();

  oGameData.initGlobalObject();
  

  //Sätter klassen på game-area till d-none
  let gameArea = document.getElementById("game-area");
  if (gameArea) {
    gameArea.className = "d-none";
  } else {
    console.log("Error: Could not aquire game-area Object");
  }

  //Lägger till en lysnare på start knappen som kör validateForm()
  let startBtn = document.getElementById("newGame");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      validateForm();
    });
  } else {
    console.log("Error: Could not aquire Start Button Object");
  }
});

// Funktion som validerar formuläret
function validateForm() {
  // Try-catch
  try {
    // Hämtar element med id nick1 och nick2
    let nick1 = document.getElementById("nick1");
    let nick2 = document.getElementById("nick2");

    // Kollar om värdet på längden är mindre än 5, kastar felmeddelande
    if (nick1.value.length < 5 || nick2.value.length < 5) {
      throw new Error("Spelarnamnen måste vara minst 5 tecken långa.");
    }

    // Kollar om värdet på nick1 är samma som nick2, kastar felmeddelande
    if (nick1.value === nick2.value) {
      throw new Error("Spelarna måste ha olika namn.");
    }

    // Hämtar element med id color1 och color2
    let color1 = document.getElementById("color1");
    let color2 = document.getElementById("color2");

    // Kollar om värdet är vit färg, kastar felmeddelande
    if (color1.value === "#ffffff" || color2.value === "#ffffff") {
      throw new Error("Vit färg får inte användas.");
    }

    // Kollar om värdet är svart färg, kastar felmeddelande
    if (color1.value === "#000000" || color2.value === "#000000") {
      throw new Error("Svart färg får inte användas.");
    }

    // Kollar om värdet är samma färg, kastar felmeddelande
    if (color1.value === color2.value) {
      throw new Error("Spelarna måste använda olika färger.");
    }
    start = true;

    // Kallar på initiateGame funktionen
    initiateGame();
    // Fångar felmeddelanden
  } catch (e) {
    // Sätter felmeddelande till elementet med id errorMsg
    let msgBox = document.getElementById("errorMsg");
    // msgBox.innerText = e;
    msgBox.textContent = e;

    start = false
  }
}


function initiateGame() {

  let nick1 = document.getElementById("nick1");
  let nick2 = document.getElementById("nick2");
  let color1 = document.getElementById("color1");
  let color2 = document.getElementById("color2");

  //lägger till klassen 'd-none' i div-in-form
  document.getElementById('div-in-form').classList.add('d-none');
  //Tar bort klassen 'd-none' i game-area
  document.getElementById('game-area').classList.remove('d-none');
  //"Rensar" innehållet i errorMsg
  document.getElementById('errorMsg').innerHTML = '';

  oGameData.nickNamePlayerOne = nick1.value;
  oGameData.nickNamePlayerTwo = nick2.value;
  oGameData.colorPlayerOne = color1.value;
  oGameData.colorPlayerTwo = color2.value;

  //Sparar alla data-id i spelplan
  let spelplan = document.querySelectorAll('[data-id]');
    for(let i = 0; i < spelplan.length; i++) {

      //"Rensar" td-elementen
      spelplan[i].textContent = '';
      spelplan[i].style.backgroundColor='white';
    }

  let playerChar;
  let playerName;
  let random = Math.random();

    if(random < 0.5) {

      playerChar = oGameData.playerOne;
      playerName = oGameData.nickNamePlayerOne;
      oGameData.currentPlayer = oGameData.playerOne;
    } else if (random >= 0.5) {

      playerChar = oGameData.playerTwo;
      playerName = oGameData.nickNamePlayerTwo;
      oGameData.currentPlayer = oGameData.playerTwo;
    }



    document.querySelector('h1').innerHTML = '<b>Aktuell spelare är: ' + playerName + ' (' + playerChar + ') </b>';

 //Om checkbox är kryssad, börja en timer
 let check = document.querySelector("#timer");
 if (check.checked == true){
 
 //anropar intervall funktionen
  intervalID = setInterval(interval, 5000);
 } 

    //Sista funktionen i initiateGame();
    let table = document.querySelector('table');
    table.addEventListener('click', executeMove);
  }
  
  function executeMove(event) {
    drag = true;
 
    //Kontrollera om checkbox är kryssad
    let check = document.querySelector("#timer");
    if(check.checked == true){
    
    //Starta om timer-funktion
    clearInterval(intervalID);
    intervalID = setInterval(interval, 5000);
    }
  
    let click = event.target;
  
      //Om klick sker på elementet td.
      if(click.tagName == 'TD') {
        let tdn = event.target.getAttribute('data-id');
        if (oGameData.gameField[tdn]==='')
  
        //Kontrollera så att cellen är ledig.
        if((click.textContent !== 'X')
          && (click.textContent !== 'O')) {
  
            //Om cellen är ledig, hämta ut attributet data-id och lägg till currentPlayer.
            let data_id = click.getAttribute('data-id');
            oGameData.gameField[data_id] = oGameData.currentPlayer;
  
              if(oGameData.currentPlayer == oGameData.playerOne) {
  
                click.textContent = oGameData.playerOne;
                click.style.backgroundColor = color1.value;
  
                //Ändra currentPlayer till nästa spelare när spelaren har gjort sitt drag.
                oGameData.currentPlayer = oGameData.playerTwo;
                document.querySelector('h1').innerHTML = '<b>Aktuell spelare är: ' + nick2.value + ' (' + oGameData.playerTwo + ') </b>';
              } else if(oGameData.currentPlayer == oGameData.playerTwo) {
  
                click.textContent = oGameData.playerTwo;
                click.style.backgroundColor = color2.value;
  
                //Ändra currentPlayer till nästa spelare.
                oGameData.currentPlayer = oGameData.playerOne;
                document.querySelector('h1').innerHTML = '<b>Aktuell spelare är: ' + nick1.value + ' (' + oGameData.playerOne + ') </b>';
              }
  
              let checkForWin = oGameData.checkForGameOver();//anropar rättningsfunktion
  
              if(checkForWin == 1
                || checkForWin == 2
                || checkForWin == 3) {
                  window.clearInterval(intervalID);
                  this.removeEventListener('click', executeMove); //tar bort lyssnare
                  document.querySelector('#div-in-form').classList.remove('d-none'); // tar bort klassen på formuläret
  
                  if(checkForWin == 1) {
  
                    document.querySelector('h1').innerHTML = '<b>Vinnare: ' + nick1.value + ' (' + oGameData.playerOne + ')! Spela igen? </b>';
                  } else if(checkForWin == 2) {
  
                    document.querySelector('h1').innerHTML = '<b>Vinnare: ' + nick2.value + ' (' + oGameData.playerTwo + ')! Spela igen? </b>';
                  } else if(checkForWin == 3 || checkForWin == 0) {
  
                    document.querySelector('h1').innerHTML = '<b>Oavgjort. Spela igen?</b>';
                  }
  
                  
                  document.querySelector('#game-area').classList.add('d-none');// lägger till klassen på elementet med id game-area
                  oGameData.initGlobalObject();// Anropar funktionen initGlobalObject i oGameData
              }
          }     
          drag = false; 
        }
  }
  //uppgift4
//timer 
function timer() {
  //skapa en ny div 
  var timerdiv = document.createElement('div');
  
  //skapa cheakbox och label
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'timer';
  var label = document.createElement('label');
  label.htmlFor = 'timer';
  
  //sätta värdet på label
  label.appendChild(document.createTextNode('Vill du begränsa tiden till 5 sekunder per drag?'));

  //Addera cheackbox & label till den nya diven och sätt diven förre knapp
  let form = document.getElementById('div-in-form');
  var lastdiv= document.getElementById("div-with-a");
  form.insertBefore(timerdiv, lastdiv);
  timerdiv.appendChild(checkbox);
  timerdiv.appendChild(label);     

}

//Funktionen som byter tur varje 5 sekunder om aktuell spelare inte gör sitt drag
function interval (){

  // variabel för h1-elementet som nås i hela funktionen
  var headerone =  document.querySelector("h1");

  // if-sats som gör olika utskrifter i h1 beroende på vems tur det är

  if (drag == false){
      if (oGameData.currentPlayer == oGameData.playerOne){  
          
          //ändra tur till spelare 2 och uppdatera utskrift
          oGameData.currentPlayer = oGameData.playerTwo; 
          headerone.textContent = "Aktuell spelare är " + oGameData.nickNamePlayerTwo + " (" + oGameData.playerTwo + ")";

      }
      
      else if (oGameData.currentPlayer == oGameData.playerTwo){
          //ändra tur till spelare 1 och uppdatera utskrift
          oGameData.currentPlayer = oGameData.playerOne;    
          headerone.textContent = "Aktuell spelare är " +  oGameData.nickNamePlayerOne+ " ("+ oGameData.playerOne+ ")";
          
      }
 }
 // om någon har gjort ett drag så ändras boolen drag till "false"
 else if (drag == true){
     drag = false;
 }
}
