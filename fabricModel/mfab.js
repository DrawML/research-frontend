var models=[];
//var currentModel=[new Linear()];


function canvaResize (event) {
    var canvasConiner = document.getElementById('canvasContaianer');
    var mid = document.getElementById('mid');
    var head = document.getElementById('nav_head');
    var foot = document.getElementById('nav_footer')
    canvas.setWidth(canvasConiner.clientWidth);
    canvas.setHeight(mid.clientHeight-head.clientHeight-foot.clientHeight);
    canvas.calcOffset();
}

window.onresize = canvaResize;

canvaResize();

canvas.renderAll();

$( init );

function myHelper(event) {
    var iid= $(this).attr('id');
    return '<div id="draggableHelper">'+iid+'</div>';
}
function handleDragStop(event,ui){
    console.log($(this).attr('id'));
}

function handleDropEvent( event, ui ) {
    var draggable = ui.draggable;
    var wi=$('#leftSideBar').width();
    var ContainerTop =$('#paintContainer').offset().top;
    console.log(wi);
    if(ui.draggable.attr('id')=="model_LinearRegression"){
            console.log(ContainerTop,wi,canvasX, canvasY);
            var l = new Linear(canvasX-wi-150,canvasY-ContainerTop);
            canvas.add(l.fabricModel);
            l.fabricModel.x
            l.optimizer.changeOptimizer('Gradient Descent');
            canvas.renderAll();
    }
    console.log( draggable.attr('id') + '" was dropped onto me!' );
}

function init() {
    $('#leftSideBar .list-group-item').draggable( {
        cursor: 'move',
        containment: 'document',
        helper: myHelper,
        stop: handleDragStop
    } );
    $('#canvasContaianer').droppable( {
        drop: handleDropEvent
    } );
}