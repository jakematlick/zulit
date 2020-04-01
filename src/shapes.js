class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Segment {
  constructor(start, end) {
    this.start = start
    this.end = end
  }
}

const zCoords = [
  new Segment(new Point(0,0), new Point(1,0)),
  new Segment(new Point(1,0), new Point(1,1)),
  new Segment(new Point(1,1), new Point(2,1))
]

const uCoords = [
  new Segment(new Point(0,0), new Point(0,1)),
  new Segment(new Point(0,1), new Point(1,1)),
  new Segment(new Point(1,1), new Point(1,0))
]

const lCoords = [
  new Segment(new Point(0,0), new Point(0,1)),
  new Segment(new Point(0,1), new Point(0,2)),
  new Segment(new Point(0,2), new Point(1,2))
]

const iCoords = [
  new Segment(new Point(0,0), new Point(0,1)),
  new Segment(new Point(0,1), new Point(0,2)),
  new Segment(new Point(0,2), new Point(0,3))
]

const tCoords = [
  new Segment(new Point(0,0), new Point(1,0)),
  new Segment(new Point(1,0), new Point(2,0)),
  new Segment(new Point(1,0), new Point(1,1))
]

class Shape extends createjs.Container {

  constructor(type, hue, x, y) {
    super()

    //this.alpha = 0.75
    this.offset = {x: 0, y: 0}
    this.type = type
    this.color = `hsl(${hue},82%,71%)`
    this.selectedColor = `hsl(${hue},82%,55%)`

    //this.container = new createjs.Container()
    this.strokes = []
    this.x = x
    this.y = y
    this.name = this.type

    switch (type) {
      case "z":
        var coords = zCoords
        break
      case "u":
        var coords = uCoords
        break
      case "l":
        var coords = lCoords
        break
      case "i":
        var coords = iCoords
        break
      case "t":
        var coords = tCoords
        break
    }

    for (const seg of coords) {
      const startX = seg.start.x * segLength
      const startY = seg.start.y * segLength
      const endX = seg.end.x * segLength
      const endY = seg.end.y * segLength

      var line = new createjs.Shape()
      var stroke = line.graphics.beginStroke(this.color).command

      line.graphics.setStrokeStyle(segWidth, "round", "round")
                  .moveTo(startX, startY)
                  .lineTo(endX, endY)
                  .endStroke()

      this.addChild(line)
      this.strokes.push(stroke)
    }
  }

  darken() {
    for (var stroke of this.strokes) {
      stroke.style = this.selectedColor
    }
  }

  lighten() {
    for (var stroke of this.strokes) {
      stroke.style = this.color
    }
  }

  // Rotate the selected shape
  rotate(pt) {
    
    // Need to rotate the offset values as well
    this.offset = {x: -this.offset.y, y: this.offset.x}

    // Translate center of rotation to mouse point, rotate, then translate back
    switch (this.rotation % 360) {
      case 0:
        this.x += pt.x
        this.y += pt.y
        this.rotation += 90
        this.x += pt.y
        this.y -= pt.x
        break
      case 90:
        this.x -= pt.y
        this.y += pt.x
        this.rotation += 90
        this.x += pt.x
        this.y += pt.y
        break
      case 180:
        this.x -= pt.x
        this.y -= pt.y
        this.rotation += 90
        this.x -= pt.y
        this.y += pt.x
        break
      case 270:
        this.x += pt.y
        this.y -= pt.x
        this.rotation += 90
        this.x -= pt.x
        this.y -= pt.y
        break
    }
  }
}