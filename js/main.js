var _cursorPointer = 0;
var dataArray;
function GetData() { // TODO some params (mode, data, ...)
    // TODO return promise
    if (_cursorPointer + 1 < weeksArray.length) {
        _cursorPointer++;
    }
    else {
        _cursorPointer = 0;
    }
    dataArray = weeksArray[_cursorPointer];
}



function initGridParams() {
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

/*
var minVal;
var maxVal;
var valuesStep;*/
function processData(array) {
    // TODO calculate numer of raws depending on the responce data
    // TODO calculate min and max values 
    var buy_minVal = array[0].buy;
    var buy_maxVal = array[0].buy;
    var cell_minVal = array[0].cell;
    var cell_maxVal = array[0].cell;

    var commonMin = array[0].buy;
    var commonMax = array[0].buy;

    // find min and max values
    array.forEach(function (v) {
        if (v.buy < buy_minVal) {
            buy_minVal = v.buy;
        }
        else if (v.buy > buy_maxVal) {
            buy_maxVal = v.buy;
        }
        if (v.cell < cell_minVal) {
            cell_minVal = v.cell;
        }
        else if (v.cell > cell_maxVal) {
            cell_maxVal = v.cell;
        }
    });

    dataSettings.commonMin = buy_minVal < cell_minVal ? buy_minVal : cell_minVal;
    dataSettings.commonMax = buy_maxVal > cell_maxVal ? buy_maxVal : cell_maxVal;
    dataSettings.commonStep = ((dataSettings.commonMax.toFixed() - dataSettings.commonMin.toFixed()) / (rowNumber - 1));

    // sort by date
    array.sort(function (_a, _b) {
        return moment(_a.date) > moment(_b.date);
    });
}


function drawGraph(mode) {
    var points = dataArray;
    processData(points);
    // TODO mode
    switch (mode) {
        case 'week': {
            processWeekMode(points, 'green', 'buy'); // TODO color
            processWeekMode(points, 'yellow', 'cell');
            break;
        }
    }
}

function processWeekMode(points, color, propName) {
    var _diff = dataSettings.commonMax - dataSettings.commonMin;
    var rectSize = graphPointSize;
    var _fullHeight = (moveY * (rowNumber - 1));

    context.lineWidth = graphLineWidth;
    context.strokeStyle = color;

    // draw points
    for (var i = 0; i < points.length; i++) {
        var day = moment(points[i].date).day();
        day = day == 0 ? 7 : day;
        var _val = points[i][propName];
        var _persent = (dataSettings.commonMax - _val) / _diff * 100;
        var _height = (moveY * (rowNumber - 1)) / 100 * _persent;
        var _x = margin + gridMarginLeft + (moveX * (day));
        var _y = margin + gridMarginTop + moveY + _height;
        context.beginPath();
        context.arc(_x, _y, rectSize, 0, 2 * Math.PI, false);
        context.stroke();
    }

    // draw lines
    var _rect_2 = rectSize / 2;

    var day = moment(points[0].date).day();
    day = day == 0 ? 7 : day;
    var _val = points[0][propName];
    var _persent = (dataSettings.commonMax - _val) / _diff * 100;
    var _height = (moveY * (rowNumber - 1)) / 100 * _persent;
    var _x = margin + gridMarginLeft - (rectSize / 2) + (moveX * (day));
    var _y = margin + gridMarginTop - (rectSize / 2) + moveY + _height;
    context.beginPath();
    context.moveTo(_x + _rect_2, _y + _rect_2);
    for (var i = 1; i < points.length; i++) {
        day = moment(points[i].date).day();
        day = day == 0 ? 7 : day;
        _val = points[i][propName];
        _persent = (dataSettings.commonMax - _val) / _diff * 100;
        _height = (moveY * (rowNumber - 1)) / 100 * _persent;
        _x = margin + gridMarginLeft - (rectSize / 2) + (moveX * (day));
        _y = margin + gridMarginTop - (rectSize / 2) + moveY + _height;
        context.lineTo(_x + _rect_2, _y + _rect_2);
    }
    context.stroke();
}

function drawValueLegend() {
    context.fillStyle = legendColor;
    context.font = "15px Verdana";
    context.textBaseline = "middle";
    context.textAlign = "right";

    // TODO switch legend to different sizes
    var _cursorX = margin;
    var _cursorY = margin + moveY * rowNumber;
    var _cursorVal = (+(+dataSettings.commonMin.toFixed())).toFixed(2);
    for (var i = 0; i < rowNumber - 1; i++) {
        context.fillText(_cursorVal,
            _cursorX + gridMarginLeft - leftLegendPadding,
            _cursorY);
        _cursorY -= moveY;
        _cursorVal = +_cursorVal + +dataSettings.commonStep;
        _cursorVal = _cursorVal.toFixed(2);
    }
    context.fillText(_cursorVal,
        _cursorX + gridMarginLeft - leftLegendPadding,
        _cursorY);
}

function drawTextLegend(mode) {
    context.font = "18px Verdana";
    context.textBaseline = "top";
    context.textAlign = "center";

    switch (mode) {
        case 'week': {
            _cursorY = canvas.height + bottomLegendPadding - gridMarginBottom;
            _cursorX = margin + gridMarginLeft + moveX;
            for (var i = 0; i < colNumber; i++) {
                context.fillText(days[i], _cursorX, _cursorY);
                _cursorX += moveX;
            }
            break;
        }
    }
}

function drawLegend(mode) {

    drawValueLegend();


    drawTextLegend(mode);
}

function setMode(mode) {
    if (mode === undefined) {
        mode = "week";
    }
    currMode = mode;
    switch (currMode) {
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
    Init();
}

function ClearArea() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function changePage() { // TODO Page as param
    ClearArea();
    GetData(currMode); // TODO process bad data
    drawGrid();
    drawGraph(currMode);
    drawLegend(currMode);
}


function Init() {
    GetData(currMode); // TODO process bad data
    ClearArea();
    initGridParams();
    drawGrid();
    drawGraph(currMode);
    drawLegend(currMode);
}

Init();

