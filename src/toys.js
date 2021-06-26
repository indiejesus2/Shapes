class Toys {
    static height = document.getElementsByName("height")
        static width = document.getElementsByName("width")
        static radius = document.getElementsByName('radius')

    constructor() {
        this.startX
        this.startY
        this.draw()
        this.attachClickEventListener()

        // this.attachMouseEnterListener()
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

    attachChange(toy) {
            if (toy.selected == true) {
                if (toy.name == "Rectangle") {
                    height.addEventListener("input", this.handleHeight)
                    width.addEventListener("input", this.handleWidth)
                } else {
                    radius.addEventListener("input", this.handleRadius)
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
            if(this.isMouseInShape(e.clientX, e.clientY, toys[i])) {
                console.log("hey")
            }
        }
    }

    mouseDown = (e) => {
        // e.preventDefault()
        // e.stopPropagation()
        for (let i = 0; i<toys.length;i++) {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                this.startX=e.clientX - e.offsetX
                this.startY=e.clientY - e.offsetY
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
                new Forms()
            }
        }
        this.draw()
        this.startX=e.clientX - e.offsetX
        this.startY=e.clientY - e.offsetY
    }

    mouseUp = (e) => {
        toys.forEach(toy => toy.dragging = false)
    }

    mouseEnter = (e) => {
        this.attachMouseHoverListener()
    }

    attachMouseEnterListener() {
        canvas.addEventListener('mouseenter', this.mouseEnter);
    }
    attachMouseHoverListener() {
        debugger
        canvas.addEventListener('mouseenter', this.mouseOver);
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
        canvas.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopImmediatePropagation()
            for (let i = 0; i<toys.length;i++) {
                if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                    toys[i].selected = toys[i].selected == false ? true : false
                }
                new Forms()
                this.draw()

            }
        })
    }

    isMouseInShape(mx, my, toy){
        if (toy.name == "Circle") {
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
        e.preventDefault()
        e.stopPropagation()
        console.log("click")
        for (let i = 0; i<toys.length;i++) {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                toys[i].selected = toys[i].selected == false ? true : false
            }
            if (toys[i].selected == true) {

                // ctx.stroke() || ctx.strokeRect(toys[i].x, toys[i].y, toys[i].width, toys[i].height)
            }
        }
        this.draw()

    }
        // toys.forEach(toy => {
        //     } 
        //     // else {
        //     //     toy.selected = false
        //     //     this.draw()
        //     // }
        // })
    
    draw() {   
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        toys.forEach(toy => {
            if (toy.r) {
                ctx.beginPath();
                ctx.fillStyle = `${toy.color}`
                ctx.arc(toy.x, toy.y, toy.r, toy.sAngle, toy.eAngle, true)
                ctx.closePath()
                ctx.fill()
                if (toy.selected == true) {
                    ctx.stroke()
                }
            } else {
                ctx.fillStyle = `${toy.color}`
                ctx.fillRect(toy.x, toy.y, toy.width, toy.height)
                if (toy.selected == true) {
                    ctx.strokeRect(toy.x, toy.y, toy.width, toy.height)
                }
            }
        })
        
    }

}
