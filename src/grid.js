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

class Dot extends createjs.Shape {

  constructor(x, y, radius) {
    super()
    this.graphics.beginFill("silver").drawCircle(0,0,radius)
    this.x = x
    this.y = y
    this.setBounds(-radius,-radius,2*radius,2*radius)
  }

}

class Grid extends createjs.Container {

  constructor(x,y) {
    super()

    // Grid dots
    for (var i = 0; i < numCols; i++) {
      for (var j = 0; j < numRows; j++) {
        const x = gridMarginX + i*segLength
        const y = gridMarginY + j*segLength
        var dot = new Dot(x, y, dotSize)
        this.addChild(dot)
      }
    }

    this.x = x
    this.y = y

  }

  center() {
    if (!this.parent) { return }
    this.x = (this.parent.canvas.width - this.getBounds().width)/2
    this.parent.update()
  }

  snapTo(pt) {
    const nx = Math.round( (pt.x - gridMarginX)/segLength )
    const ny = Math.round( (pt.y - gridMarginY)/segLength )
    return {x: gridMarginX + nx*segLength, y: gridMarginY + ny*segLength}
  }

}

class HorizontalSegment extends createjs.Shape {
  constructor(x,y,len) {
    super()
    this.graphics.beginStroke("lightgray")
                  .setStrokeStyle(segWidth, "round", "round")
                  .moveTo(x, y)
                  .lineTo(x + len, y)
                  .endStroke()
    this.setBounds(x,y,len+segWidth,segWidth)
  }
}

class VerticalSegment extends createjs.Shape {
  constructor(x,y,len) {
    super()
    this.graphics.beginStroke("lightgray")
                  .setStrokeStyle(segWidth, "round", "round")
                  .moveTo(x, y)
                  .lineTo(x, y + len)
                  .endStroke()
    this.setBounds(x,y,segWidth,len+segWidth)
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
        var line = new HorizontalSegment(startX, startY, segLength)
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
        var line = new VerticalSegment(startX,startY,segLength)
        this.addChild(line)
      }
    }

    this.x = x
    this.y = y
  }

  center() {
    if (!this.parent) { return }
    this.x = (this.parent.canvas.width - this.getBounds().width)/2 + 5 // why +5?
    this.parent.update()
  }

}