window.addEventListener('load', eventWindowLoaded, false);
var Debugger = function () { };
Debugger.log = function (message) {
  try {
    console.log(message);
  } catch (exception) {
    return;
  }
}
function eventWindowLoaded() {
  canvasApp();
}
function canvasSupport () {
    return Modernizr.canvas;
}
function eventWindowLoaded() {
  canvasApp();
}
function canvasApp() {
  var guesses = 0;
  var message = "Guess The Letter From a (lower) to z (higher)";
  var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var today = new Date();
  var letterToGuess = "";
  var higherOrLower = "";
  var lettersGuessed;
  var gameOver = false;

  if (!canvasSupport()) {
       return;
      }

  var theCanvas = document.getElementById("canvasOne");
  var context = theCanvas.getContext("2d");

  initGame();

  function initGame() {
    var letterIndex = Math.floor(Math.random() * letters.length);
    letterToGuess = letters[letterIndex];
    guesses = 0;
    lettersGuessed = [];
    gameOver = false;
    window.addEventListener("keyup",eventKeyPressed,true);
    var formElement = document.getElementById("createImageData");
    formElement.addEventListener('click', createImageDataPressed, false);
    drawScreen();
  }

  function eventKeyPressed(e) {
    if (!gameOver) {
      var letterPressed = String.fromCharCode(e.keyCode);
      letterPressed = letterPressed.toLowerCase();
      guesses++;
      lettersGuessed.push(letterPressed);

      if (letterPressed == letterToGuess) {
        gameOver = true;
      } else {

        letterIndex = letters.indexOf(letterToGuess);
        guessIndex = letters.indexOf(letterPressed);
        Debugger.log(guessIndex);
        if (guessIndex < 0) {
          higherOrLower = "That is not a letter";
        } else if (guessIndex > letterIndex) {
          higherOrLower = "Lower";
        } else {
          higherOrLower = "Higher";
        }

      }
      drawScreen();
      }
  }

  function drawScreen() {
    //Background
    context.fillStyle = "aqua";
    context.fillRect(0, 0, 500, 300);
    context.globalAlpha = 0.1;
    //Box
    context.strokeStyle = "#000000";
    context.strokeRect(5,  5, 490, 290);
    context.textBaseline = "top";
    //Date
    context.globalAlpha = 0.5;
    context.fillStyle    = "#000000";
    context.font         = "10px Helvetica";
    context.fillText  (today, 150 ,10);
    //Message
    context.globalAlpha = 1;
    context.fillStyle    = "#109910";
    context.font         = "14px Helvetica";
    context.fillText  (message, 125, 30);
    //Guesses
    context.globalAlpha = 1;
    context.fillStyle    = "#109910";
    context.font         = "16px Helvetica";
    context.fillText  ('Guesses: ' + guesses, 215, 50);
    //Higher Or Lower
    context.globalAlpha = 1;
    context.fillStyle    = "#000000";
    context.font         = "16px Helvetica";
    context.fillText  ("Higher Or Lower: " + higherOrLower, 150,125);
    //Letters Guessed
    context.globalAlpha = 1;
    context.fillStyle    = "#109910";
    context.font         = "16px Helvetica";
    context.fillText  ("Your guesses: " + lettersGuessed.toString(), 10, 260);
    if (gameOver) {
      context.fillStyle    = "#FFFFFF";
      context.font         = "40px Helvetica";
      context.fillText  ( "You Got it!", 150, 180);
    }



  }

  function createImageDataPressed(e) {

    window.open(theCanvas.toDataURL(),"canavsImage","left=0,top=0,width=" + theCanvas.width + ",height=" + theCanvas.height +",toolbar=0,resizable=0");

  }

}
