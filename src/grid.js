// Horizontal segments
const row0 = [false, true, true, true, true]
const row1 = [true, true, true, true, false]
const row2 = [true, false, true, true, true]
const row3 = [false, true, true, false, false]
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
        dot.graphics.beginFill("silver").drawCircle(0,0,dotSize)
        dot.x = gridMarginX + i*segLength
        dot.y = gridMarginY + j*segLength
        this.addChild(dot)
      }
    }

    this.x = x
    this.y = y

  }

  snapTo(pt) {
    const nx = Math.round( (pt.x - gridMarginX)/segLength )
    const ny = Math.round( (pt.y - gridMarginY)/segLength )
    return {x: gridMarginX + nx*segLength, y: gridMarginY + ny*segLength}
  }

}

class Target extends createjs.Container {

  constructor(x,y) {
    super()

    // Horizontal segments
    for (var r = 0; r < rows.length; r++) {
      const row = rows[r]

      for (var seg = 0; seg < row.length; seg++) {
        if (!row[seg]) { continue }

        var startX = gridMarginX + seg * segLength
        var startY = gridMarginY + r * segLength

        var line = new createjs.Shape()
        line.graphics.beginStroke("lightgray")
                     .setStrokeStyle(segWidth, "round", "round")
                     .moveTo(startX, startY)
                     .lineTo(startX + segLength, startY)
                     .endStroke()

        this.addChild(line)        
      }
    }

    // Vertical segments
    for (var c = 0; c < cols.length; c++) {
      const col = cols[c]

      for (var seg = 0; seg < col.length; seg++) {
        if (!col[seg]) { continue }

        var startX = gridMarginX + c * segLength
        var startY = gridMarginY + seg * segLength

        var line = new createjs.Shape()
        line.graphics.beginStroke("lightgray")
                     .setStrokeStyle(segWidth, "round", "round")
                     .moveTo(startX, startY)
                     .lineTo(startX, startY + segLength)
                     .endStroke()

        this.addChild(line)        
      }
    }

    this.x = x
    this.y = y
  }

}