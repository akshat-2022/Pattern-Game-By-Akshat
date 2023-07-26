let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;


$(document).keypress(function(event){
  if(!started){
  nextSequence();
  $("#level-title").text("Level " + level);
  started = true;
  //console.log(event.key);
}
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  animatePress(userChosenColour);
  let indexNumber = buttonColors.indexOf(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  //console.log(userClickedPattern);
});



function nextSequence(){
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  let increasedLevel = level++;
$("#level-title").text("Level " + increasedLevel);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
// $("#" + randomChosenColor).on("click", function(){
//   //$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
//   let activeBtn = $("#" + randomChosenColor);
//   activeBtn.addClass("pressed");
//   setTimeout(function(){
//     activeBtn.removeClass("pressed");
//   }, 100);
//
// });

//console.log(randomChosenColor);
playSound(randomChosenColor);
userClickedPattern = [];

}

function animatePress(currentColor){
  let activeBtn = $("#" + currentColor);
  activeBtn.addClass("pressed");
  setTimeout(function(){
    activeBtn.removeClass("pressed");
  }, 100);
}

function playSound(name){

  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function checkAnswer(currentLevel){
  let checkingColor = gamePattern[currentLevel];
  let userColor = userClickedPattern[currentLevel];
  if(checkingColor === userColor){
    console.log("success");
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

    //nextSequence();
  }
  else{
    console.log("failed");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    startOver();
  }
  console.log("gamePattern" + gamePattern);
  console.log("userClickedPattern" + userClickedPattern);

}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
