
// Example usage

document.addEventListener("DOMContentLoaded", function () {
    generateRandomEllipticalRotation('salvage', pLettersData)
    generateRandomEllipticalRotation('Dragon', eLettersData)

    pLettersData.forEach(function (letterData) {
        createOrbit(letterData.radiusX, letterData.radiusY, letterData.letter, document.getElementById('pOrbitContainer'));
    });
    eLettersData.forEach(function (letterData) {
        createOrbit(letterData.radiusX, letterData.radiusY, letterData.letter, document.getElementById('eOrbitContainer'));
    });
});

var pLettersData = [];
var eLettersData = [];

function startCountdown() {
    var butt = document.getElementById('playBut');
    butt.style.display = 'none';
    cancelOrbit();
}

var eContinueOrbit = true;
var pContinueOrbit = true;
var continueOrbit = true;
function createOrbit(radiusX, radiusY, letter, orbitContainer) {
    var rotatingLetter = document.createElement('div');
    rotatingLetter.id = 'rotatingLetter';
    rotatingLetter.textContent = letter;
    rotatingLetter.style.fontFamily = 'Madimi One';
    rotatingLetter.style.color = 'white'; // Set text color to transparent
    rotatingLetter.style.textOutline = '20px solid gold'; // Set the outline color and thickness
    rotatingLetter.style.fontSize = '24px'; // Set the font size
    rotatingLetter.style.textShadow = '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'; // Add text-shadow
    orbitContainer.appendChild(rotatingLetter);

    var randomAngle = Math.random() * (2 * Math.PI);
    var centerX = 100 + 50 * Math.cos(randomAngle);
    var centerY = 100 + 100 * Math.sin(randomAngle);
    var angle = 0;

    setInterval(function () {
        if (continueOrbit) {
            var x = centerX + radiusX * Math.cos(angle);
            var y = centerY + radiusY * Math.sin(angle);

            rotatingLetter.style.left = x + "px";
            rotatingLetter.style.top = y + "px";
            angle += 0.02; // Adjust the speed of rotation{
        }
    }, 30);
}

function generateRandomEllipticalRotation(word, lettersData) {

    // Calculate the total number of characters in the word
    var totalCharacters = word.length;

    // Split the word into an array of characters
    var characters = word.split('');
    var usedRadius = 0;
    // Generate random radius values for each character
    characters.forEach(function (char) {
        // Generate random values for radiusX and radiusY
        var radiusX = Math.random() * (130 - usedRadius);
        var radiusY = Math.random() * (130 - usedRadius - radiusX);

        // Add a fixed difference of 15 between each radius
        radiusX += 50;
        radiusY += 50;

        // Create the letter data object
        var letterData = { letter: char, radiusX: radiusX, radiusY: radiusY };

        // Add the letter data to the array
        lettersData.push(letterData);

        // Update the used radius
        usedRadius += radiusX + radiusY;
    });

}


function cancelOrbit() {
    continueOrbit = false;
    wordFormation(-100, document.getElementById('eOrbitContainer'));
}
function getAllChildren(container) {
    var children = container.children;
    return Array.from(children);
}
function wordFormation(commonX, orbitContainer) {
    var rotatingLetterElements = getAllChildren(orbitContainer);
    var screenHeight = window.innerHeight;
    var letterHeight = rotatingLetterElements.length > 0 ? rotatingLetterElements[0].offsetHeight : 0;
    var iterationCount = 0;
    rotatingLetterElements.forEach(function (element, index) {
        setTimeout(function () {
            var offsetY = (index * (screenHeight / rotatingLetterElements.length)) + (letterHeight / 2);
            offsetY = Math.max(Math.min(offsetY, screenHeight - letterHeight), 0) - 175;
            element.style.position = 'absolute';
            element.style.left = commonX + 'px';
            element.style.top = offsetY + 'px';
            element.classList.add('rotating-letter');
            iterationCount++;
            if (iterationCount === rotatingLetterElements.length) {
                attackPlayer()
            }
        }, index * 1000);
    });

    function attackPlayer() {
        setTimeout(function () {
            rotatingLetterElements.forEach(function (element, index) {
                // Calculate the new position for the attack
                var position = parseInt(element.style.left, 10);
                position -= 800;
                element.classList.add('eAttack-transition');
                element.style.left = position + 'px';
                setTimeout(function () {
                    attackFinish();
                }, 1000);
            });
        }, 1000);
    }
    function attackFinish() {
        rotatingLetterElements.forEach(function (element) {
            element.remove();
        });
    }
}
