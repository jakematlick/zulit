// phone support

// move coords into Shape class as function of type

// how to track which target segments a piece overlaps?
  // --> shape.type + shape.rotation + which dot snapped to

// disallow overlap / crossing
  // --> what happens? revert to last position? (animate?)

// detect target complete
  // detect segment overlap when snapping piece
    // --> shape.type + shape.rotation + which dot snapped to
  // store overlap state of all segments
  // if all segments overlapped, you win


/* Initialization */

addHeading()

var selectedShape = false
var stage = new createjs.Stage("canvas-container")
if (segWidth % 2 == 1) {
  stage.regX = stage.regY = 0.5
}
stage.enableMouseOver(20)


/* Key Presses */

document.onkeypress = function (event) {
  event = event || window.event
  
  switch (event.code) {
    case "Space":
      event.preventDefault()
      event.view.rotate()
      break
    case "KeyR":
      for (shape of pieces) {
        shape.x = shape.initialX
        shape.y = shape.initialY
        shape.rotation = 0
        update()
      }
      break
  }
}


/* Application */

var z1 = new Piece("z", pink,     segWidth,                 segLength - segWidth)
var z2 = new Piece("z", purple,   segWidth,                 segWidth + 2*segLength)
var u  = new Piece("u", red,    2*segLength + 2.5*segWidth, segWidth + 2*segLength)
var l1 = new Piece("l", blue,   3*segLength + 4*segWidth,   segWidth + segLength)
var l2 = new Piece("l", cyan,   4*segLength + 5.5*segWidth, segWidth + segLength)
var i  = new Piece("i", green,  5*segLength + 7*segWidth,   segWidth)
var t1 = new Piece("t", orange, 5*segLength + 8.5*segWidth, segLength - segWidth)
var t2 = new Piece("t", yellow, 5*segLength + 8.5*segWidth, segWidth + 2*segLength)
var pieces = [z1,z2,u,l1,l2,i,t1,t2]

addListeners(pieces)
addToStage(pieces)

var grid = new Grid(0,215)
var target = new Target(0,215)

stage.addChild(grid)
stage.addChild(target)

grid.center()
target.center()
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
      this.lastX = this.x
      this.lastY = this.y
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

      pt = grid.globalToLocal(this.x, this.y)
      snapPt = grid.snapTo(pt)

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
  subheading.innerHTML = `
  Drag the pieces to cover the target shape below<br/>
  Press 'Space' to rotate the selected piece<br/>
  Press 'R' to reset the pieces
  `
}