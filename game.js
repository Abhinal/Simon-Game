var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var is_game_start = false;
var level = 0;

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    is_game_start = false;
    level = 0;
}

function checkAnswer() {
    var idx = userClickedPattern.length - 1
    if (gamePattern[idx] != userClickedPattern[idx]) {
        playSound("wrong");
        $("body").addClass("game-over");
        $('h1').text("Game Over, Press Any Key to Restart.");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        startOver()
    }

    else if (gamePattern.length == userClickedPattern.length) {
        setTimeout(() => {
            nextSequence();
            userClickedPattern = [];
        }, 1000);
    }

}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play()
}

function btnAnimation(color) {
    $("#" + color).addClass("pressed")
    setTimeout(() => $("#" + color).removeClass("pressed"), 100);
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    btnAnimation(randomChosenColour);
    playSound(randomChosenColour);
    $("h1").text("Level " + level++);
    gamePattern.push(randomChosenColour);
}

$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    btnAnimation(userChosenColor);
    playSound(userChosenColor);
    checkAnswer();
});

$(document).keypress(() => {
    if (!is_game_start) {
        nextSequence();
        is_game_start = true;
    }
})

