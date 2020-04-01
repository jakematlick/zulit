// add update ticker
// make sure grid dots are on whole number coordinates
// switch to modules + require
// phone support

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