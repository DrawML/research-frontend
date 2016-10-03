/**
 * Created by 구한모 on 2016-09-30.
 */

function _createArrowHead(points) {
    var headLength = 15,

    x1 = points[0],
    y1 = points[1],
    x2 = points[2],
    y2 = points[3],

    dx = x2 - x1,
    dy = y2 - y1,

    angle = Math.atan2(dy, dx);

    angle *= 180 / Math.PI;
    angle += 90;

    var triangle = new fabric.Triangle({
        angle: angle,
        fill: '#207cca',
        top: y2,
        left: x2,
        height: headLength,
        width: headLength,
        originX: 'center',
        originY: 'center',
        selectable: false
    });

    return triangle;
}


function createLineArrow(points) {
    this.line = new fabric.Line(points, {
        strokeWidth: 5,
        stroke: '#7db9e8',
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        hasRotatingPoint: false,
        hoverCursor: 'default',
        selectable: false
    });

    this.triangle =_createArrowHead(points);
}


function LineArrow(points){

    this.fabric = new createLineArrow(points);

    this.changePoint = function (points) {
        this.deleteFabric();
        this.fabric = new createLineArrow(points);
        canvas.add(this.fabric.line);
        canvas.add(this.fabric.triangle);
        canvas.renderAll();
    }

    this.deleteFabric = function () {
        canvas.remove(this.fabric.triangle);
        canvas.remove(this.fabric.line);
    }
    canvas.add(this.fabric.line);
    canvas.add(this.fabric.triangle);
    canvas.renderAll();
}