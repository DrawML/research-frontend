/////////////////////////////////////////////
/////////Canvas fit to Window////////////////
/////////////////////////////////////////////
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

/////////////////////////////////////////////
////////////Drag & Drop Event Handler////////
/////////////////////////////////////////////
$( init );
function myHelper(event) {
    var iid= $(this).attr('id');
    return '<div id="draggableHelper">'+
        '<h3 style="display: table-cell;vertical-align: middle;text-align: center">'+iid+'</h3>'+
        '</div>';
}
function handleDragStop(event,ui){
    console.log($(this).attr('id'));
}

function handleDropEvent( event, ui ) {
    var draggable = ui.draggable;
    var wi=$('#leftSideBar').width();
    var ContainerTop =$('#paintContainer').offset().top;
    console.log(wi);
    if(ui.draggable.attr('id')=="LinearRegression"){
            console.log(ContainerTop,wi,canvasX, canvasY);
            var l = new LinearRegression(modelCnt++,canvasX-wi-150,canvasY-ContainerTop);
            models.push(l);
            currentSelectedModel=l;
            canvas.add(l.fabricModel);
            l.fabricModel.x
            l.optimizer.changeOptimizer('Gradient Descent');
            canvas.renderAll();
    }
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

/////////////////////////////////////////////
////////Control HTML&CSS Using JQuery////////
/////////////////////////////////////////////

$(document).ready(function(){
    //TODO : 처음에 Option메뉴 아무것도 안보이게 해야됨.

    //Change Initializer
    $('#change-Initializer-random_normal').click(function(){
        $('#change-Initializer-current').text($(this).text());
        $('#change-Initializer-value').show();
        $('#change-Initializer-value').val(currentSelectedModel.initializer.val);
        $('#change-Initializer-value-max').hide();
        $('#change-Initializer-value-min').hide();
        currentSelectedModel.changeInitializer($(this).text());

    });
    $('#change-Initializer-random_uniform').click(function(){
        $('#change-Initializer-current').text($(this).text());
        $('#change-Initializer-value').hide();
        $('#change-Initializer-value-max').show();
        $('#change-Initializer-value-min').show();
        $('#change-Initializer-value-max').val(currentSelectedModel.initializer.max);
        $('#change-Initializer-value-min').val(currentSelectedModel.initializer.min);
        currentSelectedModel.changeInitializer($(this).text());
    });

    $('#change-Initializer-value-input').on("change paste keyup", function() {
        currentSelectedModel.initializer.val = $(this).val();
    });

    $('#change-Initializer-value-max-input').on("change paste keyup", function() {
        currentSelectedModel.initializer.max = $(this).val();
    });

    $('#change-Initializer-value-min-input').on("change paste keyup", function() {
        currentSelectedModel.initializer.min = $(this).val();
    });


    //Change Optimizer
    $('#change-Optimizer-gradientDescent').click(function(){
        $('#change-Optimizer-current').text($(this).text());
        currentSelectedModel.changeOptimizer($(this).text());
    });
    $('#change-Optimizer-adadelta').click(function(){
        $('#change-Optimizer-current').text($(this).text());
        currentSelectedModel.changeOptimizer($(this).text());
    });
    $('#change-Optimizer-adagrad').click(function(){
        $('#change-Optimizer-current').text($(this).text());
        currentSelectedModel.changeOptimizer($(this).text());
    });
    $('#change-Optimizer-momentum').click(function(){
        $('#change-Optimizer-current').text($(this).text());
        currentSelectedModel.changeOptimizer($(this).text());
    });
    $('#change-Optimizer-adam').click(function(){
        $('#change-Optimizer-current').text($(this).text());
        currentSelectedModel.changeOptimizer($(this).text());
    });
    $('#change-Optimizer-ftrl').click(function(){
        $('#change-Optimizer-current').text($(this).text());
        currentSelectedModel.changeOptimizer($(this).text());
    });
    $('#change-Optimizer-rmsprop').click(function(){
        $('#change-Optimizer-current').text($(this).text());
        currentSelectedModel.changeOptimizer($(this).text());
    });

    $('#change-Optimizer-learningRate-input').on("change paste keyup", function() {
        currentSelectedModel.optimizer.learningRate = $(this).val();
    });

    //Change Regularization
    $('#change-regularization-enable-false').click(function(){
        $('#change-regularization-current').text($(this).text());
        $('#change-regularization-lambda').hide();
        currentSelectedModel.setRegularizationEnable('False');
    });
    $('#change-regularization-enable-true').click(function(){
        $('#change-regularization-current').text($(this).text());
        $('#change-regularization-lambda').show();
        $('#change-regularization-lambda-input').val(currentSelectedModel.lambda);
        currentSelectedModel.setRegularizationEnable('True');
    });
    $('#change-regularization-lambda-input').on("change paste keyup", function() {
        currentSelectedModel.setLambda($(this).val());
    });

    //Change Training Epoch
    $('#change-trainingEpoch-input').on("change paste keyup", function() {
        currentSelectedModel.changeTrainingEpoch($(this).val());
    });


});
