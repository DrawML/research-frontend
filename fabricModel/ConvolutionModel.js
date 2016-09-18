/*
 Convolution Network model
 */

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


