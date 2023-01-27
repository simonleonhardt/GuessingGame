console.log("test")

$('document').ready(function () {
    $('#guessBtn').click(makeGuess);
    $('#newGameBtn').click(startGame);
    $('#guessBox').hide();
    $('#guessBtn').hide();
});

$(window).keypress(function(e) {
    console.log('e is : ', e.keyCode);
    if (e.keyCode == 13) {
        makeGuess();
    }
})

var randomNum = 0;
var theGuess;
var hotRange = 5;
var coldRange = 20;

function getRandomNum() {
    randomNum = Math.floor(Math.random() * 100 + 1);
    console.log(randomNum);
}

function playSound(soundFile) {
    var audio = new Audio(soundFile);
    audio.play();
}

function changeColor (target, key, value) {
    $(target).css(key, value);
}

function startGame () {
    getRandomNum();
    playSound('sounds/startGame.mp3');
    $('#guessBox').show();
    $('#guessBtn').show();
    $('#newGameBtn').hide();
    warmGuessStyles();
    $('#textBox').text('A random number has been selected between 1 and 100. Try to guess it.');
    $('#guessBox').val('');
}

function coldGuessStyles() {
    changeColor('#textBox', 'background-color','lightblue');
    changeColor('#mainBox', 'background-color','lightblue');
    changeColor('#guessBox', 'background-color','blue');
    changeColor('#guessBtn', 'background-color','blue');
    changeColor('#guessBox', 'border-color', 'lightblue');
    changeColor('#guessBtn', 'border-color', 'lightblue');
    changeColor('#textBox', 'border-color', 'blue');
    changeColor('#mainBox', 'border-color', 'blue');
    $('body').css('background-image', "url('images/cold.jpg')");
}

function hotGuessStyles () {
    changeColor('#textBox', 'background-color','red');
    changeColor('#mainBox', 'background-color','red');
    changeColor('#guessBox', 'background-color','darkred');
    changeColor('#guessBtn', 'background-color','darkred');
    changeColor('#guessBox', 'border-color', 'red');
    changeColor('#guessBtn', 'border-color', 'red');
    changeColor('#textBox', 'border-color', 'darkred');
    changeColor('#mainBox', 'border-color', 'darkred');
    $('body').css('background-image', "url('images/hot.jpg')");
}

function warmGuessStyles () {
    changeColor('#textBox', 'background-color','darkgrey');
    changeColor('#mainBox', 'background-color','darkgrey');
    changeColor('#guessBox', 'background-color','grey');
    changeColor('#guessBtn', 'background-color','grey');
    changeColor('#guessBox', 'border-color', 'darkgrey');
    changeColor('#guessBtn', 'border-color', 'darkgrey');
    changeColor('#textBox', 'border-color', 'grey');
    changeColor('#mainBox', 'border-color', 'grey');
    $('body').css('background-image', "url('images/warm.jpg')");
}

function winningStyles () {
    changeColor('#textBox', 'background-color','gold');
    changeColor('#mainBox', 'background-color','gold');
    changeColor('#guessBox', 'background-color','yellow');
    changeColor('#guessBtn', 'background-color','yellow');
    changeColor('#newGameBtn','background-color','yellow');
    changeColor('#guessBox', 'border-color', 'gold');
    changeColor('#guessBtn', 'border-color', 'gold');
    changeColor('#textBox', 'border-color', 'yellow');
    changeColor('#mainBox', 'border-color', 'yellow');
    changeColor('#newGameBtn','border-color','gold');
    $('body').css('background-image', "url('images/win.jpg')");
}



function makeGuess() {
    theGuess = parseInt($('#guessBox').val());
    console.log(theGuess);
    if (theGuess > randomNum) {
        if (theGuess <= randomNum + hotRange && theGuess > randomNum) {
            hotGuessStyles();
            $('#textBox').text('Your guess is too high but you are hot.');
            playSound('sounds/hot.mp3');
        } else if (theGuess >= randomNum + coldRange) {
            coldGuessStyles();
            $('#textBox').text('Your guess is too high and you are cold.');
            playSound('sounds/cold.mp3');
        }else {
            warmGuessStyles();
            $('#textBox').text('Your guess is too high.');
            playSound('sounds/no.mp3')
        }
        $('#guessBox').val('');
    }
    if (theGuess < randomNum) {
        if (theGuess >= randomNum - hotRange && theGuess < randomNum) {
            hotGuessStyles();
            $('#textBox').text('Your guess is too low but you are hot.');
            playSound('sounds/hot.mp3');
        }else if(theGuess <= randomNum - coldRange) {
            coldGuessStyles();
            $('#textBox').text('Your guess is too low and you are cold.');
            playSound('sounds/cold.mp3');
        } else {
            warmGuessStyles();
            $('#textBox').text('Your guess is too low.');
            playSound('sounds/no.mp3');
        }
        $('#guessBox').val('');
    }
    if (theGuess == randomNum) {
        $('#textBox').text('You guessed the right number! The number was ' + randomNum + '.');
        winningStyles();
        $('#guessBox').hide();
        $('#guessBtn').hide();
        $('#newGameBtn').show();
        playSound('sounds/cheer.wav');
    }
    if (isNaN(theGuess)) {
        $('#textBox').text('That is not a number.');
    }
    if (theGuess < 1 || theGuess > 100) {
        $('#textBox').text('Put in a number between 1 and 100');
    }
}