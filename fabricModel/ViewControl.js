/////////////////////////////////////////////
////////////Drag & Drop Event Handler////////
/////////////////////////////////////////////
$( init );
function myHelper(event) {
    var iid= $(this).text();
    if($(this).hasClass('dataPreprocess') || $(this).hasClass('data')){
        return '<div id="dataDraggableHelper">'+
            '<h3 style="display: table-cell;vertical-align: middle;text-align: center;">'+iid+'</h3>'+
            '</div>';
    }
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
    if(ui.draggable.attr('id')=="LinearRegression"){
        clearDataShapeOption();
        clearLayerOption();
        makeDefaultOptions()
            var l = new Regression(modelCnt++,'Linear regression',canvasX-wi-150,canvasY-ContainerTop);
            models.push(l);
            currentSelectedModel=l;
            canvas.add(l.fabricModel);
            canvas.renderAll();
    }else if(ui.draggable.attr('id')=="PolynomialRegression"){
        clearDataShapeOption();
        clearLayerOption();
        makeDefaultOptions()
        var l = new Regression(modelCnt++,'Polynomial regression',canvasX-wi-150,canvasY-ContainerTop);
        models.push(l);
        currentSelectedModel=l;
        canvas.add(l.fabricModel);
        canvas.renderAll();
    }else if(ui.draggable.attr('id')=="SoftMaxRegression"){
        clearDataShapeOption();
        clearLayerOption();
        makeDefaultOptions()
        var l = new Regression(modelCnt++,'SoftMax regression',canvasX-wi-150,canvasY-ContainerTop);
        models.push(l);
        currentSelectedModel=l;
        canvas.add(l.fabricModel);
        canvas.renderAll();
    }else if(ui.draggable.attr('id')=="NeuralNetworks"){
        clearLayerOption();
        clearDataShapeOption();
        makeDefaultOptions()
        var l = new NeuralNetworks(modelCnt++,canvasX-wi-150,canvasY-ContainerTop);
        models.push(l);
        currentSelectedModel=l;
        canvas.add(l.fabricModel);
        l.updateFabricModel();
        canvas.renderAll();
        makeLayerOption(1);
        $('#model-addlayer-btn').show();
    }else if(ui.draggable.attr('id')=="ConvolutionNeuralNet"){
        clearLayerOption();
        clearDataShapeOption();
        makeDefaultOptions()
        var l = new ConvolutionNeuralNetworks(modelCnt++,canvasX-wi-150,canvasY-ContainerTop);
        models.push(l);
        currentSelectedModel=l;
        canvas.add(l.fabricModel);
        l.updateFabricModel();
        canvas.renderAll();
        makeCNNLayerOption(1);
        $('#model-addlayer-btn').show();
    }else if(ui.draggable.hasClass('dataPreprocess')){
        clearLayerOption();
        clearDataShapeOption();
        clearDefaultOptions();
        var l = new DataPreprocessingModel(modelCnt++,ui.draggable.text(),canvasX-wi-150,canvasY-ContainerTop);
        models.push(l);
        currentSelectedModel=l;
        canvas.add(l.fabricModel);
        canvas.renderAll();
    }else if(ui.draggable.hasClass('data')){
        clearLayerOption();
        makeDataShapeOption();
        clearDefaultOptions();
        var l = new InputModel(modelCnt++,ui.draggable.text(),canvasX-wi-150,canvasY-ContainerTop);
        models.push(l);
        currentSelectedModel=l;
        canvas.add(l.fabricModel);
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

    clearDefaultOptions();
    clearDataShapeOption();
    clearConnectModelDelete();

    //왼쪽 탭 설정
    $('#model_group').show();
    $('#data_preprocessing_group').hide();
    $('#data_user_group').hide();

    $('#model_select_view').click(function(){
        if($(this).hasClass(".active")===true) return;
        else {
            $(this).addClass("active");
            $('#data_select_view').removeClass("active");

            $('#model_group').show();
            $('#data_preprocessing_group').hide();
            $('#data_user_group').hide();
        }
    });

    $('#data_select_view').click(function(){
        if($(this).hasClass(".active")===true) return;
        else {
            $(this).addClass("active");
            $('#model_select_view').removeClass("active");

            $('#model_group').hide();
            $('#data_preprocessing_group').show();
            $('#data_user_group').show();
        }
    });



    $('#model-addlayer-btn').hide();

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


    //TODO : ?????????????????????이게뭐
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
        currentSelectedModel.setRegularizationEnable('false');
    });
    $('#change-regularization-enable-true').click(function(){
        $('#change-regularization-current').text($(this).text());
        $('#change-regularization-lambda').show();
        $('#change-regularization-lambda-input').val(currentSelectedModel.lambda);
        currentSelectedModel.setRegularizationEnable('true');
    });
    $('#change-regularization-lambda-input').on("change paste keyup", function() {
        currentSelectedModel.setLambda($(this).val());
    });

    //Change Training Epoch
    $('#change-trainingEpoch-input').on("change paste keyup", function() {
        currentSelectedModel.changeTrainingEpoch($(this).val());
    });





    //Models To XML
    $('#footer-toxml-btn').click(function () {
        console.log('--------------Model -> XML---------------')
        console.log('//////////Current Model List//////////////');
        console.log(models.length + '개의 모델들이 있다.');
        for(var x in models){
            models[x].toXML();
        }
    });


    //Connection Delete

    $('#connectionDelete').click(function () {
        deleteLineArrow();
    });

    //Model delete
    $('#model-delete-btn').click(function () {
        clearLayerOption();
        clearLine(currentSelectedModel);
        var curIdx=getModelIdxById(currentSelectedModel.ID);
        models.splice(curIdx,1);
        canvas.remove(currentSelectedModel.fabricModel);
        currentSelectedModel=null;
    });

    $('#model-addlayer-btn').click(function(){
        if((currentSelectedModel instanceof NeuralNetworks)) {
            //Option UI 생성
            makeLayerOption(currentSelectedModel.getLayerLength() + 1);
            //모델객체에 레이어 추가.
            currentSelectedModel.addLayerBackOf(currentSelectedModel.getLayerLength() - 1);
        }else if(currentSelectedModel instanceof ConvolutionNeuralNetworks){
            makeCNNLayerOption(currentSelectedModel.getLayerLength()+1);
            currentSelectedModel.addLayerBackOf(currentSelectedModel.getLayerLength() - 1);
        }
    });


    //Data INPUT EVENT

    $('#change-datashape-x-input').on("change paste keyup", function() {
        currentSelectedModel.changeShapeX($(this).val());
    });
    $('#change-datashape-y-input').on("change paste keyup", function() {
        currentSelectedModel.changeSHapeY($(this).val());
    });


    //Model Selection

    $('#connectModel').click(function () {
        if($(this).hasClass('btn-success')){//선택했을때
            connectStart();
        }else{//선택중일때 -> 취소
            connectComplete();
        }
    });

});

/////////////////////////////////////////////
////////////Control Connect Model////////////
/////////////////////////////////////////////

function connectStart(){
    $('#connectModel').removeClass('btn-success');
    $('#connectModel').addClass('btn-danger');
    $('#connectModel').text("Connecting.....");
    canvas.deactivateAll().renderAll();
    makingModel=true;

}

function connectComplete(){
    $('#connectModel').removeClass('btn-danger');
    $('#connectModel').addClass('btn-success');
    $('#connectModel').text("Connect Model");
}