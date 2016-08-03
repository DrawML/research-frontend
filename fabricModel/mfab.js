var canvas = new fabric.Canvas('canvas');

var AlgoritmContainer = fabric.util.createClass(fabric.Rect, {

  type: 'AlgoritmContainer',

  initialize: function(options) {
    options || (options = {}); 
    this.callSuper('initialize', options);
    this.fill='#ffffff';
    this.rx=10;
    this.ry=10;
    this.width=300;
    this.height=200;
    this.stroke="#1788B5";
    this.strokeWidth=2;
    this.options=options;
    this.set('label', options.label || 'Algorithm');
  },
  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      label: this.get('label')
    });
  },

  _render: function(ctx, notransform) {
    this.callSuper('_render', ctx);
      
    ctx.font = '30px Helvetica';
    ctx.fillStyle = '#008C9E';
    ctx.fillText(this.label, -this.width/2+this.options.x, -this.height/2 + this.options.y);
  }
});



var LinearRegression = fabric.util.createClass(fabric.Group, {

  type: 'LinearRegression',

  initialize: function(options) {
    options || (options = {}); 
    var algoritmContainer = new AlgoritmContainer({
        x:30,
        y:40,
        label:'LinearRegression'
    });

    
    var initializer = new fabric.Text('Initializer', {    
        left: 25,
        top: 100,
        fontSize : 20,
        fontFamily : 'Helvetica',
    });
      
      
    var Optimizer = new fabric.Text('Optimizer', {
        left: 25,
        top: 150,
        fontSize : 20,
        fontFamily : 'Helvetica'
    });
      
    this.callSuper('initialize', [ algoritmContainer, Optimizer, initializer ],
            options);
  },
  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      label: this.get('label')
    });
  },

  _render: function(ctx, notransform) {
    this.callSuper('_render', ctx);
  }
});


var linearRegression = new LinearRegression({
    left: 10,
    top: 100,
});



var circle1 = new fabric.Circle({
  radius: 50,
  fill: 'red',
  left: 0
});


linearRegression._objects.push(circle1);
canvas.add(linearRegression);







