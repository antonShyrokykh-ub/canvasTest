$(function (){
    var canvas = $('#canvas');
    var container = $('#canvasContainer');
    function OnWindowResize(){
        canvas.attr('height', container.height());
        canvas.attr('width', container.width());
    }
    $(window).resize(OnWindowResize);
    OnWindowResize();
});