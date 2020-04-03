class GameBoard {

  constructor(nRows, nCols) {

    this.numRows = nRows
    this.numCols = nCols

    // horizontal segments
    this.horizontal = []
    for (var r = 0; r < this.numRows; r++) {
      var row = []
      for (var c = 0; c < this.numCols-1; c++) {
        row.push(false)
      }
      this.horizontal.push(row)
    }

    // vertical segments
    this.vertical = []
    for (var r = 0; r < this.numRows-1; r++) {
      var row = []
      for (var c = 0; c < this.numCols; c++) {
        row.push(false)
      }
      this.vertical.push(row)
    }
  }

  reset() {
    for (var r = 0; r < this.horizontal.length; r++) {
      var row = this.horizontal[r]
      for (var c = 0; c < row.length; c++) {
        this.horizontal[r][c] = false
      }
    }
    for (var r = 0; r < this.vertical.length; r++) {
      var row = this.vertical[r]
      for (var c = 0; c < row.length; c++) {
        this.vertical[r][c] = false
      }
    }
  }

  update(piece, pt, value) {

    for (const coord of piece.coords) {

      if (coord.x == 1) {
        if (pt.y < numRows && pt.x < numCols-1 && pt.y >= 0 && pt.x >= 0) {
          this.horizontal[pt.y][pt.x] = value
        }
        pt.x++
      }
      else if (coord.y == 1) {
        if (pt.y < numRows-1 && pt.x < numCols && pt.y >= 0 && pt.x >= 0) {
          this.vertical[pt.y][pt.x] = value
        }
        pt.y++
      }
      else if (coord.x == -1) {
        pt.x--
        if (pt.y < numRows && pt.x < numCols-1 && pt.y >= 0 && pt.x >= 0) {
          this.horizontal[pt.y][pt.x] = value
        }
      }
      else if (coord.y == -1) {
        pt.y--
        if (pt.y < numRows-1 && pt.x < numCols && pt.y >= 0 && pt.x >= 0) {
          this.vertical[pt.y][pt.x] = value
        }
      }

    }
  }

  isSolvedHorizontal(target) {
    for (var r = 0; r < this.numRows; r++) {
      for (var c = 0; c < this.numCols-1; c++) {
        if (target.horizontal[r][c] && !this.horizontal[r][c]) {
          return false
        }
      }
    }
    return true
  }

  isSolvedVertical(target) {
    for (var r = 0; r < this.numRows-1; r++) {
      for (var c = 0; c < this.numCols; c++) {
        if (target.vertical[r][c] && !this.vertical[r][c]) {
          return false
        }
      }
    }
    return true
  }

  isSolved(target) {
    return this.isSolvedHorizontal(target) && this.isSolvedVertical(target)
  }

}

const targetBoard = new GameBoard(numRows, numCols)
// targetBoard.horizontal = [
//   [false, true,  true, true,  true],
//   [true,  true,  true, true,  false],
//   [true,  false, true, true,  true],
//   [false, true,  true, false, false]
// ]
// targetBoard.vertical = [
//   [false, true,  false],
//   [false, false, true],
//   [true,  false, true],
//   [false, true,  true],
//   [true,  true,  false],
//   [true,  true,  false]
// ]
targetBoard.horizontal = [
  [false, true,  true, true,  true],
  [true,  true,  true, true,  false],
  [true,  false, true, true,  true],
  [false, true,  true, false, false]
]
targetBoard.vertical = [
  [false, false, true,  false,  true,  true],
  [true,  false, false, true,   true,  true],
  [false, true,  true,  true,   false, false]
]

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
        const x = i*segLength
        const y = j*segLength
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

  // Return node index to snap to
  snapTo(pt) {
    return {x: Math.round( pt.x / segLength ),
            y: Math.round( pt.y / segLength )}
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
    for (var r = 0; r < numRows; r++) {
      const row = targetBoard.horizontal[r]

      for (var seg = 0; seg < row.length; seg++) {
        if (!row[seg]) { continue }

        var startX = seg * segLength
        var startY =   r * segLength
        var line = new HorizontalSegment(startX, startY, segLength)
        this.addChild(line)
      }
    }

    // Vertical segments
    for (var r = 0; r < numRows-1; r++) {
      const row = targetBoard.vertical[r]

      for (var seg = 0; seg < row.length; seg++) {
        if (!row[seg]) { continue }

        var startX = seg * segLength
        var startY =   r * segLength
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