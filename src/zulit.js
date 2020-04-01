// switch to modules + require
// phone support
// snap to pixel mode?
// Nicer typography
// center grid
// restore shape to initial position


// make rotation a method of Shape

// how to track which segments a piece overlaps?
  // --> shape.type + shape.rotation + which dot snapped to

// Update colors
// hit test check before snapping to grid

// disallow overlap
  // --> what happens? revert to last position? (animate?)

// detect target complete
  // detect segment overlap when snapping piece
    // --> shape.type + shape.rotation + which dot snapped to
  // store overlap state of all segments
  // if all segments overlapped, you win


/* Application */

addHeading()

// Keypress to rotate
document.onkeypress = function (event) {
  event = event || window.event
  
  switch (event.code) {
    case "KeyR":
      event.view.rotate()
      break
  }
}

var selectedShape = false
var stage = new createjs.Stage("canvas-container")
if (segWidth % 2 == 1) {
  stage.regX = stage.regY = 0.5
}
stage.enableMouseOver(20)

var z1 = new Shape("z", blue,     segWidth,                 segWidth)
var z2 = new Shape("z", cyan,     segWidth,                 segWidth + 2*segLength)
var u  = new Shape("u", red,    2*segLength + 2.5*segWidth, segWidth + 2*segLength)
var l1 = new Shape("l", green,  3*segLength + 4*segWidth,   segWidth + segLength)
var l2 = new Shape("l", green,  4*segLength + 5.5*segWidth, segWidth + segLength)
var i  = new Shape("i", yellow, 5*segLength + 7*segWidth,   segWidth)
var t1 = new Shape("t", violet, 5*segLength + 8.5*segWidth, segWidth)
var t2 = new Shape("t", violet, 5*segLength + 8.5*segWidth, segWidth + 2*segLength)

var shapes = [z1,z2,u,l1,l2,i,t1,t2]
addListeners(shapes)
addToStage(shapes)

var grid = new Grid(10,200)
var target = new Target(10,200)

stage.addChild(grid)
stage.addChild(target)
update()


/* Helper Functions */

function update() {
  grid.bringToFront()
  stage.update()
}

function addListeners(shapes) {
  for (shape of shapes) {
    
    // Shape becomes selected when mouse hovers over it
    shape.on("rollover", function(event) {
      selectedShape = this
      this.bringToFront()
      this.darken()
      update()
    })

    // Shape becomes unselected when mouse moves off of it (except when dragging)
    shape.on("rollout", function(event) {
      if (!mouseDown) {
        selectedShape = false
        this.lighten()
        update()
      }
    })

    // When clicking on a shape, record the mouse offset within
    // the shape in order to drag from that point
    var mouseDown = false
    shape.on("mousedown", function(event) {
      mouseDown = true
      this.offset = {x: this.x - event.stageX, y: this.y - event.stageY}
    })

    // When mouse goes up, check if we're still over the shape
    // and if not, unselect it.
    shape.on("pressup", function(event) {
      mouseDown = false
      
      var pt = this.globalToLocal(stage.mouseX, stage.mouseY)
      if (!this.hitTest(pt.x, pt.y)) {
        selectedShape = false
        this.lighten()
      }

      // TODO: add hitTest check with grid

      pt = grid.globalToLocal(this.x, this.y)
      snapPt = grid.snapTo(pt)
      //console.log(`snap to ${grid.x + snapPt.x}, ${grid.y + snapPt.y}`)

      this.x = grid.x + snapPt.x
      this.y = grid.y + snapPt.y

      update()
    })

    // Update shape coordinates while dragging
    // offset so that drag occurs from mouse point
    shape.on("pressmove", function(event) {
      this.x = event.stageX + this.offset.x
	    this.y = event.stageY + this.offset.y
      update()
    })

  }
}

// Add objects to the stage
function addToStage(children) {
  for (child of children) {
    stage.addChild(child)
  }
}

// Rotate the selected shape
function rotate() {
  if (!selectedShape) { return }

  // Mouse point w/in shape
  var pt = selectedShape.globalToLocal(stage.mouseX, stage.mouseY)
  
  // Rotate shape
  selectedShape.rotate(pt)
  update()
}

function addHeading() {
  var heading = document.getElementById('heading')
  heading.innerHTML = "Zulit"

  var subheading = document.getElementById('subheading')
  subheading.innerHTML = "Drag the pieces to cover the target shape below.<br/>Press 'R' to rotate the selected piece."
}