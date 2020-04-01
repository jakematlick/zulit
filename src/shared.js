// Hues (0-360º)
const blue   = 217
const red    = 352
const orange = 22
const yellow = 52
const green  = 112
const cyan   = 172
const violet = 262

// Geometry
const segWidth = 16
const segLength = 50

const numRows = 4
const numCols = 6

const dotSize = 3

const gridMarginX = 16
const gridMarginY = 16


// Functions

createjs.Container.prototype.bringToFront = function() {
  this.parent.setChildIndex( this, this.parent.numChildren-1)
}