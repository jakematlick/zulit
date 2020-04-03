function pt(x,y) {
  return {x:x,y:y}
}

class Piece extends createjs.Container {

  constructor(type, hue, x, y) {
    super()

    //this.alpha = 0.75
    this.offset = {x: 0, y: 0}
    this.type = type
    this.color = `hsl(${hue},82%,71%)`
    this.selectedColor = `hsl(${hue},82%,55%)`

    this.strokes = []
    this.name = this.type

    this.x = x
    this.y = y
    this.initialX = x
    this.initialY = y
    this.lastX = x
    this.lastY = y

    switch (type) {
      case "z":
        this.coords = [ pt(1,0), pt(0,1), pt(1,0)]
        break
      case "u":
        this.coords = [pt(0,1), pt(1,0), pt(0,-1)]
        break
      case "l":
        this.coords = [pt(0,1), pt(0,1), pt(1,0)]
        break
      case "i":
        this.coords = [pt(0,1), pt(0,1), pt(0,1)]
        break
      case "t":
        this.coords = [pt(1,0), pt(1,0), pt(-1,0), pt(0,1)]
        break
    }

    var start = pt(0,0)
    for (const seg of this.coords) {
      const end = {x: start.x + seg.x * segLength,
                   y: start.y + seg.y * segLength}

      var line = new createjs.Shape()
      var stroke = line.graphics.beginStroke(this.color).command

      line.graphics.setStrokeStyle(segWidth, "round", "round")
                   .moveTo(start.x, start.y)
                   .lineTo(end.x, end.y)
                   .endStroke()

      start = end
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

  // Rotate the piece
  rotate(p) {

    // Need to rotate the offset values as well
    this.offset = {x: -this.offset.y, 
                   y:  this.offset.x}

    // Rotate the piece coords
    for (var i=0; i<this.coords.length; i++) {
      this.coords[i] = {x: -this.coords[i].y,
                        y:  this.coords[i].x}
    }

    // Translate center of rotation to mouse point, rotate, then translate back
    switch (this.rotation % 360) {
      case 0:
        this.x += p.x * this.scaleX
        this.y += p.y * this.scaleY
        this.rotation += 90
        this.x += p.y * this.scaleY
        this.y -= p.x * this.scaleX
        break
      case 90:
        this.x -= p.y * this.scaleY
        this.y += p.x * this.scaleX
        this.rotation += 90
        this.x += p.x * this.scaleX
        this.y += p.y * this.scaleY
        break
      case 180:
        this.x -= p.x * this.scaleX
        this.y -= p.y * this.scaleY
        this.rotation += 90
        this.x -= p.y * this.scaleY
        this.y += p.x * this.scaleX
        break
      case 270:
        this.x += p.y * this.scaleY
        this.y -= p.x * this.scaleX
        this.rotation += 90
        this.x -= p.x * this.scaleX
        this.y -= p.y * this.scaleY
        break
    }
  }

  // Flip the piece horizonally
  flip(p) {

    // Flip the offset value
    this.offset.x *= -1

    // Flip the coords
    for (var i=0; i<this.coords.length; i++) {
      this.coords[i].x *= -1
    }

    if (this.rotation % 360 == 0) {
      this.x += 2 * this.scaleX * p.x
      this.scaleX *= -1
    }
    else if (this.rotation % 360 == 90) {
      this.x -= 2 * this.scaleY * p.y
      this.scaleY *= -1
    }
    else if (this.rotation % 360 == 180) {
      this.x -= 2 * this.scaleX * p.x
      this.scaleX *= -1
    }
    else if (this.rotation % 360 == 270) {
      this.x += 2 * this.scaleY * p.y
      this.scaleY *= -1
    }
    
  }

}