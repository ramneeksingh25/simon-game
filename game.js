var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var flag=0;
var level=0;
$(".btn").on("click", function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(gamePattern.length-1);
});
function nextSequence() {
  userClickedPattern=[]
  var rNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[rNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).on("click", function () {
    console.log(randomChosenColor);
    $("#" + randomChosenColor).animate({ opacity: 0.1 }, 1);
    $("#" + randomChosenColor).animate({ opacity: 1 });
  });
  $("h1").text("Level "+level);
  level++;
}
function playSound(color) {
  var audio = new Audio("/sounds/" + color + ".mp3");
  audio.play();
}
function animatePress(currentButton) {
  var cButton=$("#"+currentButton);
  cButton.addClass("pressed") 
  setTimeout(()=>{
    $("#"+currentButton).removeClass("pressed")},100
    )
  }
  
  $('html').on("keydown",function(){
    if (flag==0) {
      flag++;
      nextSequence();   
    }
  })
  function checkAnswer(n) {
    console.log("Checking answer...");
    console.log(gamePattern[n]+" is GameP and  "+userClickedPattern[0]);
    if (gamePattern[n]==userClickedPattern[0]) {
      console.log("Sequence Match");
      setTimeout(nextSequence,1000);
    }
    else{
      console.log("GAME OVER");
      playSound("wrong");
      $('body').addClass("game-over");
      setTimeout(function () {
        $('body').removeClass("game-over");
      },200)
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

  function startOver() {
    level=0;
    gamePattern = [];
    userClickedPattern = [];
    flag=0;
  }