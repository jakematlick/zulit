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

class Shape {

  constructor(type, hue, x, y) {
    
    this.type = type
    this.color = `hsl(${hue},82%,71%)`
    this.selectedColor = `hsl(${hue},82%,55%)`

    this.container = new createjs.Container()
    this.container.strokes = []
    this.container.x = x
    this.container.y = y

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

      this.container.addChild(line)
      this.container.strokes.push(stroke)
    }

    this.container.darken = () => {
      for (var stroke of this.container.strokes) {
        stroke.style = this.selectedColor
      }
    }

    this.container.lighten = () => {
      for (var stroke of this.container.strokes) {
        stroke.style = this.color
      }
    }

  }
}