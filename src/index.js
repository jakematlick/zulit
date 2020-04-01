// add update ticker
// drag from selected point, not center
// make sure grid dots are on whole number coordinates
// switch to modules + require


/* Constants */

// Hues (0-360º)
const blue   = 217
const red    = 352
const orange = 22
const yellow = 52
const green  = 112
const cyan   = 172
const violet = 262

const segWidth = 16
const segLength = 40


/* Application */

addHeadingToPage()

var stage = new createjs.Stage("canvas-container")
if (segWidth % 2 == 1) {
  stage.regX = stage.regY = 0.5
}
stage.enableMouseOver(20)

var z = new Shape("z", blue, 50, 150)
var u = new Shape("u", red, 150, 150)
var l = new Shape("l", green, 210, 100)
var i = new Shape("i", orange, 270, 50)
var t = new Shape("t", violet, 300, 150)

var shapes = [z,u,l,i,t]
addListeners(shapes)
addToStage(shapes)
stage.update();


/* Helper Functions */

function addListeners(shapes) {
  for (shape of shapes) {
    
    shape.container.on("mouseover", function(evt) {
      this.darken()
      stage.update()
    });

    shape.container.on("mouseout", function(evt) {
      this.lighten()
      stage.update()
    });

    shape.container.on("mousedown", function(evt) {
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    });

    shape.container.on("pressmove", function(evt) {
      this.x = evt.stageX + this.offset.x;
	    this.y = evt.stageY + this.offset.y;
      stage.update()
    });

  }
}

function addToStage(children) {
  for (child of children) {
    stage.addChild(child.container)
  }
}

function addHeadingToPage() {
  var heading = document.getElementById('heading')
  heading.innerHTML = "Zulit"
}






// for (const seg of coords) {
//   console.log(`start: ${seg.start.x}, ${seg.start.y}`)
//   console.log(`end: ${seg.end.x}, ${seg.end.y}`)
//   drawSegment(seg)
// }

// var rr = new createjs.Shape();
// rr.name = "rnd_rect"
// rr.graphics.beginFill(lightBlue)
//            .drawRoundRect(0,0,100,15,7.5)
// rr.x = 50
// rr.y = 50

// rr.on("mousedown", function(evt) {
//   this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
// });

// rr.on("pressmove", function(evt) {
//   this.x = evt.stageX + this.offset.x;
// 	this.y = evt.stageY + this.offset.y;
//   stage.update()
// });

// rr.on("mouseover", function(evt) {
//   this.graphics.clear()
//                 .beginFill(darkBlue)
//                 .drawRoundRect(0,0,100,15,7.5)
//   stage.update()
// });

// rr.on("mouseout", function(evt) {
//   this.graphics.clear()
//                .beginFill(lightBlue)
//                .drawRoundRect(0,0,100,15,7.5)
//   stage.update()
// });

// stage.addChild(rr);