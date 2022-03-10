// ---------------- Declare Variables ----------------   

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


// ---------------- Functions ----------------
// Show The Next Sequence
function nextSequence() {
    userClickedPattern = [];
    
    level++;
    $("#level-title").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); // Add random colors to the gamePattern array

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100); // Select the element and add flash
    playSound(randomChosenColor);    
    console.log(`gamePattern: ${gamePattern}`);
    
}

// Play Sound
function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

// Add Animation
function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

// Check Answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) { // Check whether user only clicked one button
            setTimeout(function () {
                nextSequence();
            }, 1000);
            
        } 
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// Start Over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// ---------------- Main ----------------

// User clicks
$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id"); // Outputs a color
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
}); 


// First key press
$(document).on("keypress", function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();  
        started = true;
    }
});


