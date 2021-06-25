class Toys {
    static container = document.getElementById('canvas_container')
    static canvas = document.getElementById("canvas")

    constructor() {
        this.startX
        this.startY
        this.attachClickEventListener()
        this.attachMouseHoverListener()
        this.attachMouseDownListener()
        this.attachMouseMoveListener()
        this.attachMouseUpListener()
    }

    randomColor() {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        return (`#${randomColor}`)
    }

    attachColorChange(toy) {
        let colors = document.getElementsByName("color");
        colors.forEach(color => {
            if (color.parentElement.id == toy.id) {
                color.addEventListener("input", this.handleColor);
            }
        })
    }

    handleColor = (e) => {
        toys.forEach(function(toy) {
            if (toy.id === parseInt(e.target.parentElement.id)) {
                toy.color = e.target.value
            }
        })
        this.draw()
    }

    attachChange() {
        let height = document.getElementsByName("height")
        let width = document.getElementsByName("width")
        let radius = document.getElementsByName('radius')
        for (let i = 0; i < toys.length; i++) {
            if (toys[i].selected == true) {
                if (toys[i].name == "Rectangle") {
                    height[i].addEventListener("input", this.handleHeight)
                    width[i].addEventListener("input", this.handleWidth)
                } else {
                    radius[i].addEventListener("input", this.handleRadius)
                }
            }
        }
    }

    handleHeight = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.parentElement.id)) {
                toy.height = e.target.value
            }
        })
        this.draw()
        new Forms()
    }

    handleWidth = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.parentElement.id)) {
                toy.width = e.target.value
            }
        })
        this.draw()
        new Forms()
    }

    handleRadius = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.parentElement.id)) {
                toy.r = e.target.value
            }
        })
        new Forms()
        this.draw()
    }

    mouseOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        for (let i = 0; i<toys.length;i++) {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                debugger
            }
        }
    }

    mouseDown = (e) => {
        e.preventDefault()
        e.stopPropagation()
        for (let i = 0; i<toys.length;i++) {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                this.startX=e.offsetX
                this.startY=e.offsetY
                toys[i].dragging = true
            }
        }
    }

    mouseMove = (e) => {
        let dx = e.offsetX - this.startX
        let dy = e.offsetY - this.startY
        for (let i=0;i<toys.length;i++) {
            let toy = toys[i]
            if (toy.dragging == true) {
                toy.x+=dx
                toy.y+=dy
                // new Forms(toy)
            }
        }
        this.draw()
        new Forms()
        this.startX=e.offsetX
        this.startY=e.offsetY

    }

    mouseUp = (e) => {
        toys.forEach(toy => toy.dragging = false)
    }

    attachMouseHoverListener() {
        canvas.addEventListener('mouseover', this.mouseOver);
    }
    
    attachMouseDownListener() {
        canvas.addEventListener('mousedown', this.mouseDown);
    }
    
    attachMouseUpListener() {
        canvas.addEventListener('mouseup', this.mouseUp);
    }

    attachMouseMoveListener() {
        canvas.addEventListener('mousemove', this.mouseMove);
    }

    attachClickEventListener() {
        canvas.addEventListener("click", this.handleOnClick);
    }

    isMouseInShape(mx, my, toy){
        if (toy.r) {
            var dx = mx-toy.x;
            var dy = my-toy.y;
            if(dx**2+dy**2<toy.r*toy.r) {
                return true
            }
        } else {
            var rLeft = toy.x
            var rRight=toy.x+toy.width;
            var rTop=toy.y
            var rBott=rTop+toy.height
            if(mx>rLeft && mx<rRight && my>rTop && my<rBott) {
                return true
            }
        }
    }

    handleOnClick = (e) => {
        toys.forEach(toy => {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toy)) {
                if (!document.getElementById(toy.id)) {
                    toy.selected = true
                    new Forms()
                    this.attachColorChange(toy)
                    this.attachChange()
                }
            }
        })
    }
    
    draw() {   
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        toys.forEach(toy => {
            if (toy.r) {
                ctx.beginPath();
                ctx.fillStyle = `${toy.color}`
                ctx.arc(toy.x, toy.y, toy.r, toy.sAngle, toy.eAngle, true)
                ctx.closePath()
                ctx.fill()
            } else {
                ctx.fillStyle = `${toy.color}`
                ctx.fillRect(toy.x, toy.y, toy.width, toy.height)
            }
        })
        
    }

}
