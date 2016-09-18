/*
 Convolution Network model
 */

function CNNDropOut(conv,hidden){
    this.conv= typeof conv !=='undefined' ? conv: 0.8;
    this.hidden= typeof hidden !=='undefined' ? hidden: 0.8;

    this.changeValue = function(conv,hidden){
        this.conv=conv;
        this.hidden=hidden;
    }

    this.toXML=function(XML){
    }
    this.toXML = function(XML){
        XML.Node("dropout_conv",this.conv.toString());
        XML.Node("dropout_hidden",this.hidden.toString());

    }
}

function CNNActivation(type,sv,sh,pad){
    this.type = typeof type !=='undefined' ? type:"relu";
    this.strides_vertical= typeof sv !=='undefined' ? sv:2;
    this.strides_horizontal= typeof sh !=='undefined' ? sh:2;
    this.padding= typeof pad !=='undefined' ? pad:"same";


    this.changeValue = function (type,sv,sh,pad) {
        this.type = type;
        this.strides_vertical= sv;
        this.strides_horizontal= sh;
        this.padding= pad;
    }

    this.toXML = function(XML){
        XML.BeginNode("activation");
        XML.Node("type",this.type.toString());
        XML.Node("strides_vertical",this.strides_vertical.toString());
        XML.Node("strides_horizontal",this.strides_horizontal.toString());
        XML.Node("padding",this.padding.toString());
        XML.EndNode();
    }
}

function CNNPooling(type,sv,sh,pad){
    this.type = typeof type !=='undefined' ? type:"max";
    this.strides_vertical= typeof sv !=='undefined' ? sv:2;
    this.strides_horizontal= typeof sh !=='undefined' ? sh:2;
    this.padding= typeof pad !=='undefined' ? pad:"same";


    this.changeValue = function (type,sv,sh,pad) {
        this.type = type;
        this.strides_vertical= sv;
        this.strides_horizontal= sh;
        this.padding= pad;
    }

    this.toXML = function(XML){
        XML.BeginNode("activation");
        XML.Node("type",this.type.toString());
        XML.Node("strides_vertical",this.strides_vertical.toString());
        XML.Node("strides_horizontal",this.strides_horizontal.toString());
        XML.Node("padding",this.padding.toString());
        XML.EndNode();
    }

}

function CNNLayer(id,activation,pooling,inputX,inputY,inputZ,output){
    this.id=id;
    this.activation = activation;
    this.pooling = pooling;
    this.inputX = inputX;
    this.inputY = inputY;
    this.inputZ = inputZ;
    this.output = output;

    this.makeLayer =function(){
        this.LayerContainer = new fabric.Rect({
            fill:'#ffffff',
            rx:10,
            ry:10,
            width:120,
            height:190,
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

        this.ActivationF = new fabric.Text(this.activation.type, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center'
        });
        this.ActivationF.set({
            left : this.LayerContainer.getWidth()/2 - this.ActivationF.getWidth()/2,
            top : 10 + this.LayerContainer.getHeight()/7,
        });

        this.poolingF = new fabric.Text(this.pooling.type, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center'
        });
        this.poolingF.set({
            left : this.LayerContainer.getWidth()/2 - this.poolingF.getWidth()/2,
            top : 10 + this.LayerContainer.getHeight()/7*2,
        });

        this.InputXF = new fabric.Text("IN_X : "+this.inputX, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center'
        });
        this.InputXF.set({
            left : this.LayerContainer.getWidth()/2 - this.InputXF.getWidth()/2,
            top : 10 + this.LayerContainer.getHeight()/7*3,
        });

        this.InputYF = new fabric.Text("IN_Y : "+this.inputY, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center'
        });
        this.InputYF.set({
            left : this.LayerContainer.getWidth()/2 - this.InputYF.getWidth()/2,
            top : 10 + this.LayerContainer.getHeight()/7*4,
        });

        this.InputZF = new fabric.Text("IN_Z : "+this.inputZ, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center'
        });
        this.InputZF.set({
            left : this.LayerContainer.getWidth()/2 - this.InputZF.getWidth()/2,
            top : 10 + this.LayerContainer.getHeight()/7*5,
        });

        this.OutputF = new fabric.Text("OUT :  "+this.output, {
            fontFamily: 'Comic Sans',
            fontSize: 15,
            fill :'#000000',
            textAlign:'center'
        });

        this.OutputF.set({
            left : this.LayerContainer.getWidth()/2 - this.OutputF.getWidth()/2,
            top : 10 + this.LayerContainer.getHeight()/7*6,
        });

        this.group = new fabric.Group([this.LayerContainer,
                                        this.LayerID,
                                        this.ActivationF,
                                        this.poolingF,
                                        this.InputXF,
                                        this.InputYF,
                                        this.InputZF,
                                        this.OutputF], {

        });

        return this.group;
    }

    this.fabricModel = this.makeLayer();

    this.setId = function(id){
        this.id=id;
        this.fabricModel.getObjects()[1].setText('Layer ' +id);
        canvas.renderAll();
    }

    this.setActivation = function (type,sv,sh,pad) {
        this.activation.changeValue(type,sv,sh,pad);
        this.fabricModel.getObjects()[2].setText(type);
        canvas.renderAll();
    }

    this.setPooling = function (type,sv,sh,pad) {
        this.pooling.changeValue(type,sv,sh,pad);
        this.fabricModel.getObjects()[3].setText(type);
        canvas.renderAll();
    }

    this.setLayerInputX = function (input) {
        this.inputX=input;
        this.fabricModel.getObjects()[4].setText('IN_X : '+input);
        canvas.renderAll();
    }

    this.setLayerInputY = function (input) {
        this.inputY=input;
        this.fabricModel.getObjects()[5].setText('IN_Y : '+input);
        canvas.renderAll();
    }

    this.setLayerInputZ = function (input) {
        this.inputZ=input;
        this.fabricModel.getObjects()[6].setText('IN_Z : '+input);
        canvas.renderAll();
    }
    this.setLayerOutput = function (output) {
        this.output=output;
        this.fabricModel.getObjects()[7].setText('OUT : '+output);
        canvas.renderAll();
    }

    this.toXML = function(XML){
        XML.BeginNode("layer");
        XML.Attrib("id",this.id.toString());
        XML.Node("type","convolution");
        this.activation.toXML();
        this.pooling.toXML();
        XML.Node("input_x",this.inputX.toString());
        XML.Node("input_y",this.inputY.toString());
        XML.Node("input_z",this.inputZ.toString());
        XML.Node("output",this.output.toString());
        XML.EndNode();
    }
}

function CNNLayerSet(){

    this.layers=[new CNNLayer(1,new CNNActivation(),
                    new CNNPooling(),
                    10,
                    10,
                    10,
                    10)];

    this.fabricModel =this.layers[0].fabricModel;
    this.addLayerFrontOf =function(position){
        //Shift
        for(var x = this.layers.length; x>position;x--){
            this.layers[x] = this.layers[x-1];
            this.layers[x].setId(x+1);
        }

        var newL = new CNNLayer(position+1,
                                new CNNActivation(),
                                new CNNPooling(),
                                10,
                                10,
                                10,
                                10);

        this.layers[position] =  newL;
    }

    this.addLayerBackOf = function (position) {
        this.addLayerFrontOf(position+1);
    }

    this.deleteLayer=function(position){
        if(this.layers.length ==1) return;
        this.layers.splice(position-1,1);
        for(var x=0; x<this.layers.length;x++){
            this.layers[x].setId(x+1);
        }
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

    this.setActivation = function (layer,type,sv,sh,pad) {
        this.layers[layer-1].setActivation(type,sv,sh,pad);
    }

    this.setPooling = function (layer,type,sv,sh,pad) {
        this.layers[layer-1].setPooling(type,sv,sh,pad);
    }

    this.setLayerInputX = function (layer,input) {
        this.layers[layer-1].setLayerInputX(input);
    }

    this.setLayerInputY = function (layer,input) {
        this.layers[layer-1].setLayerInputY(input);
    }

    this.setLayerInputY = function (layer,input) {
        this.layers[layer-1].setLayerInputZ(input);
    }

    this.setLayerOutput = function (layer,output) {
        this.layers[layer-1].setLayerOutput(output);
    }

    this.toXML = function(XML){
        XML.BeginNode("layer_set");
        XML.Node("size",this.layers.length.toString());
        for(var x=0; x<this.layers.length;x++){
            this.layers[x].toXML(XML);
        }
        XML.EndNode();
    }
}

function CNNContainer(layerN){
    this.AlgoritmContainer = new fabric.Rect({
        fill:'#ffffff',
        rx:10,
        ry:10,
        width:120+130*(layerN),
        height:280,
        stroke:"#1788B5",
        strokeWidth:2,
    });

    this.Algoname = new fabric.Text("Convolution NN", {
        top:10,
        fontFamily: 'Comic Sans',
        fontSize: 30,
        fill :'#008C9E',
        textAlign:'center',
    });

    this.Algoname.set({
        left : this.AlgoritmContainer.getWidth()/2 - this.Algoname.getWidth()/2,
    });

    this.group = new fabric.Group([this.AlgoritmContainer,this.Algoname], {

    });

    return this.group;

}

function ConvolutionNeuralNetworks(id,pointLeft, pointTop){
    this.type = "convolution_neural_network";
    this.layerSet=new CNNLayerSet();
    this.dropOut = new CNNDropOut();
    this.initializer = new Initializer('random_uniform');
    this.optimizer = new Optimizer('gradient descent');
    this.regularization = new Regularization();
    this.training_epoch = 1024;
    this.container=null;
    this.ID=id;

    this.getContainer= function(){
        this.container = new CNNContainer(this.layerSet.layers.length);
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


        clearLayerOption();
        // TODO
        // for(var x =0; x<this.layerSet.layers.length;x++) makeLayerOption(x+1);
        $('#model-addlayer-btn').show();

        //TODO 옵션!
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
        this.changeOptionMenu();
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

    this.setDropOut = function(conv,hidden){
        this.dropOut.changeValue(conv,hidden);
    }

    this.setActivation = function (layer,type,sv,sh,pad){
        this.layerSet.setActivation(layer,type,sv,sh,pad);
    }

    this.setPooling = function (layer,type,sv,sh,pad){
        this.layerSet.setPooling(layer,type,sv,sh,pad);
    }

    this.setLayerInputX = function (layer,input) {
        this.layerSet.setLayerInputX(layer,input);
    }

    this.setLayerInputY = function (layer,input) {
        this.layerSet.setLayerInputY(layer,input);
    }

    this.setLayerInputZ = function (layer,input) {
        this.layerSet.setLayerInputZ(layer,input);
    }

    this.setLayerOutput = function (layer,output) {
        this.layerSet.setLayerOutput(layer,output);
    }

    this.toXML =  function()
    {
        try
        {
            var XML=new XMLWriter();
            XML.BeginNode("model");
            XML.Node("type", "convolution_neural_network");
            this.dropOut.toXML();
            this.layerSet.toXML(XML);
            this.initializer.toXML(XML);
            this.optimizer.toXML(XML);
            this.regularization.toXML(XML);
            XML.Node("training_epoch",this.training_epoch.toString());
            XML.EndNode();
            XML.Close();
            console.log(XML.ToString().replace(/</g,"\n<"));
        }
        catch(Err)
        {
            alert("Error: " + Err.description);
        }
        return true;
    }
}

