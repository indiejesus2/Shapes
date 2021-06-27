class Toys {
    static height = document.getElementsByName("height")
        static width = document.getElementsByName("width")
        static radius = document.getElementsByName('radius')

    constructor() {
        this.startX
        this.startY
        this.shift = false
        this.draw()
        this.attachClickEventListener()
        this.attachShiftKeyListener()
        // this.attachMouseEnterListener()
        this.attachMouseHoverListener()
        this.attachMouseDownListener()
        this.attachMouseMoveListener()
        this.attachMouseUpListener()
    }

    attachShiftKeyListener() {
        document.addEventListener('keydown', this.shiftShape)
    }

    shiftShape = (e) => {
        if (e.key == "Shift") {
            this.shift = true
        }
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
            if (toy.id === parseInt(e.target.form.id)) {
                toy.height = e.target.value
            }
        })
        this.draw()
        // new Forms()
    }

    handleWidth = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.form.id)) {
                toy.width = e.target.value
            }
        })
        this.draw()
    }

    handleRadius = (e) => {
        toys.forEach(toy => {
            if (toy.id === parseInt(e.target.form.id)) {
                toy.r = e.target.value
            }
        })
        this.draw()
    }

    mouseOver = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        let mouseX=e.clientX-e.offsetX
        let mouseY=e.clientY-e.offsetY
        for (let i = 0; i<toys.length;i++) {
            // debugger
            if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                console.log("hey")
            }
        }
    }

    mouseDown = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        var mx = e.clientX - e.offsetX
        var my = e.clientY - e.offsetY
        for (let i = 0; i<toys.length;i++) {
            if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                toys[i].dragging = true
            } else if (toys[i].selected == true) {
                toys[i].dragging = true
            }
        }
        this.startX=e.offsetX
        this.startY=e.offsetY
    }
    
    mouseMove = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation() 
        let dx = e.offsetX - this.startX
        let dy = e.offsetY - this.startY
        for (let i=0;i<toys.length;i++) {
            let toy = toys[i]
            if (toy.dragging == true) {
                toy.x+=dx
                toy.y+=dy
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

    mouseEnter = (e) => {
        this.attachMouseHoverListener()
    }

    attachMouseEnterListener() {
        canvas.addEventListener('mouseenter', this.mouseEnter);
    }
    attachMouseHoverListener() {
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
                debugger
                if(this.isMouseInShape(e.offsetX, e.offsetY, toys[i])) {
                    toys[i].selected = toys[i].selected == false ? true : false
                    // this.attachColorChange(toys[i])
                } else if (toys[i].selected == true && this.shift == true) {
                    debugger
                    toys[i].selected = true
                    
                } else {
                    toys[i].selected = false
                }
                new Forms()
                this.draw()
                // this.attachChange()
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
