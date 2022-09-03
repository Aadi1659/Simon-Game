var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var userChosenColour = [];

$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenColour[currentLevel]) {
    console.log("success");
    if (userChosenColour.length === gamePattern.length) {
      console.log("end");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over Press any key to continue...");

    startOver();
  }
}

function nextSequence() {
  userChosenColour = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + level);

  level++;
}

$(".btn").click(function () {
  var colour = $(this).attr("id");
  userChosenColour.push(colour);
  playSound(colour);
  animatePress(colour);
  checkAnswer(userChosenColour.length - 1);
});

function playSound(name) {
  audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 70);
}
