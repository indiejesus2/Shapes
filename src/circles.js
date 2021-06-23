class Circles {
    static container = document.getElementById('canvas_container')
    static canvas = document.getElementById('canvas')

    constructor(circles) {
        this.circles = circles;
        this.ctx = canvas.getContext('2d')
        // this.render()
        this.draw()
        this.attachClickEventListener() 

        // this.constructor.handleColor()
        // this.attachMouseHoverListener()
    }

    isMouseInShape(mx, my, shape) {
        var dx = mx-shape.x;
        var dy = my-shape.y;
        if(dx**2+dy**2<shape.r*shape.r) {
            return true
        }
    }


    attachColorChange() {
        let colorPicker = document.querySelector("#color");
        colorPicker.addEventListener("input", this.handleColor);
    }

    handleColor = (e) => {
        this.circles.forEach(function(circle) {
            if (circle.id === parseInt(e.target.parentElement.id)) {
                debugger
                circle.color = e.target.value
                debugger
            }
        })
        debugger
        this.draw()
    }
    
    attachClickEventListener() {
        canvas.addEventListener('click', this.handleOnClick)
    }
    
    attachMouseHoverListener() {
        canvas.addEventListener('mouseover', this.handleMouseMove);
    }

    // attachMouseOutListener() {
    //     canvas.addEventListener('mouseout', function(e) {
    //         this.circles.forEach(circle => {
    //             let ctx = canvas.getContext('2d')
                // ctx.clearRect(0, 0, canvas.width, canvas.height)
    //                 ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
    //                 ctx.fillStyle = "green"
    //                 ctx.fill()
    //         })    
    //     })
    // }
    
    handleMouseMove = (e) => {
        let mouseX = e.clientX - e.offsetX
        let mouseY = e.clientY - e.offsetY
        this.circles.forEach(circle => {
                this.ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
                if (this.ctx.isPointInPath(mouseX, mouseY)) {
                    this.ctx.fillStyle = "red"
                } else {
                    this.ctx.fillStyle = 'green'
                }
                this.ctx.fill()
        })
    }

    handleOnClick = (e) => {

        for (let i = 0; i < this.circles.length; i++){
            if(this.isMouseInShape(e.offsetX, e.offsetY, this.circles[i])) {
                if (!document.getElementById(this.circles[i].id)) {
                    new Forms(this.circles[i])
                    this.attachColorChange()
                } else {
                    break
                }
            }
        }
    }

    // render() {
    //     this.circles.push({
    //         id: this.circles.length + 1,
    //         x: (Math.random() * (canvas.width)),
    //         y: (Math.random() * (canvas.height)),
    //         r: 25,
    //         sAngle: 0,
    //         eAngle: 2 * Math.PI,
    //         color: this.randomColor(),
    //         name: "Circle"
    //     })
    // }
    
    draw() {
        this.ctx.save()
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.fillStyle = `#${circle.color}`
            this.ctx.moveTo(circle.x+circle.r, circle.y)
            this.ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle, true)
            this.ctx.closePath()
            this.ctx.fill('evenodd')
        })
        this.ctx.restore()
    }
    
}