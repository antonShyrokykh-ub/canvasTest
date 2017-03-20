

function initGrid() {
    availableWidth = canvas.width - gridMarginLeft - gridMarginRight;
    availableHeight = canvas.height - gridMarginTop - gridMarginBottom;

    gridWidth = availableWidth - 2 * margin;
    gridHeight = availableHeight - 2 * margin;
    moveX = (availableWidth - 2 * margin) / (colNumber + 1);
    moveY = (availableHeight - 2 * margin) / (rowNumber + 1);
}


function drawGrid() {
    var cursorx = margin + gridMarginLeft;
    var cursorY = margin + gridMarginTop;

    context.lineWidth = .5;
    context.strokeStyle = "lightgray";

    for (var i = 0; i <= colNumber + 1; i++) {
        context.beginPath();
        context.moveTo(cursorx, cursorY);
        context.lineTo(cursorx, cursorY + gridHeight);
        cursorx += moveX;
        context.stroke();
    }
    cursorx = margin + gridMarginLeft;
    cursorY = margin + gridMarginTop;

    for (var i = 0; i <= rowNumber + 1; i++) {
        context.beginPath();
        context.moveTo(cursorx, cursorY);
        context.lineTo(cursorx + gridWidth, cursorY);
        cursorY += moveY;
        context.stroke();
    }
}


var minVal;
var maxVal;
var valuesStep;
function drawGraph() {

    var points = weekTest;

    
    // TODO calculate min and max values 

    minVal = points[0].value;
    maxVal = points[0].value;
    // find min and max values
    points.forEach(function (v) {
        if (v.value < minVal) {
            minVal = v.value;
        }
        else if (v.value > maxVal) {
            maxVal = v.value;
        }
    });

    // approximate number of rows
    valuesStep = ((maxVal.toFixed() - minVal.toFixed()) / rowNumber).toFixed();
    var _height = maxVal - minVal;


    var rectSize = graphPointSize;

    var startPointY = margin + moveY;

    for (var i = 0; i < colNumber; i++) {
        var _val = points[i].value;

        var percent = (maxVal - _val) / _height * 100;
        var realHeight = (moveY * (rowNumber-1)) / 100 * percent;

        context.fillStyle = graphLineColor;
        context.fillRect(moveX * (i + 1) + rectSize / 2 + gridMarginLeft, realHeight + moveY - rectSize / 2 + gridMarginTop, rectSize, rectSize);
    }

    {
        context.beginPath();
        context.lineWidth = graphLineWidth;
        context.strokeStyle = graphLineColor;

        var _val = points[0].value;

        var percent = (maxVal - _val) / _height * 100;
        var realHeight = (moveY * (rowNumber-1)) / 100 * percent;
        context.moveTo(moveX * (1) + rectSize + gridMarginLeft, realHeight + moveY + gridMarginTop);
        for (var i = 1; i < colNumber; i++) {
            _val = points[i].value;

            percent = (maxVal - _val) / _height * 100;
            realHeight = (moveY * (rowNumber-1)) / 100 * percent;

            context.lineTo(moveX * (i + 1) + rectSize + gridMarginLeft, realHeight + moveY + gridMarginTop);
        }
        context.stroke();
    }
}

function drawLegend() {
    // TODO switch mode

    context.fillStyle = legendColor;
    context.font = "15px Verdana";
    context.textBaseline = "middle";
    context.textAlign = "right";

    // TODO switch legend to different sizes
    var _cursorX = margin;
    var _cursorY = margin + moveY * rowNumber;
    var _cursorVal = (+(+minVal.toFixed())).toFixed(2);
    for (var i =0; i < rowNumber; i++) {
        context.fillText(_cursorVal, _cursorX + gridMarginLeft - leftLegendPadding, _cursorY);
        _cursorY -= moveY;
        _cursorVal = +_cursorVal + +valuesStep;
        _cursorVal = _cursorVal.toFixed(2);
    }

    context.font = "18px Verdana";
    context.textBaseline = "top";
    context.textAlign = "center";

    _cursorY = canvas.height + bottomLegendPadding - gridMarginBottom;
    _cursorX = margin + gridMarginLeft + moveX;
    for (var i = 0; i < colNumber; i++) {
        context.fillText(days[i], _cursorX, _cursorY);
        _cursorX += moveX;
    }
}

function setMode(mode){
    if (mode===undefined){
        mode ="week";
    }
    switch(mode){
        case "week":{
            colNumber =7;
            break;
        }
        case "month":{
            // TODO 
            break;
        }
        case "year":{
            // TODO 
            break;
        }
    }
    initGrid();
}


initGrid();
drawGrid();
drawGraph();
drawLegend();
