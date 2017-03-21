

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
function processResponce(array) {
    // TODO calculate min and max values 

    minVal = array[0].value;
    maxVal = array[0].value;
    // find min and max values
    array.forEach(function (v) {
        if (v.value < minVal) {
            minVal = v.value;
        }
        else if (v.value > maxVal) {
            maxVal = v.value;
        }
    });
    // sort by date
    array.sort(function (_a, _b) {
        return moment(_a.date) > moment(_b.date);
    });

    // step
    valuesStep = ((maxVal.toFixed() - minVal.toFixed()) / (rowNumber - 1));
}


function drawGraph() {
    var points = weekTest;
    processResponce(points);

    processWeekMode(points);

}

function processWeekMode(points) {
    var _diff = maxVal - minVal;
    var rectSize = graphPointSize;
    var _fullHeight = (moveY * (rowNumber - 1));

    context.lineWidth = graphLineWidth;
    context.strokeStyle = graphLineColor;

    // draw points
    for (var i = 0; i < points.length; i++) {
        var day = moment(points[i].date).day();
        day = day == 0 ? 7 : day;
        var _val = points[i].value;
        var _persent = (maxVal - _val) / _diff * 100;
        var _height = (moveY * (rowNumber - 1)) / 100 * _persent;
        var _x = margin + gridMarginLeft + (moveX * (day));
        var _y = margin + gridMarginTop + moveY + _height;
        context.beginPath();
        context.arc(_x, _y, rectSize, 0, 2 * Math.PI, false);
        context.stroke();
    }

    // draw lines
    var _rect_2 = rectSize/2;

    var day = moment(points[0].date).day();
    day = day == 0 ? 7 : day;
    var _val = points[0].value;
    var _persent = (maxVal - _val) / _diff * 100;
    var _height = (moveY * (rowNumber - 1)) / 100 * _persent;
    var _x = margin + gridMarginLeft - (rectSize / 2) + (moveX * (day));
    var _y = margin + gridMarginTop - (rectSize / 2) + moveY + _height;
    context.beginPath();
    context.moveTo(_x +_rect_2, _y + _rect_2);
    for (var i = 1; i < points.length; i++) {
        day = moment(points[i].date).day();
        day = day == 0 ? 7 : day;
        _val = points[i].value;
        _persent = (maxVal - _val) / _diff * 100;
        _height = (moveY * (rowNumber - 1)) / 100 * _persent;
        _x = margin + gridMarginLeft - (rectSize / 2) + (moveX * (day));
        _y = margin + gridMarginTop - (rectSize / 2) + moveY + _height;
        context.lineTo(_x + _rect_2, _y + _rect_2);
    }
    context.stroke();
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
    for (var i = 0; i < rowNumber - 1; i++) {
        context.fillText(_cursorVal,
            _cursorX + gridMarginLeft - leftLegendPadding,
            _cursorY);
        _cursorY -= moveY;
        _cursorVal = +_cursorVal + +valuesStep;
        _cursorVal = _cursorVal.toFixed(2);
    }
    context.fillText(_cursorVal,
        _cursorX + gridMarginLeft - leftLegendPadding,
        _cursorY);

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

function setMode(mode) {
    if (mode === undefined) {
        mode = "week";
    }
    switch (mode) {
        case "week": {
            colNumber = 7;
            break;
        }
        case "month": {
            // TODO 
            break;
        }
        case "year": {
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
