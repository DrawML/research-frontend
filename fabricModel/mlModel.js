// /**
//  * Created by 구한모 on 2016-08-05.
//  */
// var AlgoritmContainer = fabric.util.createClass(fabric.Rect, {
//
//     type: 'AlgoritmContainer',
//
//     initialize: function(options) {
//         options || (options = {});
//         this.callSuper('initialize', options);
//         this.fill='#ffffff';
//         this.rx=10;
//         this.ry=10;
//         this.width=300;
//         this.height=200;
//         this.stroke="#1788B5";
//         this.strokeWidth=2;
//         this.options=options;
//         this.set('label', options.label || 'Algorithm');
//     },
//     toObject: function() {
//         return fabric.util.object.extend(this.callSuper('toObject'), {
//             label: this.get('label')
//         });
//     },
//
//     _render: function(ctx, notransform) {
//         this.callSuper('_render', ctx);
//
//         ctx.font = '30px Helvetica';
//         ctx.fillStyle = '#008C9E';
//         ctx.fillText(this.label, -this.width/2+this.options.x, -this.height/2 + this.options.y);
//     }
// });
//
// var OptimizerModel = fabric.util.createClass(fabric.Rect, {
//
//     type: 'Optimizer',
//
//     initialize: function(options) {
//         options || (options = {});
//         this.callSuper('initialize', options);
//         this.set('label', options.label || '');
//         this.fill='#014077';
//         this.width=270;
//         this.height=30;
//         this.rx=10;
//         this.ry=10;
//
//     },
//     toObject: function() {
//         return fabric.util.object.extend(this.callSuper('toObject'), {
//             label: this.get('label')
//         });
//     },
//
//     _render: function(ctx, notransform) {
//         this.callSuper('_render', ctx);
//         ctx.font = '20px Helvetica';
//         ctx.fillStyle = '#ffffff';
//         ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
//     }
// });
//
// var initializerModel = fabric.util.createClass(fabric.Rect, {
//
//     type: 'Initializer',
//
//     initialize: function(options) {
//         options || (options = {});
//         this.callSuper('initialize', options);
//         this.set('label', options.label || '');
//         this.fill='#014077';
//         this.width=270;
//         this.height=30;
//         this.rx=10;
//         this.ry=10;
//
//     },
//     toObject: function() {
//         return fabric.util.object.extend(this.callSuper('toObject'), {
//             label: this.get('label')
//         });
//     },
//
//     _render: function(ctx, notransform) {
//         this.callSuper('_render', ctx);
//         ctx.font = '20px Helvetica';
//         ctx.fillStyle = '#ffffff';
//         ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
//     }
// });
//
// var LinearRegressionModel = fabric.util.createClass(fabric.Group, {
//
//     type: 'LinearRegression',
//
//     initialize: function(options) {
//         options || (options = {});
//         var algoritmContainer = new AlgoritmContainer({
//             x:30,
//             y:40,
//             label:'LinearRegression',
//         });
//         this.callSuper('initialize', [ algoritmContainer,  options.initializer ,options.optimizer],
//             options);
//     },
//     toObject: function() {
//         return fabric.util.object.extend(this.callSuper('toObject'), {
//             label: this.get('label')
//         });
//     },
//
//     _render: function(ctx, notransform) {
//         this.callSuper('_render', ctx);
//     }
// });
//
//
//
// /*
//  * 실제 사용하게 될 최종 Model 들
//  * */
//
// function Optimizer(name){
//     this.type = name||'GradientDescent';
//     this.model = new OptimizerModel({
//         left: 15,
//         top: 150,
//         label: 'Optimizer : '+this.type
//     });
//
//     this.changeOptimizer = function (opti) {
//         this.model.set({
//             label: 'Optimizer :' + opti
//         });
//         this.type=opti;
//     }
//
//     this.getType = function () {
//         return this.type;
//     }
//     this.getModel = function(){
//         return this.model;
//     }
//
//
// }
//
// function Initializer(name){
//     this.type = name||'random_uniform';
//     this.model = new initializerModel({
//         left: 15,
//         top: 100,
//         label: 'initializer :random_uniform'
//     });
//
//     this.changeInitializer = function (ini) {
//         this.model.set({
//             label: 'Initializer :' + ini
//         });
//         this.type=ini;
//     }
//
//     this.getType = function () {
//         return this.type;
//     }
//
//     this.getModel = function(){
//         return this.model;
//     }
//
// }
//
// function LinearRegression(leftN,topN){
//
//     this.type = 'LinearRegression';
//     this.initializer= new Initializer();
//     this.optimizer=new Optimizer();
//     this.training_epoch='1024';
//
//     this.model = new LinearRegressionModel({
//         left : 10,
//         top : 100,
//         initializer : this.initializer.model,
//         optimizer : this.optimizer.model
//     })
// }
//
//
//
// function Random_uniform(){
//     this.minVal=-1;
//     this.maxVal=1;
//
//     this.printToScreen =function () {
//         return "Random_uniform : "+this.minVal+"~"+this.maxVal;
//     }
//
// }
// function GradientDescent(){}