class Circles {
    static container = document.getElementById('canvas_container')
    static canvas = document.getElementById('canvas')

    constructor() {
        this.circles = [];
        this.render()
        this.draw()
        this.attachClickEventListener()
        this.attachMouseHoverListener()
    }

    attachClickEventListener() {
        canvas.addEventListener('click', this.handleOnClick);
    }

    attachMouseHoverListener() {
        canvas.addEventListener("mouseover", this.handleMouseMove);
    }

    handleMouseMove = (e) => {
            let ctx = canvas.getContext('2d')
            this.circles.forEach(circle => {
                ctx.beginPath()
                ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
                ctx.fill()
            ctx.closePath()

            if (ctx.isPointInStroke(e.clientX, e.clientY)) {
                ctx.fillStyle = 'red'
            }
        })
    }

    isMouseInShape(mx, my, shape){
        var dx = mx - shape.x
        var dy = my - shape.y
        debugger
        if((dx*dx) + (dy*dy) < shape.r*shape.r) {
            return true
        }
    }

    handleOnClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const startX = e.offsetX
        const startY = e.offsetY
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.circles.forEach(circle => {
            ctx.beginPath()
            ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
            ctx.fill()
            ctx.fillStyle = 'green'
            if(ctx.isPointInPath(startX, startY)) {
                new Forms()
            }
        })
    }

    render() {
        this.circles.push({
            x: 50,
            y: 50,
            r: 25,
            sAngle: 0,
            eAngle: 2 * Math.PI,
            name: "Circle"
        })
    }
    
    draw() {
        let ctx = canvas.getContext('2d')
        const round = new Path2D()
        this.circles.forEach(circle => {
            round.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
            ctx.fill(round)
            ctx.fillStyle = 'green'
        })
    }
    
}