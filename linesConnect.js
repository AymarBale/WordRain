function getAllRotatingLetters() {
    return Array.from(document.querySelectorAll('#rotatingLetter'));
}

// Example usage
var rotatingLetterArray = getAllRotatingLetters();
function startConnect() {
    removeLine();
    setInterval(function () {
        if (rotatingLetterArray.length > 1) {
            for (var i = 1; i < rotatingLetterArray.length; i++) {
                connect(rotatingLetterArray[i - 1], rotatingLetterArray[i], getRandomColor(), 4);
            }
        }
    }, 30);

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function connect(div1, div2, color, thickness) {
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);
    var x1 = off1.left + (off1.width / 2);
    var y1 = off1.top + off1.height + 2;
    var x2 = off2.left + (off2.width / 2);
    var y2 = off2.top + 2;
    var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
    var gradientColor1 = getRandomColor();
    var gradientColor2 = getRandomColor();
    var htmlLine = "<div id=\"line\" style='padding:0px; margin:0px; height:" + thickness + "px; background: linear-gradient(to right, " + gradientColor1 + ", " + gradientColor2 + "); line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg); border-radius: 5px;' />";

    document.body.innerHTML += htmlLine;
}

function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

function removeLine() {
    var lineElement = document.getElementById('line');
    if (lineElement) {
        document.body.removeChild(lineElement);
    }
}