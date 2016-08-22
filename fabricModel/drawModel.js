/**
 * Created by 구한모 on 2016-08-16.
 */
var canvas = new fabric.Canvas('canvas');
var canvasX=0;
var canvasY=0;
canvas.on('mouse:move', function(options) {
    canvasX=options.e.clientX;
    canvasY=options.e.clientY;
    //console.log(canvasX,canvasY);
});

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

function random_uniform(){

    this.type = 'random_uniform';
    this.model = new getOptionContainer('random_uniform','init');
    this.min=-1.0;
    this.max=1.0;

    this.changeMinMax = function (min,max) {
        this.min=min;
        this.max=max;
        this.model.item(1).setText(this.type+" "+min+"~"+max);
        this.model.item(1).set({
            left : -this.model.item(1).getWidth()/2,
            top : -this.model.item(1).getHeight()/2
        });
    }

    //ToXml

}

function Optimizer(){

    this.list = ['gradient_descent','adam_optimizer'];

    this.type = 'gradient_descent';
    this.model = new getOptionContainer(this.type,'optimizer');
    this.learningRate =0.01;

    this.changeOptimizer = function (opti) {
        this.type = opti;
        this.model.item(1).setText(this.type);
        this.model.item(1).set({
            left : -this.model.item(1).getWidth()/2,
            top : -this.model.item(1).getHeight()/2
        });
    }
}

function Linear(pointLeft, pointTop){

    this.type =  "Linear Regression";
    this.initializer = new random_uniform();
    this.optimizer = new Optimizer();
    this.training_epoch = 1024;


    //fabric model
    this.fabricModel=new fabric.Group([getContainer(this.type),
        this.initializer.model,this.optimizer.model]
        ,{
            left:pointLeft,
            top : pointTop
        });

    this.fabricModel.on('selected',function(options){
        // if(!this.copy) {
        //     models.push(currentModel[0]);
        //     currentModel[0] = new Linear();
        //     canvas.add(currentModel[0].fabricModel);
        //     this.copy=true;
        // }
    });

    //change training epoch
    this.changeTrainingEpoch =function (val) {
        this.training_epoch=val;
    }

    //changeInitializer
    this.changeInitializer =function () {
        
    }
    
    this.writeToObject =function () {
        
    }

    //makeXML
    this.writeXML = function () {
        
    }
}