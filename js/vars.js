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
        { date: '2017-03-20', value: 100.345435 },
        { date: '2017-03-23', value: 170.345435 },
        { date: '2017-03-24', value: 120.43543534 },
        { date: '2017-03-25', value: 150.34534534 },
        { date: '2017-03-21', value: 120.3454353 },
        { date: '2017-03-22', value: 110.345435 },
        { date: '2017-03-26', value: 140.3454353534 }
    ];

    var weekTest2 =[
        { date: '2017-03-27', value: 100.345435 },
        { date: '2017-03-28', value: 170.345435 },
        { date: '2017-03-29', value: 120.43543534 },
        { date: '2017-03-30', value: 150.34534534 },
        { date: '2017-03-31', value: 120.3454353 },
        { date: '2017-04-01', value: 110.345435 },
        { date: '2017-04-02', value: 140.3454353534 }
    ];
    var weekTest3 =[
        { date: '2017-04-03', value: 110.345435 },
        { date: '2017-04-04', value: 120.43543534 },
        { date: '2017-04-05', value: 150.34534534 },
        { date: '2017-04-06', value: 110.345435 },
        { date: '2017-04-07', value: 170.345435 },
        { date: '2017-04-08', value: 150.34534534 },
        { date: '2017-04-09', value: 140.3454353534 }
    ];

    var weeksArray = [weekTest, weekTest2, weekTest3];