let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ['red', 'blue', 'green', 'yellow'];
let level = 0;
let start = false;
$(document).on('keydown', function() {
   if (start === false) {
      $('h1').text('Level ' + level);
      start = true;
      nextSequence();
   }
});

$('.btn').on('click', function() {
   let userChoosenColor = this.id;
   userClickedPattern.push(userChoosenColor);
   animatePress(userChoosenColor);
   gameSounds(userChoosenColor);
   checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(userIdx) {
   if (userClickedPattern[userIdx] === gamePattern[userIdx]) {
      if (userClickedPattern.length === gamePattern.length) {
         setTimeout(function() {
            nextSequence();
         }, 1000);
      }
   } else {
      gameOver();
   }
}
function nextSequence() {
   userClickedPattern = [];
   level++;
   $('h1').text('Level ' + level);
   let randomNumber = Math.floor(Math.random() * 4);
   let randomChoosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChoosenColor);
   gameSounds(randomChoosenColor);
}

function gameSounds(color) {
   $('#' + color)
      .fadeOut(100)
      .fadeIn(100);
   audio = new Audio('sounds/' + color + '.mp3');
   audio.play();
}

function animatePress(userChoosenColor) {
   $('#' + userChoosenColor).addClass('pressed');
   setTimeout(function() {
      $('.btn').removeClass('pressed');
   }, 100);
}

function gameOver() {
   gameSounds('wrong');
   $('body').addClass('game-over');
   $('h1').text('Game Over, press any key to Start again');
   setTimeout(function() {
      $('body').removeClass('game-over');
   }, 200);

   startOver();
}
function startOver() {
   level = 0;
   gamePattern = [];
   start = false;
}
