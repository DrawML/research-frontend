/**
 * Created by 구한모 on 2016-08-16.
 */
var canvas = new fabric.Canvas('canvas');
canvas.selection=false;
var canvasX=0;
var canvasY=0;
canvas.on('mouse:move', function(options) {
    canvasX=options.e.clientX;
    canvasY=options.e.clientY;
    //console.log(canvasX,canvasY);
});

/////////////////////////////////////////////
////////////manage ML models/////////////////
/////////////////////////////////////////////
var modelCnt=0;
var models=[];
var currentSelectedModel; // Use when I change options

function getModelById(id){
    for(model in models){
        console.log(models[model]);
        if(models[model].ID ===id) return models[model];
    }
    return null;
}
function getModelIdxById(id){
    for(model in models){
        console.log(models[model]);
        if(models[model].ID ===id) return model;
    }
    return null;
}

/*
 Fabric Container Models
 * */

function getContainer(algorithmName) {
    this.AlgoritmContainer = new fabric.Rect({
        fill:'#ffffff',
        rx:10,
        ry:10,
        width:300,
        height:200,
        stroke:"#1788B5",
        strokeWidth:2,
    });

    this.Algoname = new fabric.Text(algorithmName, {
        top:10,
        fontFamily: 'Comic Sans',
        fontSize: 30,
        fill :'#008C9E',
        textAlign:'center',
    });

    //객체 생성 후에, 가운데정렬
    this.Algoname.set({
        left : this.AlgoritmContainer.getWidth()/2 - this.Algoname.getWidth()/2,
    });

    this.group = new fabric.Group([this.AlgoritmContainer,this.Algoname], {

    });

    return this.group;
}

function getOptionContainer(opName,type){
    this.OptionContainer = new fabric.Rect({
        fill:'#014077',
        rx:10,
        ry:10,
        width:270,
        height:30,
        stroke:"#1788B5",
        strokeWidth:2,
    });

    this.OptionName = new fabric.Text(opName, {
        fontFamily: 'Comic Sans',
        fontSize: 20,
        fill :'#ffffff',
        textAlign:'center'
    });

    //객체 생성 후에, 가운데정렬
    this.OptionName.set({
        left : this.OptionContainer.getWidth()/2 - this.OptionName.getWidth()/2,
        top : this.OptionContainer.getHeight()/2 - this.OptionName.getHeight()/2,
    });

    this.group = new fabric.Group([this.OptionContainer,this.OptionName], {
        left: 15,
        top: type=='optimizer'? 150:100
    });

    return this.group;
}




/*
    Initializer Objects
* */

function Initializer(type){

    this.type = type;
    this.model = new getOptionContainer(type,'init');
    this.min=-1.0;
    this.max=1.0;
    this.val=1.0;

    this.changeType =function(type){
        this.type=type;
        this.model.item(1).setText(this.type);
        this.model.item(1).set({
            left : -this.model.item(1).getWidth()/2,
            top : -this.model.item(1).getHeight()/2
        });
        canvas.renderAll();

    }
    this.changeVal =function(val){
        this.val=val;
    }

    this.changeMinMax = function (min,max) {
        this.min=min;
        this.max=max;
        // this.model.item(1).setText(this.type+" "+min+"~"+max);
        // this.model.item(1).set({
        //     left : -this.model.item(1).getWidth()/2,
        //     top : -this.model.item(1).getHeight()/2
        // });
    }

    //ToXml
    this.toXML = function(XML){
        XML.BeginNode("initializer");
            XML.Node("type",this.type);
            if(this.type == 'random_uniform'){
                XML.Node("min",this.max.toString());
                XML.Node("max",this.min.toString());
            }
            else if(this.type == 'random_normal'){
                XML.Node("value",this.val.toString());
            }
            XML.EndNode();
        XML.EndNode();
    }

}

/*
 Optimizer Model
 * */
function Optimizer(type){
    this.type = type;
    this.model = new getOptionContainer(this.type,'optimizer');
    this.learningRate =0.01;

    this.changeOptimizer = function (opti) {
        this.type = opti;
        this.model.item(1).setText(this.type);
        this.model.item(1).set({
            left : -this.model.item(1).getWidth()/2,
            top : -this.model.item(1).getHeight()/2
        });
        canvas.renderAll();
    }

    this.changeLearningRate = function(rate){
        this.learningRate=rate;
    }

    //ToXml
    this.toXML = function(XML){
        XML.BeginNode("optimizer");
        XML.Node("type",this.type);
        XML.Node("learning_rate",this.learningRate.toString());
        XML.EndNode();
    }
}
/*
    Regularization
 */
function Regularization(){

    this.enable = 'false';
    this.lambda=0;

    this.changeEnable=function(can){
        this.enable=can;
    }
    this.changeLambda = function(val){
        this.lambda=val;
    }

    this.toXML = function(XML){
        XML.BeginNode("regularization");
            XML.Node("enable",this.enable.toString());
            if(this.enable=='true') XML.Node("lambda",this.lambda.toString());
        XML.EndNode();
    }

}

/*
    Last Models
 */
function Regression(id,type,pointLeft, pointTop){

    this.ID=id;
    this.type = type;
    this.initializer = new Initializer('random_uniform');
    this.optimizer = new Optimizer('gradient descent');
    this.regularization = new Regularization();
    this.training_epoch = 1024;

    //fabric model
    this.fabricModel=new fabric.Group([getContainer(this.type),
        this.initializer.model,this.optimizer.model]
        ,{
            left: pointLeft,
            top : pointTop
        });
    this.fabricModel.id=this.ID;

    this.fabricModel.on('selected',function(options){
        currentSelectedModel=getModelById(this.id);
        currentSelectedModel.changeOptionMenu();
    });

    this.changeOptionMenu =function () {

        //Set Initializer
        $('#initializer-btn').show();
        var iniType = this.initializer.type;
        $('#change-Initializer-current').text(iniType);
        if(iniType=='random_uniform'){
            $('#change-Initializer-value').hide();
            $('#change-Initializer-value-max').show();
            $('#change-Initializer-value-min').show();
        }else if(iniType=='random_normal'){
            $('#change-Initializer-value').show();
            $('#change-Initializer-value-max').hide();
            $('#change-Initializer-value-min').hide();
        }
        $('#change-Initializer-value-max-input').val(this.initializer.max);
        $('#change-Initializer-value-min-input').val(this.initializer.min);
        $('#change-Initializer-value-input').val(this.initializer.val);

        //Set Optimizer
        $('#optimizer-btn').show();
        $('#change-Optimizer-current').text(this.optimizer.type);
        $('#change-Optimizer-learningRate-input').val(this.optimizer.learningRate);

        //Set Regularization
        $('#regularization-btn').show();
        $('#change-regularization-current').text(this.regularization.enable);
        if(this.regularization=="false"){
            $('#change-regularization-lambda').hide();
        }else{
            $('#change-regularization-lambda').show();
        }
        $('#change-regularization-lambda-input').val(this.regularization.lambda);
        //Set trainingEpoch
        $('#trainingEpoch-btn').show();
        $('#change-trainingEpoch-input').val(this.training_epoch);

        //TODO : 다른 CNN,RNN등 모델들이 추가가 되었을 때. 나머지 옵션이 안보이게 처리해야됨.
    }

    //change Initializer
    this.changeInitializer =function (type) {
        this.initializer.changeType(type);
    }

    //change Optimizer
    this.changeOptimizer =function(type){
        this.optimizer.changeOptimizer(type);
    }

    //change Regularization
    this.setRegularizationEnable =function (can) {
        this.regularization.changeEnable(can);
    }

    this.setLambda = function(val){
        this.regularization.changeLambda(val);
    }

    //change training epoch
    this.changeTrainingEpoch =function (val) {
        this.training_epoch=val;
    }


    this.writeToObject =function () {
        
    }

    //makeXML
    this.toXML =  function()
    {
        try
        {
            var XML=new XMLWriter();
            XML.BeginNode("model");
            XML.Node("type", this.type);
            this.initializer.toXML(XML);
            this.optimizer.toXML(XML);
            this.regularization.toXML(XML);
            XML.Node("training_epoch",this.training_epoch.toString());
            XML.Close();
            console.log(XML.ToString().replace(/</g,"\n<"));
        }
        catch(Err)
        {
            alert("Error: " + Err.description);
        }
        return true;
    }

    this.changeOptionMenu();


}



/*
    NeralNetworks model
 */

function Layer(id,activation,input,output){
    this.id=id;
    this.activation = activation;
    this.input = input;
    this.output = output;

    this.makeLayer =function(){
        this.LayerContainer = new fabric.Rect({
            fill:'#ffffff',
            rx:10,
            ry:10,
            width:120,
            height:120,
            stroke:"#1788B5",
            strokeWidth:2,
        });

        this.LayerID = new fabric.Text("Layer "+this.id, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center',
        });

        this.LayerID.set({
            left : this.LayerContainer.getWidth()/2 - this.LayerID.getWidth()/2,
            top : 10,
        });

        this.Activation = new fabric.Text(this.activation, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center'
        });
        this.Activation.set({
            left : this.LayerContainer.getWidth()/2 - this.Activation.getWidth()/2,
            top : 10 + this.LayerContainer.getHeight()/4,
        });

        this.Input = new fabric.Text("IN : "+this.input, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center'
        });
        this.Input.set({
            left : this.LayerContainer.getWidth()/2 - this.Input.getWidth()/2,
            top : 10 + this.LayerContainer.getHeight()/4*2,
        });

        this.Output = new fabric.Text("OUT :  "+this.output, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center'
        });

        this.Output.set({
            left : this.LayerContainer.getWidth()/2 - this.Output.getWidth()/2,
            top : 10 + this.LayerContainer.getHeight()/4*3,
        });

        this.group = new fabric.Group([this.LayerContainer,this.LayerID,this.Activation,this.Input,this.Output], {

        });

        return this.group;
    }

    this.fabricModel = this.makeLayer();

    this.setId = function(id){
        this.id=id;
        this.fabricModel.getObjects()[1].setText('Layer ' +id);
        // this.model.item(1).set({
        //     left : -this.model.item(1).getWidth()/2,
        //     top : -this.model.item(1).getHeight()/2
        // });
        canvas.renderAll();
    }

    this.setActivation = function (type) {
        this.activation=type;
        this.fabricModel.getObjects()[2].setText(type);
        canvas.renderAll();
    }
    this.setLayerInput = function (input) {

    }
    this.setLayerOutput = function (output) {

    }
}


//Manage Layers
function LayerSet(){

    this.layers=[new Layer(1,'relu',10,10)];

    this.fabricModel =this.layers[0].fabricModel;

    this.addLayerFrontOf =function(position){
        //Shift
        for(var x = this.layers.length; x>position;x--){
            this.layers[x] = this.layers[x-1];
            this.layers[x].setId(x+1);
        }
        var newL = new Layer(position+1,'relu',10,10);
        this.layers[position] =  newL;

        //TODO : Update Canvas UI


    }

    this.addLayerBackOf = function (position) {
        this.addLayerFrontOf(position+1);
        //TODO : Update Canvas UI
    }

    this.deleteLayer=function(position){
        if(this.layers.length ==1) return;
        this.layers.splice(position-1,1);
        for(var x=0; x<this.layers.length;x++){
            this.layers[x].setId(x+1);
        }
        //TODO : Update Canvas UI
    }

    this.fabricModel;

    this.UpdateFabric = function(){
        var newModel =new fabric.Group([], {
            left: 15,
            top : 50
        });

        for(var x =0; x<this.layers.length;x++){
            this.layers[x].fabricModel.set({
                top : 0,
                left : x* 120 + x*10
            });
            newModel.addWithUpdate(this.layers[x].fabricModel);
        }

        this.fabricModel = newModel;
    }

    this.setActivation = function (layer,type) {
        this.layers[layer-1].setActivation(type);
    }
    this.setLayerInput = function (layer,input) {

    }
    this.setLayerOutput = function (layer,output) {

    }

}


function NeuralContainer(layerN){
    this.AlgoritmContainer = new fabric.Rect({
        fill:'#ffffff',
        rx:10,
        ry:10,
        width:120+130*(layerN),
        height:250,
        stroke:"#1788B5",
        strokeWidth:2,
    });

    this.Algoname = new fabric.Text("Neural Network", {
        top:10,
        fontFamily: 'Comic Sans',
        fontSize: 30,
        fill :'#008C9E',
        textAlign:'center',
    });

    //객체 생성 후에, 가운데정렬
    this.Algoname.set({
        left : this.AlgoritmContainer.getWidth()/2 - this.Algoname.getWidth()/2,
    });

    this.group = new fabric.Group([this.AlgoritmContainer,this.Algoname], {

    });

    return this.group;

}


function NeuralNetworks(id,pointLeft, pointTop){
    this .type = "neural_network"
    this.layerSet=new LayerSet();
    this.initializer = new Initializer('random_uniform');
    this.optimizer = new Optimizer('gradient descent');
    this.regularization = new Regularization();
    this.training_epoch = 1024;
    this.container=null;
    this.ID=id;

    this.getContainer= function(){
        this.container = new NeuralContainer(this.layerSet.layers.length);
        return this.container;
    }

    this.fabricModel= new fabric.Group([this.getContainer(),this.layerSet.fabricModel], {
        left:pointLeft,
        top:pointTop
    });
    this.fabricModel.id=this.ID;

    this.updateFabricModel = function(){
        this.layerSet.UpdateFabric();
        this.layerSet.fabricModel.set({
            left:60,
            top:75
        });
        var replaceModel = new fabric.Group([this.getContainer(),this.layerSet.fabricModel], {
                left:this.fabricModel.left,
                top:this.fabricModel.top
        });
        canvas.remove(this.fabricModel);
        this.fabricModel = replaceModel;
        this.fabricModel.id=this.ID;
        this.fabricModel.on('selected',function(options){
            currentSelectedModel=getModelById(this.id);
            currentSelectedModel.changeOptionMenu();
        });
        canvas.add(this.fabricModel);
        canvas.renderAll();
    }

    this.fabricModel.on('selected',function(options){
        currentSelectedModel=getModelById(this.id);
        currentSelectedModel.changeOptionMenu();
    });

    this.changeOptionMenu =function () {

        //Set Initializer
        $('#initializer-btn').show();
        var iniType = this.initializer.type;
        $('#change-Initializer-current').text(iniType);
        if(iniType=='random_uniform'){
            $('#change-Initializer-value').hide();
            $('#change-Initializer-value-max').show();
            $('#change-Initializer-value-min').show();
        }else if(iniType=='random_normal'){
            $('#change-Initializer-value').show();
            $('#change-Initializer-value-max').hide();
            $('#change-Initializer-value-min').hide();
        }
        $('#change-Initializer-value-max-input').val(this.initializer.max);
        $('#change-Initializer-value-min-input').val(this.initializer.min);
        $('#change-Initializer-value-input').val(this.initializer.val);

        //Set Optimizer
        $('#optimizer-btn').show();
        $('#change-Optimizer-current').text(this.optimizer.type);
        $('#change-Optimizer-learningRate-input').val(this.optimizer.learningRate);

        //Set Regularization
        $('#regularization-btn').show();
        $('#change-regularization-current').text(this.regularization.enable);
        if(this.regularization=="false"){
            $('#change-regularization-lambda').hide();
        }else{
            $('#change-regularization-lambda').show();
        }
        $('#change-regularization-lambda-input').val(this.regularization.lambda);
        //Set trainingEpoch
        $('#trainingEpoch-btn').show();
        $('#change-trainingEpoch-input').val(this.training_epoch);

    }


    this.addLayerFrontOf = function(position){

        this.layerSet.addLayerFrontOf(position);
        this.layerSet.UpdateFabric();
        this.updateFabricModel();

    }

    this.addLayerBackOf = function(position){
        this.layerSet.addLayerBackOf(position);
        this.layerSet.UpdateFabric();
        this.updateFabricModel();
    }

    this.deleteLayer = function (position) {
        this.layerSet.deleteLayer(position);
        this.layerSet.UpdateFabric();
        this.updateFabricModel();
    }


    this.getLayerLength = function(){
        return this.layerSet.layers.length;
    }


    //change Initializer
    this.changeInitializer =function (type) {
        this.initializer.changeType(type);
    }

    //change Optimizer
    this.changeOptimizer =function(type){
        this.optimizer.changeOptimizer(type);
    }

    //change Regularization
    this.setRegularizationEnable =function (can) {
        this.regularization.changeEnable(can);
    }

    this.setLambda = function(val){
        this.regularization.changeLambda(val);
    }

    //change training epoch
    this.changeTrainingEpoch =function (val) {
        this.training_epoch=val;
    }
    
    this.setActivation = function (layer,type) {
        this.layerSet.setActivation(layer,type);
    }
    this.setLayerInput = function (layer,input) {
        
    }
    this.setLayerOutput = function (layer,output) {

    }

}

function makeLayerOption(LayerNumber){
    var option = $('#btn-dummy').clone(true);
    var optionLayer = $('#dummyLayer').clone(true);
    option.attr('id','btn-layer'+LayerNumber.toString()).show();
    option.html('Layer'+LayerNumber.toString());
    option.attr('data-target','#layer'+LayerNumber.toString());
    optionLayer.attr('id','layer'+LayerNumber.toString());
    optionLayer.addClass('collapse');
    $('#model-addlayer-btn').before(option);
    $('#model-addlayer-btn').before(optionLayer);

    //Event Handling
    var btngroup= optionLayer.children().eq(0);
    btngroup.find('a').click(function(){
        btngroup.find('button').text($(this).text());
        currentSelectedModel.setActivation(LayerNumber,$(this).text());
    });

    var inputDiv =optionLayer.children().eq(1).find('input');
    inputDiv.on("change paste keyup", function() {
        currentSelectedModel.setLayerInput($(this).val());
    });

    var outputDiv =optionLayer.children().eq(2).find('output');
    outputDiv.on("change paste keyup", function() {
        currentSelectedModel.setLayerOutput($(this).val());
    });

    var delBtn =optionLayer.children().eq(3);
    delBtn.click(function(){
        currentSelectedModel.deleteLayer(LayerNumber);
        if(LayerNumber!=1) {
            option.hide();
            optionLayer.hide();
        }
    });
    
}

