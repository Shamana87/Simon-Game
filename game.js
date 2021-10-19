var gameSequence = [];
var chosenSequence = [];
var level = 0;

$(document).keypress(function() {
  if (level === 0) {
    gameSequence.push(nextTask());
  }
})

$(".btn").click(function() {
  var userChosenColor;
  userChosenColor = $(this).attr("id");
  chosenSequence.push(userChosenColor);
  animate(userChosenColor);
  sound(userChosenColor);

  if (gameSequence.length === chosenSequence.length) {
    var result = checkAnswer();
    if (result === "Game Over!") {
      $("#level-title").html(result);
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 100);
      $(".restartGame").css("visibility", "visible");
      $(".restartGame").click(function() {
        $(".restartGame").css("visibility", "hidden");
        $("#level-title").html("Press any key to start!");
        startOver();
      });
    }
  }

})


function checkAnswer() {
  for (var i = 0; i < gameSequence.length; i++) {
    if (gameSequence[i] != chosenSequence[i]) {
      return "Game Over!";
    }
  }
  chosenSequence.length = 0;
  setTimeout(function() {
    gameSequence.push(nextTask());
  }, 1000);
}

function nextTask() {
  level++;
  $("#level-title").html("Level " + level);

  var variabl = Math.floor(Math.random() * 4);
  var colorInterpretation;
  switch (variabl) {
    case 0: {
      animate("green");
      sound("green");
      colorInterpretation = "green";
      break;
    }
    case 1: {
      animate("red");
      sound("red");
      colorInterpretation = "red";
      break;
    }
    case 2: {
      animate("yellow");
      sound("yellow");
      colorInterpretation = "yellow";
      break;
    }
    case 3: {
      animate("blue");
      sound("blue");
      colorInterpretation = "blue";
      break;
    }
  }
  return colorInterpretation;
}

function animate(buttonsColor) {
  $("#" + buttonsColor).addClass("pressed");
  setTimeout(function() {
    $("#" + buttonsColor).removeClass("pressed")
  }, 100);
}

function sound(buttonsColor) {
  var sound = new Audio("sounds/" + buttonsColor + ".mp3");
  sound.play();
}

function startOver() {
  gameSequence.length = 0;
  chosenSequence.length = 0;
  level = 0;
}
