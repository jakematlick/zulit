// Horizontal segments
const row0 = [false, true, true, true, true]
const row1 = [true, true, true, true, false]
const row2 = [true, false, true, true, true]
const row3 = [true, true, true, true, false]
const rows = [row0, row1, row2, row3]

// Vertical segments
const col0 = [false, true, false]
const col1 = [false, false, true]
const col2 = [true, false, true]
const col3 = [false, true, true]
const col4 = [true, true, false]
const col5 = [true, true, false]
const cols = [col0, col1, col2, col3, col4, col5]

class Grid extends createjs.Container {

  constructor(x,y) {
    super()

    // Grid dots
    for (var i = 0; i < numCols; i++) {
      for (var j = 0; j < numRows; j++) {
        var dot = new createjs.Shape()
        dot.graphics.beginFill("lightgray").drawCircle(0,0,dotSize)
        dot.x = gridMarginX + i*segLength
        dot.y = gridMarginY + j*segLength
        this.addChild(dot)
      }
    }

    this.x = x
    this.y = y

  }
}