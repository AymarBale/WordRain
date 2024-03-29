var spellCol;
var state = [
    { name: 'playerState', data: ['stare', 'idle', 'attack', 'damage', 'death'] },
    { name: 'enemyState', data: ['stare', 'idle', 'attack', 'damage', 'death'] }
]

var PwordArray = [
    "big", "hot", "happy", "good", "fast", "tall", "old", "bright", "brave", "clean",
    "hard", "loud", "strong", "bright", "deep", "heavy", "wide", "long", "rich", "sharp",
    "sweet", "thick", "wet", "fresh", "smooth", "high", "Mature", "Fascinating", "dark",
    "empty", "cheap", "safe", "true", "open", "alive", "healthy", "empty", "easy", "far",
    "happy", "clean", "simple", "clear", "old", "thin", "forward", "narrow", "cheap", "brave",
    "calm", "Beautiful", "Intelligent", "Brave", "Creative", "Generous", "Honest", "Energetic",
    "Kind", "Patient", "Talented", "Ambitious", "Confident", "Empathetic", "Reliable", "Optimistic",
    "Sincere", "Humble", "Compassionate", "Resourceful", "Sociable", "Loyal", "Polite", "Diligent",
    "Cheerful", "Independent", "Wise", "Charming", "Responsible", "Adventurous", "Versatile", "Considerate",
    "Punctual", "Understanding", "Enthusiastic", "Courageous", "Decisive", "Diplomatic", "Efficient", "Friendly",
    "Imaginative", "Motivated", "Organized", "Perceptive", "Reflective", "Resilient", "Respectful", "Tolerant",
    "Trustworthy"
];

var EwordArray = [
    "small", "cold", "sad", "bad", "slow", "short", "young", "dim", "cowardly", "dirty",
    "soft", "quiet", "weak", "dull", "shallow", "light", "narrow", "short", "poor", "blunt",
    "sour", "thin", "dry", "stale", "rough", "low", "Immature", "Boring", "light",
    "full", "expensive", "dangerous", "false", "closed", "dead", "sick", "occupied", "difficult",
    "near", "unhappy", "messy", "complex", "cloudy", "new", "thick", "backward", "wide", "costly",
    "timid", "anxious", "Ugly", "Stupid", "Cowardly", "Unimaginative", "Selfish", "Dishonest", "Lethargic",
    "Mean", "Impatient", "Untalented", "Lazy", "Insecure", "Insensitive", "Unreliable", "Pessimistic",
    "Insincere", "Arrogant", "Heartless", "Inefficient", "Antisocial", "Disloyal", "Rude", "negligent",
    "Gloomy", "Dependent", "Foolish", "Uncharming", "Irresponsible", "Cautious", "Unversatile", "Inconsiderate",
    "late", "Misunderstanding", "Apathetic", "Cowardly", "Indecisive", "Undiplomatic", "Inefficient", "Unfriendly",
    "Unimaginative", "Unmotivated", "Disorganized", "Unperceptive", "Nonreflective", "Fragile", "Disrespectful", "Intolerant",
    "Untrustworthy"
];

var synArray = [
    "large", "warm", "joyful", "excellent", "quick", "high", "ancient", "brilliant", "courageous", "tidy",
    "tough", "noisy", "sturdy", "profound", "weighty", "broad", "lengthy", "wealthy", "sharp", "sweet",
    "dense", "watery", "new", "sleek", "high", "fully grown", "captivating", "murky", "vacant", "inexpensive",
    "secure", "truthful", "unlocked", "living", "well", "vacant", "effortless", "distant", "content", "clean",
    "plain", "crystal clear", "ancient", "thin", "forward", "constricted", "economical", "courageous", "composed",
    "exquisite", "wise", "courageous", "inventive", "charitable", "truthful", "vibrant", "compassionate", "tolerant",
    "talented", "aspiring", "confident", "sympathetic", "reliable", "hopeful", "humble", "kind-hearted", "empathetic",
    "resourceful", "outgoing", "faithful", "courteous", "industrious", "jovial", "selfreliant", "intelligent",
    "charismatic", "accountable", "daring", "flexible", "thoughtful", "prompt", "empathetic", "passionate", "valiant",
    "decisive", "tactful", "productive", "affable", "creative", "driven", "systematic", "insightful", "thoughtful", "tenacious",
    "courteous", "accepting", "reliable"
];
document.addEventListener("DOMContentLoaded", function () {
    setPlayerState('stare');
    setEnemyState('stare');
    spellCol = document.getElementById('magicCollision');
    console.log(spellCol);
    let magic = getRandomFile();
    generateMagicAnimation(spellCol, magic, 64, 64, 0, 0, 15, 15);
});

EwordArray = EwordArray.map(function (word) {
    return word.toUpperCase();
});
PwordArray = PwordArray.map(function (word) {
    return word.toUpperCase();
});
synArray = synArray.map(function (word) {
    return word.toUpperCase();
});
pCurrState = '';
eCurrState = ''
index = Math.floor(Math.random() * PwordArray.length);
var roundCount = 0;
var enemy_attack_pos = 0;
var player_attack_pos = 0;
var counterOpportunity = false
var box;
let health = 3;
var currentRule = 0;

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
        gameFrame++;
        requestAnimationFrame(animate);
    }
    animate()
}
function generateMagicAnimation(canvas, src, spriteW, spriteH, frameX, frameY, staggerFrames, maxFrame) {

    let ctx = canvas.getContext('2d');
    let initFrame = frameX
    /*canvas.width = 1.5 * 65;
    canvas.height = 1.5 * 56;*/
    canvas.width = 150;
    canvas.height = 150;
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
        gameFrame++;
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
var pLetterInitialPosition = [];
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
    var randomIndex = Math.floor(Math.random() * 2) + 1;
    setTimeout(function () {
        selectedRule = rules[randomIndex - 1]; // Adjust index to match array (0-based)
        if (selectedRule.textContent === "Syn") {
            createEnemyLetter(PwordArray[index]);
            //createPlayerLetter(synArray[index]);
            createPlayerLetter("TEST");

        } else if (selectedRule.textContent === "Ant") {
            createEnemyLetter(EwordArray[index]);
            //createPlayerLetter(PwordArray[index]);
            createPlayerLetter("TEST");
        }

        currentRule = selectedRule;
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
    console.log("new round" + roundCount);
    pAnswer = [];
    currentRule = [];
    if (roundCount === 0) {
        randomizeRulePosition();

        setTimeout(function () {
            setEnemyState("attack");
            cancelOrbit();
        }, 2000);
    }
    else if ((roundCount < 5) && (roundCount != 0)) {
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
    }
    else if (roundCount === 5) {
        youWin();
    }
}
var result;
function cancelOrbit() {
    var filler = document.getElementById("filler");
    filler.style.display = 'inline-block';
    eContinueOrbit = false;
    counterOpportunity = true;
    result = eWordFormation(-100, document.getElementById('eOrbitContainer'));

}
function getAllChildren(container) {
    var children = container.children;
    return Array.from(children);
}
var playerAtTimer;
function eWordFormation(commonX, orbitContainer) {
    var rotatingLetterElements = getAllChildren(orbitContainer);
    var screenHeight = window.innerHeight;
    var letterHeight = rotatingLetterElements.length > 0 ? rotatingLetterElements[0].offsetHeight : 0;
    var middleIndex = Math.floor(rotatingLetterElements.length / 2);
    var iterationCount = 0;
    var timeouts = []; // Array to store timeout IDs

    var filler = document.getElementById('filler');
    filler.style.visibility = 'visible';

    rotatingLetterElements.forEach(function (element, index) {
        var timeoutId = setTimeout(function () {
            var offsetFromMiddle = index - middleIndex;
            var offsetY = (screenHeight / 6) - (letterHeight / 2) + offsetFromMiddle * letterHeight;
            element.style.position = 'absolute';
            element.style.left = commonX + 'px';
            element.style.top = offsetY + 'px';
            offsetY += 40;
            element.classList.add('rotating-letter');
            iterationCount++;
            if (iterationCount === rotatingLetterElements.length) {
                playerAtTimer = attackPlayer(rotatingLetterElements);
            }
        }, index * 1000);

        timeouts.push(timeoutId); // Store the timeout ID
    });

    // Function to cancel all timeouts
    function cancelTimeouts() {
        timeouts.forEach(function (timeoutId) {
            clearTimeout(timeoutId);
        });
    }

    // Return the rotatingLetterElements and cancelTimeouts function
    return {
        rotatingLetterElements: rotatingLetterElements,
        cancelTimeouts: cancelTimeouts
    };
}

var wordTimer = [];
function pWordFormation(commonX, eventKey) {
    var orbitContainer = document.getElementById('pOrbitContainer');

    var foundElement = findFirstLetterElement(orbitContainer, eventKey);
    if (foundElement) {
        getLetterPositions(foundElement);
        pAnswer.push(foundElement); // Add the found element to pAnswer array
        var offsetY = 15;
        foundElement.style.position = 'absolute';
        foundElement.style.left = commonX + 'px';
        foundElement.style.top = commonPlayer[0] + 'px';
        commonPlayer[0] += offsetY + 20;
        foundElement.classList.add('rotating-letter');
    }
    var timer = setInterval(function () {
        if (checkOverlap()) {
            eLettersData = [];
            pLettersData = [];
            attackFinish();
            cancelRulePosition(selectedRule);
            counterOpportunity = false;
            index++
            roundCount++;
            round();
            decreaseHealth();
            console.log("health decrease");
            clearInterval(timer);
        }
    }, 10); // Adjust the interval as needed
    return timer;
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
    var checker = 0;
    var timer = setInterval(function () {
        var allReached = false;
        rotatingLetterElements.forEach(function (element) {
            var currentPosition = parseInt(element.style.left || '0', 10);
            var newPosition = currentPosition - 10;
            checker = newPosition;
            if (newPosition > -900) {
                element.style.left = newPosition + 'px';
                allReached = false; // If any element hasn't reached the target, set the flag to false
            } else {
                allReached = true;
            }
        });
        if (checkOverlap()) {
            result.cancelTimeouts();
            clearInterval(timer);
        }
        if (checker === -900) {
            if (wordTimer.length === 0) {
                eLettersData = [];
                pLettersData = [];
                attackFinish();
                cancelRulePosition(selectedRule);
                counterOpportunity = false;
                index++
                roundCount++;
                round();
                decreaseHealth();
                console.log("health decrease");
                clearInterval(timer);/**/
            }
        }
    }, 10); // Adjust the interval as needed
    return timer;
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
            clearInterval(playerAtTimer);
            eLettersData = [];
            pLettersData = [];
            attackFinish();
            cancelRulePosition(selectedRule);
            counterOpportunity = false;
            index++
            roundCount++;
            round();
        } else if (allReached) {
            clearInterval(timer);
        }
    }, 10); // Adjust the interval as needed
}

function returnWord(letter) {
    if (pLetterInitialPosition.length > 0) {
        // Get the last position from pLetterInitialPosition array
        var lastPosition = pLetterInitialPosition[pLetterInitialPosition.length - 1];

        // Extract x and y coordinates from the last position
        var newX = lastPosition[0];
        var newY = lastPosition[1];
        letter.style.left = newX + "px";
        letter.style.top = newY + "px";
        pLetterInitialPosition.pop();
    }
}

function handleKeyDown(event) {
    if (counterOpportunity) {
        if (event.key === "Enter") {
            pContinueOrbit = false;
            var combinedText = pAnswer.map(function (element) { return element.textContent; }).join('');
            if (currentRule.textContent === "Ant") {
                /*if (combinedText === PwordArray[index]) {*/if (combinedText === "TEST") {
                    wordTimer.forEach(function (timer) {
                        clearInterval(timer);
                    });
                    attackEnemy(1000, 10);
                } else {
                    console.log("wrong word");
                }
            } else if (currentRule.textContent === "Syn") {
                /*if (combinedText === synArray[index]) {*/if (combinedText === "TEST") {
                    wordTimer.forEach(function (timer) {
                        clearInterval(timer);
                    });
                    attackEnemy(1000, 10);
                } else {
                    console.log("wrong word");
                }
            }
        } else {
            var keyFound = pLettersData.some(function (letterData) {
                return letterData.letter === event.key.toUpperCase();
            });

            if (keyFound) {
                pContinueOrbit = false;
                wordTimer.push(pWordFormation(250, event.key));
                setPlayerState("attack");
            } else {
                // Perform the desired action when the key is not found
            }
        } if (event.key === "Backspace") {
            if (pAnswer.length > 0) {
                commonPlayer[0] -= 35;
                returnWord(pAnswer[pAnswer.length - 1]);
                pAnswer.pop();
            };
        }

    }

}

function attackFinish() {
    result.cancelTimeouts();
    var pcontainer = document.getElementById('pOrbitContainer');
    var eContainer = document.getElementById('eOrbitContainer');
    while (pcontainer.firstChild) {
        pcontainer.removeChild(pcontainer.firstChild);
    }
    while (eContainer.firstChild) {
        eContainer.removeChild(eContainer.firstChild);
    }
    var filler = document.getElementById("filler");
    filler.style.display = 'none';
    setEnemyState("idle");
    commonPlayer[0] = 0;
    setPlayerState("idle");
}

function getLetterPositions(child) {
    var parentRect = child.parentElement.getBoundingClientRect();
    var rect = child.getBoundingClientRect();
    var position = [rect.left - parentRect.left, rect.top - parentRect.top];
    pLetterInitialPosition.push(position);
}

function checkOverlap() {
    var container1 = document.getElementById("pOrbitContainer");
    var container2 = document.getElementById("eOrbitContainer");
    if (!container1.children[0] || !container2.children[0]) {
        return false; // No overlap possible
    }
    var child1 = container1.children[0]; // Get the first child element
    var child2 = container2.children[0]; // Get the first child element

    var rect1 = child1.getBoundingClientRect(); // Get the bounding rectangle of the first child of container1
    var rect2 = child2.getBoundingClientRect(); // Get the bounding rectangle of the first child of container2
    var overlapX = !(rect1.right < rect2.left || rect1.left > rect2.right);
    return overlapX;
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

function decreaseHealth() {
    let heart;
    switch (health) {
        case 3:
            heart = document.querySelector('.heart:nth-child(1)');
            heart.querySelector('.c2').style.backgroundColor = 'rgb(143, 143, 143)';
            heart.querySelector('.r').style.backgroundColor = 'rgb(143, 143, 143)';
            break;
        case 2:
            heart = document.querySelector('.heart:nth-child(2)');
            heart.querySelector('.c2').style.backgroundColor = 'rgb(143, 143, 143)';
            heart.querySelector('.r').style.backgroundColor = 'rgb(143, 143, 143)';
            break;
        case 1:
            heart = document.querySelector('.heart:nth-child(3)');
            heart.querySelector('.c2').style.backgroundColor = 'rgb(143, 143, 143)';
            heart.querySelector('.r').style.backgroundColor = 'rgb(143, 143, 143)';
            gameOver();
            break;
        default:
            break;
    }
    health--;
}

function youWin() {
    pContinueOrbit = false;
    eContinueOrbit = false;
    roundCount = 10;
    const playButton = document.getElementById('playBut');
    const youWinTitle = document.getElementById('youWin');
    youWinTitle.style.display = 'block';
    document.querySelectorAll('body > *:not(#playBut):not(#youWin)').forEach(element => {
        element.remove();
    });
    playButton.style.display = 'block';
    playButton.textContent = 'Replay';

    playButton.onclick = newGame;

}

function gameOver() {
    pContinueOrbit = false;
    eContinueOrbit = false;
    roundCount = 10;
    const playButton = document.getElementById('playBut');
    document.querySelectorAll('body > *:not(#playBut):not(#gameOver)').forEach(element => {
        element.remove();
    });
    playButton.style.display = 'block';
    playButton.textContent = 'Replay';
    var gameOverTitle = document.getElementById('gameOver');
    gameOverTitle.style.display = 'block';
    playButton.onclick = newGame;
}

function newGame() {
    window.location.reload();
}
document.addEventListener("keydown", handleKeyDown);

function getRandomFile() {
    const randomIndex = Math.floor(Math.random() * 160);
    let randomSpell = './Lmage/magicCollision/' + randomIndex + '.png';
    spellCol.src = randomSpell;
    return randomSpell;
}

