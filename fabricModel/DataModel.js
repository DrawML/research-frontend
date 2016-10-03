//FabricModel
function getDataContainer(type) {
    this.DataContainer = new fabric.Rect({
        fill:'#ffffff',
        rx:10,
        ry:10,
        width:200,
        height:75,
        stroke:"#1788B5",
        strokeWidth:2,
    });

    this.processName = new fabric.Text(type, {
        top:10,
        fontFamily: 'Comic Sans',
        fontSize: 20,
        fill :'#2A314F',
        textAlign:'center',
    });

    //객체 생성 후에, 가운데정렬
    this.processName.set({
        left : this.DataContainer.getWidth()/2 - this.processName.getWidth()/2,
        top : this.DataContainer.getHeight()/2 - this.processName.getHeight()/2
    });

    this.group = new fabric.Group([this.DataContainer,this.processName], {

    });

    return this.group;
}

function DataPreprocessingModel(id,type,pointLeft, pointTop){
    //Concat
    //Transpose
    this.ID=id;
    this.type =type;
    this.preseq=null;

    this.fabricModel=getDataContainer(this.type);
    this.fabricModel.set({
        left: pointLeft,
        top : pointTop
    });
    this.fabricModel.id=this.ID;
    this.fabricModel.on('selected',function(options){
        currentSelectedModel=getModelById(this.id);
        currentSelectedModel.changeOptionMenu();
        modelConnect(currentSelectedModel);
        clearConnectModelDelete();
    });
    this.fabricModel.on('moving',function (options) {
        currentSelectedModel=getModelById(this.id);
        trackingModel(currentSelectedModel);
    });

    this.changeOptionMenu =function () {
        clearDataShapeOption();
        clearDefaultOptions();
        clearLayerOption();
    }

    this.toXML =  function()
    {
        try
        {
            // var XML=new XMLWriter();
            // XML.BeginNode("");
            // XML.Node("data", this.type);
            // XML.Close();
            // console.log(XML.ToString().replace(/</g,"\n<"));
        }
        catch(Err)
        {
            alert("Error: " + Err.description);
        }
        return true;
    }
}

function InputModel(id,fileID,pointLeft, pointTop){
    this.ID=id;
    this.ShapeX=1;
    this.ShapeY=1;
    this.fileID =fileID;

    this.fabricModel=getDataContainer(this.fileID);
    this.fabricModel.set({
        left: pointLeft,
        top : pointTop
    });
    this.fabricModel.id=this.ID;
    this.fabricModel.on('selected',function(options){
        currentSelectedModel=getModelById(this.id);
        currentSelectedModel.changeOptionMenu();
        modelConnect(currentSelectedModel);
        clearConnectModelDelete();
    });

    this.fabricModel.on('moving',function (options) {
        currentSelectedModel=getModelById(this.id);
        trackingModel(currentSelectedModel);
    });

    this.changeOptionMenu =function () {
        makeDataShapeOption();
        clearDefaultOptions();
        clearLayerOption();
    }

    this.changeShapeX=function(val){
        this.ShapeX=val;
    }

    this.changeSHapeY = function(val){
        this.ShapeY=val;
    }

    this.toXML =  function()
    {
        try
        {
            //TODO
            // var XML=new XMLWriter();
            // XML.BeginNode("");
            // XML.Node("data", this.type);
            // XML.Close();
            // console.log(XML.ToString().replace(/</g,"\n<"));
        }
        catch(Err)
        {
            alert("Error: " + Err.description);
        }
        return true;
    }

}

function clearDataShapeOption(){
    $('#datashape-btn').hide();
    $('#div-datashape').collapse("hide");
}

function makeDataShapeOption(){
    $('#datashape-btn').show();
    $('#datashape-btn').addClass('collapsed');
}

