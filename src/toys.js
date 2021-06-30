class Toys {
    static radius = document.getElementsByName('radius')
    static height = document.getElementsByName("height")
    static width = document.getElementsByName("width")

    
    constructor() {
        this.startX
        this.startY
        Toys.draw()
        new Mouse()
    }

    randomColor() {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        return (`#${randomColor}`)
    }
  
    attachColorChange(toy) {
        let colors = document.getElementsByName("color");
        colors.forEach(color => {
            if (color.form.id == toy.id) {
                color.addEventListener("input", this.handleColor);
            }
        })
    }
    
    handleColor = (e) => {
        for (let i = 0; i<toys.length;i++) {
            if (toys[i].id === parseInt(e.target.form.id)) {
                toys[i].color = e.target.value
            }
        }
        Toys.draw()
    }

    attachChange(toy) {
        if (toy.selected == true) {
            if (toy.name == 'Rectangle' && !!height) {
                if (height.length > 1) {
                    for (let i=0;i<height.length;i++) {
                        height[i].addEventListener("input", this.handleHeight)
                        width[i].addEventListener("input", this.handleWidth)
                    }
                } else {
                    height.addEventListener("input", this.handleHeight)
                    width.addEventListener("input", this.handleWidth)
                }
            } else if (!!radius) {
                if (radius.length > 1) {
                    for (let i = 0; i<radius.length;i++) {
                        radius[i].addEventListener("input", this.handleRadius)
                    }
                } else {
                    radius.addEventListener("input", this.handleRadius)
                }
            }
        }
    }

    handleHeight = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.form.id)) {
                toy.height = parseInt(e.target.value)
            }
        })
        Toys.draw()
    }

    handleWidth = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.form.id)) {
                toy.width = parseInt(e.target.value)
            }
        })
        Toys.draw()
    }

    handleRadius = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.form.id)) {
                toy.r = parseInt(e.target.value)
            }
        })
        Toys.draw()
    }

    static draw() {   
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        toys.forEach(toy => {
            if (toy.r) {
                ctx.beginPath();
                ctx.fillStyle = `${toy.color}`
                ctx.arc(toy.x, toy.y, toy.r, toy.sAngle, toy.eAngle, true)
                ctx.closePath()
                ctx.fill()
                if (toy.hover == true) {
                    ctx.lineWidth = 6;
                    ctx.strokeStyle = 'rgba(0,0,255,0.5)'
                    ctx.stroke()
                }
                if (toy.selected == true || toy.dragging == true) {
                    ctx.beginPath()
                    ctx.arc(toy.x, toy.y, toy.r*1.25, toy.sAngle, toy.eAngle, true)
                    ctx.strokeStyle = "gold"
                    ctx.stroke()
                }
            } else {
                ctx.fillStyle = `${toy.color}`
                ctx.fillRect(toy.x, toy.y, toy.width, toy.height)
                if (toy.hover == true) {
                    ctx.lineWidth = 6;
                    ctx.strokeStyle = 'rgba(0,0,255,0.5)'
                    ctx.strokeRect(toy.x, toy.y, toy.width, toy.height)
                }
                if (toy.selected == true || toy.dragging == true) {
                    ctx.lineWidth = 4
                    ctx.strokeStyle = "gold"
                    ctx.strokeRect(toy.x-5, toy.y-5, toy.width+10, toy.height+10)

                }
            }
        })
        
    }

}
