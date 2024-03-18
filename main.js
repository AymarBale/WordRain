var state = [
    { name: 'playerState', data: ['stare', 'idle', 'attack', 'damage', 'death'] },
    { name: 'enemyState', data: ['stare', 'idle', 'attack', 'damage', 'death'] }
]
var EwordArray = ['ATTACK', 'reservoir', 'interrupt', 'citizen', 'bow']
var PwordArray = ['orange', 'test', 'restrain', 'hobby', 'lazy'];
EwordArray = EwordArray.map(function (word) {
    return word.toUpperCase();
});
PwordArray = PwordArray.map(function (word) {
    return word.toUpperCase();
});
pCurrState = '';
eCurrState = ''
index = 0;
var roundCount = 0;
var enemy_attack_pos = 0;
var player_attack_pos = 0;
var counterOpportunity = false
var box;
function setPlayerState(newState) {
    pCurrState = newState;
    switch (pCurrState) {
        case 'stare':
            generateAnimation(document.getElementById('player'),
                './Lmage/Mage-Cyan.png', 32.5, 40, 0, 0, 15, 2);
            //console.log('Player is staring.');
            break;
        case 'idle':
            generateAnimation(document.getElementById('player'),
                './Lmage/Mage-Cyan.png', 32.5, 30, 0, 2, 15, 2);
            //console.log('Player is idle.');
            break;
        case 'attack':
            generateAnimation(document.getElementById('player'),
                './Lmage/Mage-Cyan.png', 32.5, 30, 13, 2, 15, 15);
            //console.log('Player is attacking.');
            break;
        case 'damage':
            generateAnimation(document.getElementById('player'),
                './Lmage/Mage-Cyan.png', 32, 30, 18, 2, 15, 20); // Handle damage state for player
            //console.log('Player is taking damage.');
            break;
        case 'death':
            generateAnimation(document.getElementById('player'),
                './Lmage/Mage-Cyan.png', 32, 30, 21, 2, 15, 24);
            //console.log('Player is dead.');
            break;
        default:
        //console.log('Invalid player state.');
    }
}

// Example function to handle enemy state change
function setEnemyState(newState) {
    eCurrState = newState;

    switch (eCurrState) {
        case 'stare':
            generateAnimation(document.getElementById('enemy'),
                './Lmage/Mage-Red.png', 32.5, 40, 0, 0, 15, 2);
            //console.log('Enemy is staring.');
            break;
        case 'idle':
            generateAnimation(document.getElementById('enemy'),
                './Lmage/Mage-Red.png', 32.5, 30, 0, 2, 15, 2);
            //console.log('Enemy is idle.');
            break;
        case 'attack':
            generateAnimation(document.getElementById('enemy'),
                './Lmage/Mage-Red.png', 32.5, 30, 13, 2, 15, 15);
            //console.log('Enemy is attacking.');
            break;
        case 'damage':
            generateAnimation(document.getElementById('enemy'),
                './Lmage/Mage-Red.png', 32, 30, 18, 2, 15, 20);
            //console.log('Enemy is taking damage.');
            break;
        case 'death':
            generateAnimation(document.getElementById('enemy'),
                './Lmage/Mage-Red.png', 32, 30, 21, 2, 15, 24);
            //console.log('Enemy is dead.');
            break;
        default:
        //console.log('Invalid enemy state.');
    }
}
function generateAnimation(canvas, src, spriteW, spriteH, frameX, frameY, staggerFrames, maxFrame) {

    let ctx = canvas.getContext('2d');
    let initFrame = frameX
    canvas.width = 1.5 * 65;
    canvas.height = 1.5 * 56;
    let gameFrame = 0;
    CANVAS_HEIGHT = canvas.width;
    CANVAS_WIDTH = canvas.height;
    const playerImg = new Image();
    playerImg.src = src;
    function animate() {
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(playerImg, frameX * spriteW, frameY * spriteH, spriteW, spriteH, 0, 0, spriteW * 3, spriteH * 3);
        if (gameFrame % staggerFrames == 0) {

            if (frameX < maxFrame - 1) { frameX++; }

            else frameX = initFrame;
        }
        gameFrame++;/**/
        requestAnimationFrame(animate);
    }
    animate()
}
// Example usage




function createPlayerLetter(word) {
    pContinueOrbit = true;
    generateRandomEllipticalRotation(word, pLettersData);
    pLettersData.forEach(function (letterData) {
        PcreateOrbit(letterData.radiusX, letterData.radiusY, letterData.letter, document.getElementById('pOrbitContainer'));
    });
}
function createEnemyLetter(word) {
    eContinueOrbit = true;
    generateRandomEllipticalRotation(word, eLettersData);
    eLettersData.forEach(function (letterData) {
        EcreateOrbit(letterData.radiusX, letterData.radiusY, letterData.letter, document.getElementById('eOrbitContainer'));
    });
}
var pLettersData = [];
var eLettersData = [];
var pAnswer = [];
var pContinueOrbit = true;
var eContinueOrbit = true;
var commonPlayer = [0];
var selectedRule;
function startCountdown() {
    showHeartsOneByOne();
    setPlayerState('idle');
    setEnemyState('idle');

    var butt = document.getElementById('playBut');
    butt.style.display = 'none';
    let mainImg = document.querySelector('img');
    mainImg.style.display = 'none';
    var countdownElement = document.getElementById('countdown');


    var countdownValue = 3;

    function updateCountdown() {
        countdownElement.textContent = countdownValue;
        if (countdownValue > 0) {
            countdownValue--;
        }
        if (countdownValue === 0) {
            setTimeout(function () {
                countdownElement.style.display = 'none';
                document.getElementById('ruleset').style.display = 'flex';
                var pOrbitContainer = document.getElementById('pOrbitContainer');
                var eOrbitContainer = document.getElementById('eOrbitContainer');
                var ruleset = document.getElementById('ruleset');
                pOrbitContainer.style.display = 'inline-block';
                eOrbitContainer.style.display = 'inline-block';
                pOrbitContainer.style.visibility = 'visible';
                eOrbitContainer.style.visibility = 'visible';
                ruleset.style.display = 'inline-block';
                round();
            }, 1000);
            // Hide the countdown after reaching 0
            clearInterval(countdownInterval); // Stop the countdown interval
        }
    }

    // Show the countdown element
    countdownElement.style.display = 'block';

    // Update the countdown every second
    var countdownInterval = setInterval(updateCountdown, 1000);

    // Stop the countdown after 3 seconds (adjust as needed)
    setTimeout(function () {
        clearInterval(countdownInterval);
        //setInterval(randomizeRulePosition, 4000);
    }, 3000);

}

function EcreateOrbit(radiusX, radiusY, letter, orbitContainer) {
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
        if (eContinueOrbit) {
            var x = centerX + radiusX * Math.cos(angle);
            var y = centerY + radiusY * Math.sin(angle);

            rotatingLetter.style.left = x + "px";
            rotatingLetter.style.top = y + "px";

            angle += 0.02; // Adjust the speed of rotation
        }
    }, 30);
}

function PcreateOrbit(radiusX, radiusY, letter, orbitContainer) {
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
        if (pContinueOrbit) {
            var x = centerX + radiusX * Math.cos(angle);
            var y = centerY + radiusY * Math.sin(angle);

            rotatingLetter.style.left = x + "px";
            rotatingLetter.style.top = y + "px";

            angle += 0.02; // Adjust the speed of rotation
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

function randomizeRulePosition() {
    var rules = document.querySelectorAll('.rule');

    // Generate a random number between 1 and 4
    var randomIndex = Math.floor(Math.random() * 4) + 1;

    setTimeout(function () {
        selectedRule = rules[randomIndex - 1]; // Adjust index to match array (0-based)
        selectedRule.style.position = 'absolute';
        selectedRule.style.top = '-50vh';
        selectedRule.style.left = '50%';
        selectedRule.style.transform = 'translate(-50%, -50%)';
    }, 1000);


}

function cancelRulePosition(selectedRule) {
    selectedRule.style.position = 'initial';
    selectedRule.style.top = 'initial';
    selectedRule.style.left = 'initial';
    selectedRule.style.transform = 'initial';
}
function round() {
    pAnswer = [];

    if (roundCount < 5) {
        if (selectedRule !== null) {
            cancelRulePosition(selectedRule);
        }
        setTimeout(function () {
            randomizeRulePosition();
            setTimeout(function () {
                setEnemyState("attack");
                cancelOrbit();
            }, 2000);
        }, 3000);
    } else {
        console.log(roundCount + " is over");
    }
}

function cancelOrbit() {
    var filler = document.getElementById("filler");
    filler.style.display = 'inline-block';
    eContinueOrbit = false;
    counterOpportunity = true;
    eWordFormation(-100, document.getElementById('eOrbitContainer'));
    console.log("in");
}
function getAllChildren(container) {
    var children = container.children;
    return Array.from(children);
}

function eWordFormation(commonX, orbitContainer) {
    var rotatingLetterElements = getAllChildren(orbitContainer);
    var screenHeight = window.innerHeight;
    var letterHeight = rotatingLetterElements.length > 0 ? rotatingLetterElements[0].offsetHeight : 0;
    var middleIndex = Math.floor(rotatingLetterElements.length / 2);
    var iterationCount = 0;

    var filler = document.getElementById('filler');
    filler.style.visibility = 'visible';



    rotatingLetterElements.forEach(function (element, index) {
        setTimeout(function () {
            var offsetFromMiddle = index - middleIndex;
            var offsetY = (screenHeight / 6) - (letterHeight / 2) + offsetFromMiddle * letterHeight;
            element.style.position = 'absolute';
            element.style.left = commonX + 'px';
            element.style.top = offsetY + 'px';
            offsetY += 40;
            element.classList.add('rotating-letter');
            iterationCount++;
            if (iterationCount === rotatingLetterElements.length) {

                attackPlayer(rotatingLetterElements);
            }
        }, index * 1000);
    });

}


function pWordFormation(commonX, eventKey) {
    var orbitContainer = document.getElementById('pOrbitContainer');

    var foundElement = findFirstLetterElement(orbitContainer, eventKey);
    if (foundElement) {
        pAnswer.push(foundElement); // Add the found element to pAnswer array
        var offsetY = 15;
        foundElement.style.position = 'absolute';
        foundElement.style.left = commonX + 'px';
        foundElement.style.top = commonPlayer[0] + 'px';
        commonPlayer[0] += offsetY + 20;
        foundElement.classList.add('rotating-letter');
    }
}

function findFirstLetterElement(container, targetLetter) {
    var childElements = container.children;
    for (var i = 0; i < childElements.length; i++) {
        var currentLetter = childElements[i].textContent;

        if (currentLetter === targetLetter.toUpperCase() && !pAnswer.includes(childElements[i])) {
            return childElements[i]; // Found the first occurrence and not in pAnswer, return the element
        }
    }
    return null;
}

function attackPlayer(rotatingLetterElements) {
    eLettersData = [];
    pLettersData = [];
    var timer = setInterval(function () {
        var allReached = true;
        rotatingLetterElements.forEach(function (element) {
            var currentPosition = parseInt(element.style.left || '0', 10);
            var newPosition = currentPosition - 10;
            if (newPosition > -800) {
                element.style.left = newPosition + 'px';
                allReached = false; // If any element hasn't reached the target, set the flag to false
            }
        });
        if (allReached) {
            rotatingLetterElements.forEach(function (element) {
                attackFinish(element);
            });
            clearInterval(timer);
            counterOpportunity = false;
            index++
            createPlayerLetter(PwordArray[index]);
            createEnemyLetter(EwordArray[index]);
            roundCount++;
            round();
        }
    }, 10); // Adjust the interval as needed
}

function attackEnemy(targetPosition, increment) {
    var timer = setInterval(function () {
        var allReached = true;
        pAnswer.forEach(function (element) {
            var currentPosition = parseInt(element.style.left || '0', 10);
            var newPosition = currentPosition + 10;
            if (newPosition <= targetPosition) {
                element.style.left = newPosition + 'px';
                allReached = false; // If any element hasn't reached the target, set the flag to false
            }

        });
        if (checkOverlap()) {
            var rotatingLetterElements = getAllChildren(document.getElementById('eOrbitContainer'));
            rotatingLetterElements.forEach(function (element) {
                attackFinish(element);
            });
            cancelRulePosition(selectedRule);
        }

        if (allReached) {
            clearInterval(timer);
        }
    }, 10); // Adjust the interval as needed
}

function handleKeyDown(event) {
    if (counterOpportunity) {
        if (event.key === "Enter") {
            pContinueOrbit = false;
            var combinedText = pAnswer.map(function (element) { return element.textContent; }).join('');
            console.log(combinedText + "\n" + PwordArray[index]);
            if (combinedText === PwordArray[index]) {
                attackEnemy(1000, 10);
            } else {
                console.log("wrong word");
            }
        } else {
            var keyFound = pLettersData.some(function (letterData) {
                return letterData.letter === event.key.toUpperCase();
            });
            if (keyFound) {
                //console.log("Key found in pLettersData");
                pContinueOrbit = false;
                pWordFormation(250, event.key);
                setPlayerState("attack");
            } else {
                //console.log("Key not found in pLettersData");
                // Perform the desired action when the key is not found
            }
        }
    }
}

function attackFinish(element) {
    var container = document.getElementById('pOrbitContainer');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    var filler = document.getElementById("filler");
    filler.style.display = 'none';
    setEnemyState("idle");
    commonPlayer[0] = 0;
    setPlayerState("idle");
    element.remove();
}



function checkOverlap() {
    var container1 = document.getElementById("pOrbitContainer");
    var container2 = document.getElementById("eOrbitContainer");

    if (!container1.children[0] || !container2.children[0]) {
        // One or both of the containers don't have a child element
        return false; // No overlap possible
    }

    var child1 = container1.children[0]; // Get the first child element
    var child2 = container2.children[0]; // Get the first child element

    var rect1 = child1.getBoundingClientRect(); // Get the bounding rectangle of the first child of container1
    var rect2 = child2.getBoundingClientRect(); // Get the bounding rectangle of the first child of container2

    // Check for overlap
    var overlap = !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);

    return overlap;
}

function showHeartsOneByOne() {
    const heartContainer = document.getElementById('heartContainer');
    heartContainer.style.visibility = 'visible'; // Show the heart container initially
    const hearts = document.querySelectorAll('#heartContainer .heart');
    let index = 0;

    const intervalId = setInterval(() => {
        if (index < hearts.length) {
            hearts[index].style.opacity = '1';
            hearts[index].style.visibility = 'visible'; // Show the heart
            hearts[index].style.animation = 'none'; // Remove animation
            index++;
        } else {
            clearInterval(intervalId); // Stop the interval when all hearts are shown
        }
    }, 1000);
}
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("DOMContentLoaded", function () {
    setPlayerState('stare');
    setEnemyState('stare');
    randomizeRulePosition();
    createEnemyLetter(EwordArray[index]);
    createPlayerLetter(PwordArray[index]);
}); 