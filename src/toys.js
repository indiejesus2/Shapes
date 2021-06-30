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
 
    attachColorChange(toy) {
        let colors = document.getElementsByName("color");
        colors.forEach(color => {
            if (color.form.id == toy.id) {
                color.addEventListener("input", this.handleChange);
            }
        })
    }

    attachChange(toy) {
        if (toy.selected == true) {
            if (toy.name == 'Rectangle' && !!height) {
                if (height.length > 1) {
                    for (let i=0;i<height.length;i++) {
                        height[i].addEventListener("input", this.handleChange)
                        width[i].addEventListener("input", this.handleChange)
                    }
                } else {
                    height.addEventListener("input", this.handleChange)
                    width.addEventListener("input", this.handleChange)
                }
            } else if (!!radius) {
                if (radius.length > 1) {
                    for (let i = 0; i<radius.length;i++) {
                        radius[i].addEventListener("input", this.handleChange)
                    }
                } else {
                    radius.addEventListener("input", this.handleChange)
                }
            }
        }
    }

    handleChange = (e) => {
        let change = e.target.name
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.form.id)) {
                toy[`${change}`] = change == "color" ? e.target.value : parseInt(e.target.value)
            }
        })
        Toys.draw()
    }

    static draw() {   
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        toys.forEach(toy => {
            if (toy.radius) {
                ctx.beginPath();
                ctx.fillStyle = `${toy.color}`
                ctx.arc(toy.x, toy.y, toy.radius, toy.sAngle, toy.eAngle, true)
                ctx.closePath()
                ctx.fill()
                if (toy.hover == true) {
                    ctx.lineWidth = 6;
                    ctx.strokeStyle = 'rgba(0,0,255,0.5)'
                    ctx.stroke()
                }
                if (toy.selected == true || toy.dragging == true) {
                    ctx.beginPath()
                    ctx.arc(toy.x, toy.y, toy.radius*1.25, toy.sAngle, toy.eAngle, true)
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
