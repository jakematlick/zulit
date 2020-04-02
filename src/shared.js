// Hues (0-360º)
const orange = 20
const yellow = 50
const green  = 140
const cyan   = 170
const blue   = 210
const purple = 260
const pink   = 320
const red    = 350

// Geometry
const segWidth = 16
const segLength = 50

const numRows = 4
const numCols = 6

const dotSize = 3

const gridMarginX = 0
const gridMarginY = 0


// Functions

createjs.Container.prototype.bringToFront = function() {
  this.parent.setChildIndex( this, this.parent.numChildren-1)
}