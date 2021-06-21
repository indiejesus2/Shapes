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

    randomColor() {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        return randomColor
    }
    
    attachClickEventListener() {
        canvas.addEventListener('click', this.handleOnClick);
    }
    
    attachMouseHoverListener() {
        canvas.addEventListener('mouseover', this.handleMouseMove);
    }

    // attachMouseOutListener() {
    //     canvas.addEventListener('mouseout', function(e) {
    //         this.circles.forEach(circle => {
    //             let ctx = canvas.getContext('2d')
    //             ctx.clearRect(0, 0, canvas.width, canvas.height)
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
            let ctx = canvas.getContext('2d')
                ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
                if (ctx.isPointInPath(mouseX, mouseY)) {
                    ctx.fillStyle = "red"
                } else {
                    ctx.fillStyle = 'green'
                }
                ctx.fill()
        })
    }

    handleOnClick = (e) => {
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.circles.forEach(circle => {
            ctx.beginPath()
            ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
            ctx.fill()
            ctx.fillStyle = 'green'
            if(ctx.isPointInPath(e.offsetX, e.offsetY)) {
                new Forms(circle)
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
            color: this.randomColor(),
            name: "Circle"
        })
    }
    
    draw() {
        let ctx = canvas.getContext('2d')
        this.circles.forEach(circle => {
            ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
            ctx.fillStyle = `#${circle.color}`
            ctx.fill()
        })
    }
    
}