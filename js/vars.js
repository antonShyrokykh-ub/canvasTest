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

var dataSettings={};

// values variables
/*var minVal;
var maxVal;
var valuesStep;*/


// graph settings
var graphPointSize = 7;
var graphLineWidth = 1.5;
var graphLineColor = "yellow";

// legend settings
var legendColor  = "white";


var ENUMS = {
    BUY_CELL: "buy/cell", 
    OFFICIAL: "official",
    WEEK_MODE:"week",
    MONTH_MODE:"month",
    YEAR_MODE:"year"
};
// display mode
var currMode = ENUMS.WEEK_MODE;
var currencyDisplayMode = ENUMS.BUY_CELL;


var monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
var days = ['Mon', 'Tue', 'Wed', 'Thi', 'Fri', 'Sat', 'Sun'];


var weekTest =[
        { date: '2017-03-20', buy: 100.345435, cell:100.345435, official:100.345435 },
        { date: '2017-03-23', buy: 170.345435, cell:120.43543534, official:100.345435 },
        { date: '2017-03-24', buy: 120.43543534, cell:100.345435, official:100.345435 },
        { date: '2017-03-25', buy: 150.34534534, cell:150.34534534, official:100.345435 },
        { date: '2017-03-21', buy: 120.3454353, cell:110.345435, official:100.345435 },
        { date: '2017-03-22', buy: 110.345435, cell:100.345435, official:100.345435 },
        { date: '2017-03-26', buy: 140.3454353534, cell:140.3454353534, official:100.345435 }
    ];

    var weekTest2 =[
        { date: '2017-03-27', buy: 100.345435, cell:120.43543534, official:100.345435 },
        { date: '2017-03-28', buy: 170.345435, cell:100.345435, official:100.345435 },
        { date: '2017-03-29', buy: 120.43543534, cell:150.34534534, official:100.345435 },
        { date: '2017-03-30', buy: 150.34534534, cell:100.345435, official:100.345435 },
        { date: '2017-03-31', buy: 120.3454353, cell:120.43543534, official:100.345435 },
        { date: '2017-04-01', buy: 110.345435, cell:150.34534534, official:100.345435},
        { date: '2017-04-02', buy: 140.3454353534, cell:140.3454353534, official:100.345435 }
    ];
    var weekTest3 =[
        { date: '2017-04-03', buy: 110.345435, cell:110.345435, official:100.345435 },
        { date: '2017-04-04', buy: 120.43543534, cell:100.345435, official:100.345435 },
        { date: '2017-04-05', buy: 150.34534534, cell:110.345435, official:100.345435 },
        { date: '2017-04-06', buy: 110.345435, cell:100.345435, official:100.345435 },
        { date: '2017-04-07', buy: 120.345435, cell:140.345435, official:100.345435 },
        { date: '2017-04-08', buy: 150.34534534, cell:150.34534534, official:100.345435 },
        { date: '2017-04-09', buy: 140.3454353534, cell:140.3454353534, official:100.345435 }
    ];

    var weeksArray = [weekTest, weekTest2, weekTest3];