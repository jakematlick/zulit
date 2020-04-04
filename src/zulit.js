// TODO
// Add phone support
// Add way to define and select other target game boards
// Refactor to move functionality into GameBoard class
  // drawDots() static function
  // drawBoard() function
// Disallow overlapping or crossing pieces?
  // --> what happens? revert to last position? (animate?)
// BUG: detecting win condition doesn't always work


/* Initialization */

addHeading()

var selectedPiece = false
var stage = new createjs.Stage("canvas-container")
if (segWidth % 2 == 1) {
  stage.regX = stage.regY = 0.5
}
stage.enableMouseOver(20)


/* Key Presses */
document.body.focus()
document.onkeypress = function (event) {
  event = event || window.event
  
  switch (event.code) {
    case "Space":
      event.preventDefault()
      event.view.rotate()
      break
    case "KeyR":
      for (piece of pieces) {
        piece.x = piece.initialX
        piece.y = piece.initialY
        piece.rotation = 0
        piece.scaleX = piece.scaleY = 1
        board.reset()
        update()
      }
      break
    case "KeyX":
      event.view.flip()
      break

  }
}


/* Game Pieces */

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


/* Game Board */

var board = new GameBoard(numRows, numCols)

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
      selectedPiece = this
      this.bringToFront()
      this.darken()
      update()
    })

    // Shape becomes unselected when mouse moves off of it (except when dragging)
    shape.on("rollout", function(event) {
      if (!mouseDown) {
        selectedPiece = false
        this.lighten()
        update()
      }
    })

    // When clicking on a shape, record the mouse offset within
    // the shape in order to drag from that point
    var mouseDown = false
    shape.on("mousedown", function(event) {
      mouseDown = true
      pt = grid.globalToLocal(this.x, this.y)
      snapPt = {x: Math.round( pt.x / segLength ),
                y: Math.round( pt.y / segLength )}
      board.update(this, snapPt, false)
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
        selectedPiece = false
        this.lighten()
      }

      pt = grid.globalToLocal(this.x, this.y)
      snapPt = {x: Math.round( pt.x / segLength ),
                y: Math.round( pt.y / segLength )}

      this.x = grid.x + snapPt.x * segLength
      this.y = grid.y + snapPt.y * segLength

      board.update(selectedPiece, snapPt, true)

      update()

      if (board.isSolved(targetBoard)) {
        setTimeout(win, 500)
      }
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
  if (!selectedPiece) { return }

  // Mouse point w/in shape
  var pt = selectedPiece.globalToLocal(stage.mouseX, stage.mouseY)
  
  // Rotate shape
  selectedPiece.rotate(pt)
  update()
}

// Flip the selected shape horizontally
function flip() {
  if (!selectedPiece) { return }

  // Mouse point w/in shape
  var pt = selectedPiece.globalToLocal(stage.mouseX, stage.mouseY)
  
  // Rotate shape
  selectedPiece.flip(pt)
  update()
}

function addHeading() {
  var heading = document.getElementById('heading')
  heading.innerHTML = "Zulit"

  var subheading = document.getElementById('subheading')
  subheading.innerHTML = `
  Drag the pieces to cover the target shape below<br/>
  Press 'Space' to rotate the selected piece<br/>
  Press 'X' to flip the selected piece<br/>
  Press 'R' to reset the pieces
  `
}

function win() {
  alert("You win")
}