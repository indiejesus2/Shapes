class Circles {
    static container = document.getElementById('canvas_container')
    static canvas = document.getElementById('canvas')

    constructor() {
        this.circles = [];
        this.render()
        this.draw()
        this.attachClickEventListener()
    }

    attachClickEventListener() {
        canvas.addEventListener('click', this.handleOnClick);
    }

    handleOnClick = (e) => {
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const round = new Path2D()
        this.circles.forEach(circle => {
            round.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
            ctx.fill(round)
            debugger
        if (ctx.isPointInPath(round, e.offsetX, e.offsetY)) {
            ctx.fillStyle = 'red'
        }
    })
    }

    render() {
        this.circles.push({
            x: 50,
            y: 50,
            r: 25,
            sAngle: 0,
            eAngle: 2 * Math.PI
        })
    }
    
    draw() {
        let ctx = canvas.getContext('2d')
        const round = new Path2D()
        this.circles.forEach(circle => {
            round.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle)
            ctx.fill(round)
        })
    }
    
}