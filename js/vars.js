// display variables


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var gridMarginLeft = 60;
var gridMarginTop = 0;
var gridMarginRight = 0;
var gridMarginBottom = 100;

var availableWidth;
var availableHeight

var margin = 10;
var colNumber = 7;
var rowNumber = 5;

var gridWidth;
var gridHeight;
var moveX;
var moveY;


var leftLegendPadding = 10;
var bottomLegendPadding = 0;


// values variables
var minVal;
var maxVal;
var valuesStep;


// graph settings
var graphPointSize = 10;
var graphLineWidth = 1.5;
var graphLineColor = "yellow";

// legend settings
var legendColor  = "white";


// display mode
var currMode = "week";

var monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
var days = ['Mon', 'Tue', 'Wed', 'Thi', 'Fri', 'Sat', 'Sun'];



var weekTest =[
        { date: '10-10-12', value: 100.345435 },
        { date: '10-10-12', value: 120.3454353 },
        { date: '10-10-12', value: 110.345435 },
        { date: '10-10-12', value: 170.345435 },
        { date: '10-10-12', value: 120.43543534 },
        { date: '10-10-12', value: 150.34534534 },
        { date: '10-10-12', value: 140.3454353534 }
    ];